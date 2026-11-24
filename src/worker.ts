import { onRequestPost } from '../functions/api/generate';

export interface Env {
  GEMINI_API_KEY?: string;
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/generate' && request.method === 'POST') {
      return onRequestPost({ request, env });
    }
    return env.ASSETS.fetch(request);
  },
};
