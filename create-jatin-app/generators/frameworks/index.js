import { generateVanilla } from "./vanilla.js";
import { generateExpress } from "./express.js";
import { generateNext } from "./next.js";
import { generateReactVite } from "./reactVite.js";

const generators = {
  vanilla: generateVanilla,
  express: generateExpress,
  next: generateNext,
  "react-vite": generateReactVite,
};

export function getFrameworkGenerator(framework) {
  const generator = generators[framework];

  if (!generator) {
    throw new Error(`Unknown framework: ${framework}`);
  }

  return generator;
}
