import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL;
  return new Response(JSON.stringify({
    name: "Dan Gilles's portfolio",
    short_name: 'Dan Gilles',
    id: base,
    start_url: base,
    scope: base,
    display: 'browser',
    icons: [{ src: `${base}favicon.svg`, sizes: 'any', type: 'image/svg+xml' }],
  }), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
};
