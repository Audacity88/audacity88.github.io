/**
 * Fetch public GitHub repo pulse data at build time.
 * Uses unauthenticated public GitHub REST API only.
 * NEVER use a token that can see private repos.
 */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '../src/data/repo-pulse.json');

// Public repos only - allowlist from portfolio projects and open source work
const REPOS = [
  { id: 'eyrie', label: 'Eyrie', owner: 'EyrieCommander', name: 'eyrie' },
  { id: 'zeroclaw', label: 'ZeroClaw', owner: 'zeroclaw-labs', name: 'zeroclaw' },
  { id: 'swift-ship', label: 'swift-ship', owner: 'Audacity88', name: 'swift-ship' },
  { id: 'witness-lexington', label: 'Witness Lexington', owner: 'Audacity88', name: 'witness-lexington' },
  { id: 'gauntlet-ai', label: 'ChatGenius', owner: 'Audacity88', name: 'gauntlet-ai' },
  { id: 'tono4', label: 'Tono4', owner: 'Audacity88', name: 'Tono4' },
  { id: 'codex-video-vision', label: 'codex-video-vision', owner: 'EyrieCommander', name: 'codex-video-vision' },
  { id: 'codex-skills', label: 'codex-skills', owner: 'EyrieCommander', name: 'codex-skills' },
];

const GITHUB_API_BASE = 'https://api.github.com';
const USER_AGENT = 'dan-gilles-portfolio-build';

/**
 * Fetch repo data from public GitHub API (unauthenticated).
 */
async function fetchRepoData(owner, name) {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${name}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': USER_AGENT,
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch ${owner}/${name}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      pushedAt: data.pushed_at,
      defaultBranch: data.default_branch ?? 'main',
    };
  } catch (error) {
    console.warn(`Error fetching ${owner}/${name}:`, error.message);
    return null;
  }
}

/**
 * Attempt to fetch CI status from public Actions API (best-effort).
 * Returns null if unavailable or private.
 */
async function fetchCIStatus(owner, name, branch) {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${name}/actions/runs?branch=${branch}&per_page=1&status=completed`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': USER_AGENT,
      },
    });

    if (!response.ok || response.status === 404) {
      return null; // CI not available publicly
    }

    const data = await response.json();
    const latestRun = data.workflow_runs?.[0];
    
    if (!latestRun) {
      return null;
    }

    return {
      conclusion: latestRun.conclusion ?? 'unknown',
      url: latestRun.html_url,
    };
  } catch (error) {
    return null; // Fail silently
  }
}

/**
 * Main entry point.
 */
async function main() {
  console.log('Fetching repo pulse data from public GitHub API...');
  
  const results = [];
  
  for (const repo of REPOS) {
    console.log(`  Fetching ${repo.owner}/${repo.name}...`);
    
    const repoData = await fetchRepoData(repo.owner, repo.name);
    
    if (!repoData) {
      console.warn(`  Skipping ${repo.owner}/${repo.name} - fetch failed`);
      continue;
    }

    const ciStatus = await fetchCIStatus(repo.owner, repo.name, repoData.defaultBranch);
    
    const result = {
      id: repo.id,
      label: repo.label,
      owner: repo.owner,
      name: repo.name,
      url: `https://github.com/${repo.owner}/${repo.name}`,
      stars: repoData.stars,
      forks: repoData.forks,
      pushedAt: repoData.pushedAt,
      defaultBranch: repoData.defaultBranch,
    };

    if (ciStatus) {
      result.ci = ciStatus;
    }

    results.push(result);
    
    // Be nice to GitHub's rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const output = {
    generatedAt: new Date().toISOString(),
    repos: results,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`✓ Wrote ${results.length} repo(s) to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error('Failed to fetch repo pulse:', error);
  process.exit(1);
});
