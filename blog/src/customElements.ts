import { DOMAttributes } from "react";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: unknown }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["theme-switcher"]: CustomElement<unknown>;
    }
  }
}
