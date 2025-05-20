# Silicon Bot API Documentation

This document outlines how to configure and use the customer support chatbot API for Silicon Synapse.

## Overview

The Silicon Bot provides intelligent customer support through a chat interface. It communicates with a backend API that processes user messages and returns appropriate responses.

## API Endpoint

### Production Endpoint
```
https://api.siliconsynapse.com/v1/chatbot
```

### Request Format

```json
{
  "message": "User's message text",
  "timestamp": "2023-08-15T14:22:10.123Z",
  "sessionId": "unique-session-identifier"
}
```

### Response Format

```json
{
  "response": "Bot's response message",
  "timestamp": "2023-08-15T14:22:10.456Z",
  "sessionId": "unique-session-identifier"
}
```

## Configuration

The chatbot API can be configured in `src/services/api.js`:

1. Set `USE_MOCK_SERVER` to `false` to use the production API
2. Update `API_BASE_URL` if your API endpoint changes

## Local Development

For local development, the application includes a mock server that simulates the API:

1. The mock server is defined in `src/services/mockServer.js`
2. You can customize the mock responses by editing the `botResponses` object
3. By default, `USE_MOCK_SERVER` is set to `true` for development

## Implementation Example

```javascript
import { sendChatMessage } from '../services/api';

// Example usage in a component
const handleUserMessage = async (userInput) => {
  try {
    const botResponse = await sendChatMessage(userInput);
    // Process and display the response
  } catch (error) {
    console.error("Error sending message:", error);
    // Handle the error
  }
};
```

## Deployment

When deploying to production:

1. Set `USE_MOCK_SERVER` to `false` in `src/services/api.js`
2. Ensure your backend API is properly set up and accessible
3. Configure CORS on your backend to allow requests from your frontend domain

## Security Considerations

1. The API does not currently implement authentication for simplicity
2. For production use, consider adding proper API key authentication
3. Ensure sensitive user data is not stored in session ID or messages

## Customizing the Chatbot UI

The chatbot UI can be customized in `src/components/Chatbot.jsx`:

1. Change the icon by updating the FontAwesome icon class
2. Modify the color scheme using the style properties
3. Adjust the size and positioning by editing the relevant style objects 