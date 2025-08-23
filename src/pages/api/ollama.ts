import type { APIRoute } from 'astro';

export const prerender = false;

const OLLAMA_BASE_URL = 'http://localhost:11434';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Proxy the request to Ollama
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        stream: true, // Always stream for better UX
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Ollama API error: ${response.status}` }),
        { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Stream the response back to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Ollama proxy error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to connect to Ollama. Make sure it\'s running on localhost:11434'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
