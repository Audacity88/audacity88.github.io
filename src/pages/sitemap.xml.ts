import type { APIRoute } from 'astro';
import { projects } from '../data/content';

// Include generated project pages. Exclude the noindex 404 page.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const entries = [base, ...projects.map((project) => `${base}projects/${project.id}/`)]
    .map((path) => new URL(path, site).href)
    .map((url) => `<url><loc>${url.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
