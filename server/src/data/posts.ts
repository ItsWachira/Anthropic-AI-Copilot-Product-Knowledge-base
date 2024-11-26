export interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  createdAt: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Getting Started with CopilotKit",
    summary:
      "Learn the basics of CopilotKit and how to set up your first project.",
    content: `
      To get started with CopilotKit, follow these basic steps:
      - Set up your CopilotKit account.
      - Explore the documentation to understand the SDK and UI components.
      - Integrate your React app with CopilotKit using the provided SDK.
      - Test your setup by running the app in your local environment.
      - Review CopilotKit’s documentation for additional setup and troubleshooting.
    `,
    category: "Basics",
    createdAt: "2023-12-20",
  },
  {
    id: 2,
    title: "Advanced Features of CopilotKit",
    summary:
      "Unlock advanced features in CopilotKit to maximize productivity.",
    content: `
      CopilotKit offers several advanced features that can take your development to the next level:
      - **In-App AI Chatbot**: Easily add an AI chatbot to your app with plug-and-play components.
      - **Copilot Readable State**: Enable your Copilot to read and understand the application's state for intelligent interactions.
      - **Copilot Actions**: Let your Copilot perform actions in the app based on the state and user input.
      - **Generative UI**: Render any component dynamically through the AI chat interface.
      - **Copilot Textarea**: Add AI-powered autocompletion to any textarea, enhancing user experience.
      - **AI Autosuggestions**: Provide smart autosuggestions in the AI chat interface for faster interactions.
      - **Copilot Tasks**: Allow your Copilot to take proactive actions based on the application state.
    `,
    category: "Advanced",
    createdAt: "2023-12-21",
  },
  {
    id: 3,
    title: "Troubleshooting Development with React and Node.js in CopilotKit",
    summary:
      "Follow these steps to troubleshoot common issues when using CopilotKit with React and Node.js.",
    content: `
      If you're facing issues while developing with CopilotKit, here are five troubleshooting steps to help:
      - **Step 1: Check API Integration**: Ensure that your React app is properly integrated with the CopilotKit API. Verify API keys and endpoints.
      - **Step 2: Debug Network Issues**: Use browser developer tools to check for network requests that may be failing.
      - **Step 3: Verify State Management**: Ensure that the application state is correctly managed and accessible to the Copilot in your app.
      - **Step 4: Inspect Console Logs**: Look for error messages or warnings in the browser console or server logs for any issues.
      - **Step 5: Test Components Independently**: Isolate components like the AI chatbot or generative UI to test their functionality separately and debug accordingly.
    `,
    category: "Support",
    createdAt: "2023-12-22",
  },
];
