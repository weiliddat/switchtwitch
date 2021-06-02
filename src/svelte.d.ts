declare namespace svelte.JSX {
  interface DOMAttributes<T extends EventTarget> {
    onkeydown_Enter?: KeyboardEventHandler<T>;
  }
}
