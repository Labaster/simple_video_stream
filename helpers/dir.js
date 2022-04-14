import fs from 'fs';
import path from 'path';

export const getFilesInDirRecursive = (dirPath = '') => {
  const filesInDir = [];
  if (!dirPath) return filesInDir;

  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) filesInDir.push(...getFilesInDirRecursive(file));
    else filesInDir.push(file);
  });
  return filesInDir;
}
