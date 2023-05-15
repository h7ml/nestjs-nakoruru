const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const copyDirRecursive = async (srcDir, destDir) => {
  const readdir = promisify(fs.readdir);
  const stat = promisify(fs.stat);
  const mkdir = promisify(fs.mkdir);
  const copyFile = promisify(fs.copyFile);

  try {
    await mkdir(destDir, { recursive: true });

    const files = await readdir(srcDir);
    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      const fileStat = await stat(srcPath);
      if (fileStat.isFile()) {
        await copyFile(srcPath, destPath);
      } else if (fileStat.isDirectory()) {
        await copyDirRecursive(srcPath, destPath);
      }
    }

    console.log('Copy completed!');
  } catch (error) {
    console.error('Error occurred during copy:', error);
  }
};

const srcDir = path.join(__dirname, '..', 'node_modules/swagger-ui-dist');
const destDir = path.join(__dirname, '..', 'dist/swagger');

copyDirRecursive(srcDir, destDir);
