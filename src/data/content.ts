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
  verification: z.string().min(1),
  verificationDate: z.iso.date(),
  verificationNote: z.string().min(1),
  caseStudy: z.object({
    problem: z.string().min(1),
    built: z.string().min(1),
    architecture: z.string().min(1),
    limitations: z.string().min(1),
    diagram: z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      steps: z.array(z.object({
        title: z.string().min(1),
        detail: z.array(z.string().min(1)).length(2),
      })).length(4),
      connections: z.array(z.array(z.string().min(1)).length(2)).length(3),
      description: z.array(z.string().min(1)).min(1),
      caveat: z.string().min(1),
    }).optional(),
    // Keep local source references available to editors, out of public pages.
    sourceNotes: z.array(z.string().min(1)).min(1),
  }),
  tech: z.array(z.string()),
  github: httpsUrl,
  demo: httpsUrl.nullable(),
  demoLabel: z.string().min(1).optional(),
  status: z.enum(['pending-verification', 'verified', 'demo-down']),
  statusLabel: z.string().min(1).optional(),
  featured: z.boolean(),
  order: z.number().int().positive(),
  images: z.array(z.object({
    src: z.string().startsWith('/'),
    srcSmall: z.string().startsWith('/'),
    alt: z.string().min(1),
    caption: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })),
  notes: z.string(),
}).refine((project) => project.status !== 'demo-down' || project.demo === null, {
  message: 'A demo-down project must have demo: null.',
});

export type Project = z.infer<typeof projectSchema>;
// Validate private placeholders separately. Public consumers receive only complete, visible records.
const hiddenProjectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  status: z.literal('draft'),
  hidden: z.literal(true),
}).catchall(z.union([z.null(), z.literal(''), z.array(z.never()).length(0)]));
z.array(hiddenProjectSchema).parse(projectData.filter((project) => project.hidden === true));
export const projects = z.array(projectSchema).parse(projectData.filter((project) => project.hidden !== true)).sort((a, b) => a.order - b.order);
if (new Set(projectData.map((project) => project.id)).size !== projectData.length) {
  throw new Error('Project IDs must be unique.');
}

export const experience = z.object({
  reviewStatus: z.literal('needs-dan-ok'),
  notes: z.string(),
  roles: z.array(z.object({
    id: z.string(),
    role: z.string(),
    organization: z.string(),
    needsDanOk: z.boolean().optional(),
    period: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()),
    clients: z.array(z.object({
      name: z.string(),
      needsDanOk: z.boolean(),
      publicFallback: z.string().min(1),
    })),
    notes: z.string(),
  })),
}).parse(experienceData);

export const openSource = z.object({
  repository: z.string(),
  url: httpsUrl,
  mergedList: httpsUrl,
  verifiedAsOf: z.string(),
  // Only this approved label may be displayed. Keep the exact value internal.
  count: z.object({ value: z.number(), display: z.literal(true), label: z.literal('750+ merged pull requests'), notes: z.string() }),
  pullRequests: z.array(z.object({
    number: z.number().int(),
    title: z.string(),
    area: z.string(),
    mergedAt: z.string(),
    url: httpsUrl,
    summary: z.string().min(1).optional(),
  })),
}).parse(openSourceData);
