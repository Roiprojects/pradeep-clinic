const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

async function main() {
  const dir = process.cwd();
  
  // Initialize repo
  try {
    await git.init({ fs, dir });
    console.log('Git repository initialized.');
  } catch (err) {
    console.log('Repo already exists or error:', err.message);
  }

  // Define files to add (recursive)
  async function getAllFiles(currentDir) {
    let results = [];
    const list = fs.readdirSync(currentDir);
    for (let file of list) {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      const relativePath = path.relative(dir, fullPath).replace(/\\/g, '/');
      
      // Basic ignores
      if (['node_modules', '.git', '.gemini', '.DS_Store', 'package-lock.json'].includes(file)) continue;
      
      if (stat && stat.isDirectory()) {
        results = results.concat(await getAllFiles(fullPath));
      } else {
        results.push(relativePath);
      }
    }
    return results;
  }

  const files = await getAllFiles(dir);
  console.log(`Adding ${files.length} files...`);

  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }
  
  console.log('Files staged.');

  // Commit
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Antigravity',
      email: 'antigravity@google.com',
    },
    message: 'Initial commit: Standardized Pediatric Clinic Website'
  });

  console.log('Committed successfully. SHA:', sha);
}

main().catch(console.error);
