import { Dispatch } from "react";
import { act, renderHook } from "../../tests/utils";
import usePersistedPageColorReducer, { CURRENT_PAGE, PAGES_COLORS } from "../usePersistedPageColorReducer";
import { Action, State } from "../usePageColorReducer";

describe("usePersistedPageColorReducer", () => {
  it("should set the current page", () => {
    const { result } = renderHook(() => usePersistedPageColorReducer());
    const setPage: Dispatch<Action> = result.current[1] as Dispatch<Action>;
    act(() => {
      setPage({ type: "SET_PAGE", currentPage: 2 });
    });
    expect((result.current[0] as State).currentPage).toBe(2);
    expect(localStorage.getItem(CURRENT_PAGE)).toBe("2");
  });

  it("should set the color for the current page", () => {
    const { result } = renderHook(() => usePersistedPageColorReducer());
    const setColors: Dispatch<Action> = result.current[1] as Dispatch<Action>;
    act(() => {
      setColors({ type: "SET_COLOR", color: "#000" });
    });

    const state = result.current[0] as State;
    expect(state.colors[state.currentPage]).toBe("#000");
    const parsedColors = JSON.parse(localStorage.getItem(PAGES_COLORS) as string);
    expect(parsedColors[state.currentPage]).toBe("#000");
  });
});
