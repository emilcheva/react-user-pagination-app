import { State, Action, pageColorReducer } from "../usePageColorReducer";

describe("usePageColorReducer", () => {
  const initialState: State = { currentPage: 1, colors: {} };
  it("should set the current page", () => {
    const action: Action = { type: "SET_PAGE", currentPage: 2 };
    const newState = pageColorReducer(initialState, action);
    expect(newState.currentPage).toBe(2);
  });

  it("should set the color for the current page", () => {
    const action: Action = { type: "SET_COLOR", color: "red" };
    const newState = pageColorReducer(initialState, action);
    expect(newState.colors[1]).toBe("red");
  });

  it("should return initial state for invalid action", () => {
    const action = { type: "SET_TEST", test: "test" };
    // @ts-ignore
    const newState = pageColorReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
