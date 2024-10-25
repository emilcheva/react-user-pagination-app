import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import TestProvider from "./TestProvider";

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: TestProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
