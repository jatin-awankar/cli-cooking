import path from "path";

import fs from "fs-extra";

export async function generateNext(projectPath, typescript) {
  const packageJson = {
    name: path.basename(projectPath),
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },
    dependencies: {
      next: "^15.1.0",
      react: "^19.0.0",
      "react-dom": "^19.0.0",
    },
  };

  if (typescript) {
    packageJson.devDependencies = {
      typescript: "^5.7.3",
      "@types/node": "^22.10.5",
      "@types/react": "^19.0.2",
      "@types/react-dom": "^19.0.2",
    };
  }

  await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
    spaces: 2,
  });

  await fs.writeFile(
    path.join(projectPath, "next.config.mjs"),
    `/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
`,
  );

  const appDir = path.join(projectPath, "app");
  await fs.ensureDir(appDir);

  if (typescript) {
    await fs.writeJson(
      path.join(projectPath, "tsconfig.json"),
      {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "preserve",
          incremental: true,
          plugins: [{ name: "next" }],
          paths: { "@/*": ["./*"] },
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"],
      },
      { spaces: 2 },
    );

    await fs.writeFile(
      path.join(projectPath, "next-env.d.ts"),
      `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
`,
    );

    await fs.writeFile(
      path.join(appDir, "layout.tsx"),
      `export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
    );

    await fs.writeFile(
      path.join(appDir, "page.tsx"),
      `export default function Home() {
  return (
    <main>
      <h1>Hello Next.js + TypeScript</h1>
    </main>
  );
}
`,
    );
  } else {
    await fs.writeFile(
      path.join(appDir, "layout.js"),
      `export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
    );

    await fs.writeFile(
      path.join(appDir, "page.js"),
      `export default function Home() {
  return (
    <main>
      <h1>Hello Next.js</h1>
    </main>
  );
}
`,
    );
  }

  return {
    nextSteps: ["npm run dev"],
  };
}
