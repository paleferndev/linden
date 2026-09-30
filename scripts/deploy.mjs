// Publishes the app: tests, builds, commits dist/ to the gh-pages branch and pushes main + gh-pages.
// GitHub Pages serves gh-pages at https://paleferndev.github.io/linden/, and installed copies pick the new build up
// the next time they open. Refuses to run with uncommitted changes, so the live app always matches a commit.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const run = cmd => execSync(cmd, { stdio: 'inherit' });
const out = (cmd, opts = {}) => execSync(cmd, { stdio: ['ignore', 'pipe', 'inherit'], ...opts }).toString().trim();

if (out('git branch --show-current') !== 'main') throw new Error('Deploy from main.');
if (out('git status --porcelain')) throw new Error('Commit your changes first: the live app must match a commit.');

run('npm test');
run('npm run build');
fs.writeFileSync('dist/.nojekyll', '');

// Commit dist/ onto gh-pages without touching the working tree: a throwaway index, then commit-tree.
const head = out('git rev-parse --short HEAD');
const env = { ...process.env, GIT_INDEX_FILE: path.resolve('.git/deploy-index'), GIT_WORK_TREE: path.resolve('dist') };
fs.rmSync(env.GIT_INDEX_FILE, { force: true });
out('git -c core.autocrlf=false add --all --force .', { env, cwd: 'dist' });
const tree = out('git write-tree', { env });
let parent = '';
try { parent = out('git rev-parse --verify --quiet refs/heads/gh-pages'); } catch {}
if (parent && out(`git log -1 --format=%T ${parent}`) === tree) {
  console.log('Nothing new to publish.');
} else {
  const commit = out(`git commit-tree ${tree}${parent ? ` -p ${parent}` : ''} -m "Deploy ${head}"`);
  out(`git update-ref refs/heads/gh-pages ${commit}`);
}
fs.rmSync(env.GIT_INDEX_FILE, { force: true });

run('git push origin main gh-pages');

// GitHub doesn't always build Pages on a push to gh-pages, so ask for a build explicitly.
const gh = fs.existsSync('C:/Program Files/GitHub CLI/gh.exe') ? '"C:/Program Files/GitHub CLI/gh.exe"' : 'gh';
try {
  const repo = out(`${gh} repo view --json nameWithOwner --jq .nameWithOwner`);
  out(`${gh} api -X POST repos/${repo}/pages/builds`);
  console.log('\nPublished. Live in about a minute at https://paleferndev.github.io/linden/');
} catch {
  console.log('\nPushed, but could not request a Pages build. Check the repo\'s Actions tab if the site does not update.');
}
