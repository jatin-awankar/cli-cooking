import path from "path";

import fs from "fs-extra";

export async function generateExpress(projectPath, typescript) {
  const packageJson = {
    name: path.basename(projectPath),
    version: "1.0.0",
    type: "module",
    scripts: typescript
      ? {
          build: "tsc",
          start: "node dist/index.js",
          dev: "node --watch dist/index.js",
        }
      : {
          start: "node src/index.js",
          dev: "node --watch src/index.js",
        },
    dependencies: {
      express: "^4.21.2",
    },
  };

  if (typescript) {
    packageJson.devDependencies = {
      typescript: "^5.7.3",
      "@types/express": "^5.0.0",
      "@types/node": "^22.10.5",
    };
  }

  await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
    spaces: 2,
  });

  const srcPath = path.join(projectPath, "src");
  await fs.ensureDir(srcPath);

  const fileName = typescript ? "index.ts" : "index.js";
  const content = typescript
    ? `import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (_req, res) => {
  res.json({ message: "Hello Express + TypeScript" });
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});
`
    : `import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (_req, res) => {
  res.json({ message: "Hello Express" });
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});
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
      ? ["npm run build", "npm run dev"]
      : ["npm run dev"],
  };
}
