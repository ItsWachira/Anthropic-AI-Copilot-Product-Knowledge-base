import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { posts } from './data/posts.js';

dotenv.config();

const app = express();
const port = 3000;

import {
  CopilotRuntime,
  AnthropicAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from '@copilotkit/runtime';
import Anthropic from '@anthropic-ai/sdk';

import { Pinecone } from '@pinecone-database/pinecone';




const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

const model = 'multilingual-e5-large';

if (!ANTHROPIC_API_KEY || !PINECONE_API_KEY) {
  console.error('Missing required API keys. ');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const serviceAdapter = new AnthropicAdapter({ anthropic: anthropic as any });

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const indexName = 'knowledge-base-data';

// Function to initialize the Pinecone index
const initializePinecone = async () => {
  const maxRetries = 3;
  const retryDelay = 2000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const indexList = await pinecone.listIndexes();
      if (!indexList.indexes?.some(index => index.name === indexName)) {
        await pinecone.createIndex({
          name: indexName,
          dimension: 1024,
          metric: 'cosine',
          spec: {
            serverless: {
              cloud: 'aws',
              region: 'us-east-1',
            },
          },
        });
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      return pinecone.index(indexName);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.warn(`Retrying Pinecone initialization... (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// Initialize Pinecone and prepare the index
(async () => {
  try {
    const index = await initializePinecone();
    if (index) {
      const embeddings = await pinecone.inference.embed(
        model,
        posts.map(d => d.content),
        { inputType: 'passage', truncate: 'END' }
      );

      const records = posts.map((d, i) => ({
        id: d.id.toString(),
        values: embeddings[i].values,
        metadata: { text: d.content },
      }));

      await index.namespace('knowledge-base-data-namespace').upsert(
        records.map(record => ({
          ...record,
          values: record.values || [],
        }))
      );
    }
  } catch (error) {
    console.error('Error initializing Pinecone:', error);
    process.exit(1);
  }
})();

app.use(cors());
app.use(express.json());

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/copilotkit', (req, res, next) => {
 
  try {
    const runtime = new CopilotRuntime({
      actions: () => [
        {
          name: 'FetchKnowledgebaseArticles',
          description: 'Fetch relevant knowledge base articles based on a user query',
          parameters: [
            {
              name: 'query',
              type: 'string',
              description: 'The User query for the knowledge base index search to perform',
              required: true,
            },
          ],
          handler: async ({query }) => {
            try {
              const queryEmbedding = await pinecone.inference.embed(
                model,
                [query],
                { inputType: 'query' }
              );
              const queryResponse = await pinecone
                .index(indexName)
                .namespace('knowledge-base-data-namespace')
                .query({
                  topK: 3,
                  vector: queryEmbedding[0]?.values || [],
                  includeValues: false,
                  includeMetadata: true,
                });
              return { articles: queryResponse?.matches || [] };
            } catch (error) {
              console.error('Error fetching knowledge base articles:', error);
              throw new Error('Failed to fetch knowledge base articles.');
            }
          },
        },
      ],
    });

    const handler = copilotRuntimeNodeHttpEndpoint({
      endpoint: '/api/copilotkit',
      runtime,
      serviceAdapter,
    });

    handler(req as any, res as any, next);
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
