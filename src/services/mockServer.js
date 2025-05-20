/**
 * Mock server for local development and testing
 * This simulates the backend API responses for the chatbot
 */

// Sample bot responses based on user input patterns
const botResponses = {
  service: "We offer AI integration, web development, data analytics, and custom technology solutions!",
  pricing: "Our pricing varies based on project scope and requirements. We'd be happy to provide a custom quote for your needs.",
  contact: "You can reach our team at contact@siliconsynapse.com or fill out the contact form on our website.",
  hello: "Hello! How can I assist you with our technology services today?",
  default: "Thank you for your message. How else can I help you with our AI and technology services?"
};

// Bot response with some built-in "intelligence"
const getMockBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Check for different keyword patterns
  if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return botResponses.pricing;
  } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
    return botResponses.service;
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return botResponses.contact;
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return botResponses.hello;
  }
  
  // Default response
  return botResponses.default;
};

/**
 * Mock API endpoint for the chatbot
 * @param {Object} requestBody - The request body containing the message
 * @returns {Promise} - Promise with a mocked response
 */
export const mockChatbotAPI = (requestBody) => {
  return new Promise((resolve) => {
    // Simulate network delay (500-1500ms)
    const delay = 500 + Math.random() * 1000;
    
    setTimeout(() => {
      const response = {
        response: getMockBotResponse(requestBody.message),
        timestamp: new Date().toISOString(),
        sessionId: requestBody.sessionId
      };
      
      resolve(response);
    }, delay);
  });
};

export default mockChatbotAPI; 