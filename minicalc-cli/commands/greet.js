export default function greetCommand(name, options) {
  if (!name) {
    console.error("Please provide a name");
    return;
  }
  if (!options) {
    console.info(`Hello ${name}`);
    return;
  } else if (options === "-u" || options === "--uppercase") {
    name = name.toUpperCase();
    console.info(`Hello ${name}`);
    return;
  } else if (options === "-l" || options === "--lowercase") {
    name = name.toLowerCase();
    console.info(`Hello ${name}`);
    return;
  } else if (options === "-t" || options === "--titlecase") {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    console.info(`Hello ${name}`);
    return;
  } else {
    console.error("Invalid option");
    return;
  }
}
