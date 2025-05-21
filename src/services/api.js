/**
 * API services for Silicon Synapse
 */

import { mockChatbotAPI } from './mockServer';

// Base API URL - actual API endpoint
const API_BASE_URL = 'https://silcon-bot.vercel.app/api/support';

// Flag to determine if we should use the mock server (for development)
const USE_MOCK_SERVER = false; // Set to false to use the real API

/**
 * Silicon Bot Chat API
 * Sends user message and gets bot response
 * @param {string} message - User's message (most recent)
 * @param {Array} conversationHistory - Optional array of previous messages
 * @returns {Promise} - Promise with bot response
 */
export const sendChatMessage = async (message, conversationHistory = []) => {
  // If using mock server, use local implementation
  if (USE_MOCK_SERVER) {
    try {
      const requestBody = { 
        message,
        timestamp: new Date().toISOString(),
        sessionId: localStorage.getItem('chatSessionId') || 'guest-session'
      };
      
      const mockResponse = await mockChatbotAPI(requestBody);
      return mockResponse.response;
    } catch (error) {
      console.error('Mock API error:', error);
      return "I'm having trouble understanding. Could you try asking in a different way?";
    }
  }
  
  // Otherwise use the real API
  try {
    // Create messages array with conversation history and current message
    let messages = [...conversationHistory];
    
    // If the newest message isn't already included in the history (which it shouldn't be)
    if (!messages.some(msg => msg.role === 'user' && msg.content === message)) {
      messages.push({
        role: "user",
        content: message
      });
    }
    
    // Limit to last 10 messages to avoid token limits
    messages = messages.slice(-10);
    
    // Format request according to API expectations (based on Postman sample)
    const requestBody = {
      conversation: {
        messages: messages
      },
      agent_config: {
        name: "Support Agent",
        instructions: "You help customers with order tracking and product information."
      }
    };

    // Output the request body to console for debugging
    console.log('Sending API request:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', JSON.stringify(data, null, 2));
    
    // Extract response from the format shown in Postman
    if (data.response && data.response.content) {
      return data.response.content;
    } else {
      return "I'm not sure how to respond to that. Can you try asking something else?";
    }
  } catch (error) {
    console.error('Chatbot API error:', error);
    // Fallback responses if API fails
    const fallbackResponses = [
      "I seem to be having trouble connecting. Please try again later.",
      "Our systems are currently experiencing high demand. Can you try again shortly?",
      "I apologize, but I couldn't process your request right now. How else can I help you?"
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}; 