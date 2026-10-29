import type { APIRoute } from 'astro';

// This single-page portfolio has one indexable URL. Exclude the 404 page.
export const GET: APIRoute = ({ site }) => {
  const url = new URL(import.meta.env.BASE_URL, site).href
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url}</loc></url></urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
