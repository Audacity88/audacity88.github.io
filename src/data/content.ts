import { z } from 'astro/zod';
import projectData from './projects.json';
import experienceData from './experience.json';
import openSourceData from './opensource.json';

const httpsUrl = z.url().refine((url) => url.startsWith('https://'), 'Use an HTTPS URL.');
const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  oneLiner: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()),
  github: httpsUrl,
  demo: httpsUrl.nullable(),
  status: z.enum(['pending-verification', 'verified', 'demo-down']),
  featured: z.boolean(),
  order: z.number().int().positive(),
  images: z.array(z.object({ src: z.string().startsWith('/'), alt: z.string().min(1) })).optional(),
  notes: z.string(),
}).refine((project) => project.status !== 'demo-down' || project.demo === null, {
  message: 'A demo-down project must have demo: null.',
});

export type Project = z.infer<typeof projectSchema>;
export const projects = z.array(projectSchema).parse(projectData).sort((a, b) => a.order - b.order);
if (new Set(projects.map((project) => project.id)).size !== projects.length) {
  throw new Error('Project IDs must be unique.');
}

export const experience = z.object({
  notes: z.string(),
  roles: z.array(z.object({
    id: z.string(),
    role: z.string(),
    organization: z.string(),
    period: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()),
    clients: z.array(z.object({
      name: z.string(),
      needsDanOk: z.boolean(),
      publicDescription: z.string().nullable(),
    })),
    notes: z.string(),
  })),
}).parse(experienceData);

export const openSource = z.object({
  repository: z.string(),
  url: httpsUrl,
  mergedList: httpsUrl,
  verifiedAsOf: z.string(),
  // Fail the build if this flag changes. Count data is never passed to a client script.
  count: z.object({ value: z.number(), display: z.literal(false), notes: z.string() }),
  pullRequests: z.array(z.object({
    number: z.number().int(),
    title: z.string(),
    area: z.string(),
    mergedAt: z.string(),
    url: httpsUrl,
  })),
}).parse(openSourceData);
