export function keyHandler(node: Node) {
  node.addEventListener("keydown", (e: KeyboardEvent) => {
    node.dispatchEvent(new CustomEvent(`keydown_${e.key}`));
  });

  node.addEventListener("keyup", (e: KeyboardEvent) => {
    node.dispatchEvent(new CustomEvent(`keyup_${e.key}`));
  });
}
