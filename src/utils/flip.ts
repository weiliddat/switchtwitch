export class Flip {
  elm: HTMLElement;

  constructor(elm) {
    this.elm = elm;
  }

  async flip(cb: CallableFunction) {
    const rect1 = this.elm.getBoundingClientRect();

    await cb();

    const rect2 = this.elm.getBoundingClientRect();

    const dX = rect1.left - rect2.left;
    const dY = rect1.top - rect2.top;
    const dW = rect1.width / rect2.width;
    const dH = rect1.height / rect2.height;

    this.elm.animate(
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
        easing: "linear",
        fill: "both",
      },
    );
  }
}
