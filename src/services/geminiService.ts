export const generateAIPlan = async (userInput: string): Promise<string[]> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('VITE_GEMINI_API_KEY not configured');
      // Return mock suggestions if API key is not set
      return generateMockSuggestions(userInput);
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Break down this goal into 3-5 specific, actionable tasks. Return only the task list, one per line, without numbering or formatting. Goal: ${userInput}`
          }]
        }]
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.statusText);
      return generateMockSuggestions(userInput);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!content) {
      return generateMockSuggestions(userInput);
    }

    return content
      .split('\n')
      .map((task: string) => task.trim())
      .filter((task: string) => task.length > 0);
  } catch (error) {
    console.error('Error generating AI plan:', error);
    return generateMockSuggestions(userInput);
  }
};

const generateMockSuggestions = (userInput: string): string[] => {
  // Fallback suggestions when API is unavailable
  return [
    `Research: ${userInput}`,
    `Plan approach for: ${userInput}`,
    `Execute: ${userInput}`,
    `Review results of: ${userInput}`,
    `Optimize: ${userInput}`
  ];
};