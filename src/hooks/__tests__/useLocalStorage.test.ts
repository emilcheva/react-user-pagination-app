import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";
import { vi } from "vitest";
import { act } from "react-dom/test-utils";

describe("useLocalStorage", () => {
  const key = "test";
  it("should return the initialState when provided", () => {
    const initialState = { currentPage: 1, colors: { "1": "#f0a" } };
    const { result } = renderHook(() => useLocalStorage(key, initialState));
    expect(result.current[0]).toEqual(initialState);
  });

  it("should store the initialState as serialized json in localstorage", () => {
    const initialState = { currentPage: 1 };
    renderHook(() => useLocalStorage("test", initialState));
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(initialState));
  });

  it("should log a console error when JSON parsing fails", () => {
    const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
    const invalidValue = "invalidJSON";
    localStorage.setItem(key, invalidValue);
    renderHook(() => useLocalStorage(key, {}));
    expect(consoleErrorMock).toHaveBeenCalled();
    expect(consoleErrorMock.mock.calls[0][0]).toBe(`Error parsing localStorage key "${key}":`);
    consoleErrorMock.mockRestore();
  });

  it("should save given value", () => {
    const { result } = renderHook(() => useLocalStorage("test", 1 as string | number));
    const setValue = result.current[1];
    expect(result.current[0]).toBe(1);
    act(() => setValue(123));
    expect(result.current[0]).toEqual(123);
    act(() => setValue("456"));
    expect(result.current[0]).toEqual("456");
  });
});
