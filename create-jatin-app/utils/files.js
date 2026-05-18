import path from "path";

import fs from "fs-extra";

export async function writeProjectFile(projectPath, relativePath, content) {
  const filePath = path.join(projectPath, relativePath);
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content);
}

export function isValidProjectName(name) {
  return /^[a-z0-9][a-z0-9._-]*$/i.test(name.trim());
}
