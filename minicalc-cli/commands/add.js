export default function add(a, b) {
  if (!a || !b) {
    console.error("Please provide two numbers");
    return;
  }
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    console.log("Please provide valid numbers");
    return;
  }
  const x = Number(a);
  const y = Number(b);
  console.info(`${x} + ${y} = ${x + y}`);
}
