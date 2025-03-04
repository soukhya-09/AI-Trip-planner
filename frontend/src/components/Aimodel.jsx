


const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
  export const chatSession = async () => {
    try {
      const chat = await model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: "ai travel planner\n" }],
          },
          {
            role: "model",
            parts: [{ text: "Okay, I'm ready to help you plan your trip! ..." }],
          },
          {
            role: "user",
            parts: [
              {
                text: "Generate travel plan for location: Las Vegas, for 3 days for a couple with a cheap budget. Give me a list of hotel options with name, address, price, image URL, geo-coordinates, rating, description, and suggest an itinerary in JSON format.",
              },
            ],
          },
        ],
      });
  
      return chat;
    } catch (error) {
      console.error("Error starting chat session:", error);
      throw error;
    }
}
  