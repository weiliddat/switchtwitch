export async function flip(elm: HTMLElement, cb: CallableFunction) {
  const rect1 = elm.getBoundingClientRect();

  await cb();

  const rect2 = elm.getBoundingClientRect();

  const dX = rect1.left - rect2.left;
  const dY = rect1.top - rect2.top;
  const dW = rect1.width / rect2.width;
  const dH = rect1.height / rect2.height;

  elm.animate(
    [
      {
        transformOrigin: "top left",
        transform: `matrix(${dW}, 0, 0, ${dH}, ${dX}, ${dY})`,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: 200,
      easing: "ease-in-out",
      fill: "both",
    },
  );
}
