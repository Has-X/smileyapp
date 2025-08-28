import type { APIRoute } from 'astro';

export const prerender = false;

const OLLAMA_BASE_URL = 'http://localhost:11434';

export const GET: APIRoute = async () => {
  try {
    // Check if Ollama is accessible
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ 
          available: false, 
          healthy: false,
          error: `Ollama API returned status ${response.status}` 
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    const models = data.models || [];
    const modelNames = models.map((model: any) => model.name);
    
    return new Response(
      JSON.stringify({ 
        available: true,
        healthy: true, 
        models: modelNames,
        modelCount: modelNames.length
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Ollama health check failed:', error);
    
    return new Response(
      JSON.stringify({ 
        available: false,
        healthy: false, 
        error: 'Could not connect to Ollama on localhost:11434'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
