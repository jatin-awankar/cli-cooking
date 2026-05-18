import path from "path";

import fs from "fs-extra";

export async function generateReactVite(projectPath, typescript) {
  const jsxExt = typescript ? "tsx" : "jsx";

  const packageJson = {
    name: path.basename(projectPath),
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
    },
    devDependencies: {
      vite: "^6.0.5",
      "@vitejs/plugin-react": "^4.3.4",
    },
  };

  if (typescript) {
    packageJson.devDependencies.typescript = "^5.7.3";
    packageJson.devDependencies["@types/react"] = "^19.0.2";
    packageJson.devDependencies["@types/react-dom"] = "^19.0.2";
  }

  await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
    spaces: 2,
  });

  const configFile = typescript ? "vite.config.ts" : "vite.config.js";
  await fs.writeFile(
    path.join(projectPath, configFile),
    `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`,
  );

  await fs.writeFile(
    path.join(projectPath, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${path.basename(projectPath)}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${jsxExt}"></script>
  </body>
</html>
`,
  );

  const srcPath = path.join(projectPath, "src");
  await fs.ensureDir(srcPath);

  if (typescript) {
    await fs.writeJson(
      path.join(projectPath, "tsconfig.json"),
      {
        compilerOptions: {
          target: "ES2022",
          useDefineForClassFields: true,
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          isolatedModules: true,
          moduleDetection: "force",
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
        },
        include: ["src"],
      },
      { spaces: 2 },
    );

    await fs.writeFile(
      path.join(srcPath, "main.tsx"),
      `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`,
    );

    await fs.writeFile(
      path.join(srcPath, "App.tsx"),
      `export default function App() {
  return <h1>Hello React + Vite + TypeScript</h1>;
}
`,
    );
  } else {
    await fs.writeFile(
      path.join(srcPath, "main.jsx"),
      `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`,
    );

    await fs.writeFile(
      path.join(srcPath, "App.jsx"),
      `export default function App() {
  return <h1>Hello React + Vite</h1>;
}
`,
    );
  }

  return {
    nextSteps: ["npm run dev"],
  };
}
