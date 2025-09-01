export { renderers } from '../../renderers.mjs';

const prerender = false;
const OLLAMA_BASE_URL = "http://localhost:11434";
const GET = async () => {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    if (!response.ok) {
      return new Response(JSON.stringify({
        available: false,
        healthy: false,
        error: `Ollama API returned status ${response.status}`
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const data = await response.json();
    const models = data.models || [];
    const modelNames = models.map((model) => model.name);
    return new Response(JSON.stringify({
      available: true,
      healthy: true,
      models: modelNames,
      modelCount: modelNames.length
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Ollama health check failed:", error);
    return new Response(JSON.stringify({
      available: false,
      healthy: false,
      error: "Could not connect to Ollama on localhost:11434"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
