import path from "path";

import fs from "fs-extra";

export async function generateVanilla(projectPath, typescript) {
  const packageJson = {
    name: path.basename(projectPath),
    version: "1.0.0",
    type: "module",
    scripts: typescript
      ? {
          build: "tsc",
          start: "node dist/index.js",
        }
      : {
          start: "node src/index.js",
        },
  };

  if (typescript) {
    packageJson.devDependencies = {
      typescript: "^5.7.3",
    };
  }

  await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
    spaces: 2,
  });

  const srcPath = path.join(projectPath, "src");
  await fs.ensureDir(srcPath);

  const fileName = typescript ? "index.ts" : "index.js";
  const content = typescript
    ? `const message: string = "Hello TypeScript";

console.log(message);
`
    : `const message = "Hello JavaScript";

console.log(message);
`;

  await fs.writeFile(path.join(srcPath, fileName), content);

  if (typescript) {
    await fs.writeJson(
      path.join(projectPath, "tsconfig.json"),
      {
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          outDir: "dist",
          rootDir: "src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
        },
        include: ["src"],
      },
      { spaces: 2 },
    );
  }

  return {
    nextSteps: typescript
      ? ["npm run build", "npm start"]
      : ["npm start"],
  };
}
