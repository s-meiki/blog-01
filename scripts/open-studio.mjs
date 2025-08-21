import { readFileSync } from 'fs';
import { exec } from 'child_process';
import { join } from 'path';

function getStudioUrl() {
  const envUrl = process.env.SANITY_STUDIO_URL;
  if (envUrl) return envUrl.trim();
  try {
    const envPath = join(process.cwd(), '.env.local');
    const content = readFileSync(envPath, 'utf8');
    const line = content
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l.startsWith('SANITY_STUDIO_URL='));
    if (!line) return null;
    const url = line.replace('SANITY_STUDIO_URL=', '').replace(/^"|"$/g, '').trim();
    return url || null;
  } catch (e) {
    return null;
  }
}

const url = getStudioUrl();
if (!url) {
  console.error('Set SANITY_STUDIO_URL in .env.local or export it in your shell.');
  process.exit(1);
}

const cmd = process.platform === 'darwin' ? `open -u ${url}` : process.platform === 'win32' ? `start ${url}` : `xdg-open ${url}`;
exec(cmd);

