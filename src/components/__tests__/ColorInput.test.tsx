import { render, fireEvent } from "../../tests/utils";
import ColorInput from "../ColorInput";
import { FALLBACK_COLOR } from "../../utils";

describe("ColorInput", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call onInputChange with the input value on text change", () => {
    const onInputChange = vi.fn();
    const { getByRole } = render(<ColorInput inputColor={FALLBACK_COLOR} onInputChange={onInputChange} />);
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "#ffffff" } });
    expect(onInputChange).toHaveBeenCalledWith("#ffffff");
  });

  it("should call onInputChange with the fallback color on blur when the input color is invalid", () => {
    const onInputChange = vi.fn();
    const { getByRole } = render(<ColorInput inputColor="#f" onInputChange={onInputChange} />);
    const input = getByRole("textbox");
    fireEvent.blur(input);
    expect(onInputChange).toHaveBeenCalledWith(FALLBACK_COLOR);
  });

  it("should show the color in color preview element when the input color is valid", () => {
    const { getByTestId } = render(<ColorInput inputColor="#aaa" onInputChange={vi.fn()} />);
    const preview = getByTestId("color-preview");
    expect(preview).toHaveStyle("background-color: #aaa");
  });

  it("should show the fallback color in color preview element when the input color is invalid", () => {
    const { getByTestId } = render(<ColorInput inputColor="#f" onInputChange={vi.fn()} />);
    const preview = getByTestId("color-preview");
    expect(preview).toHaveStyle(`background-color: ${FALLBACK_COLOR}`);
  });

  it("should display error message when the color is invalid", () => {
    const { getByRole, getByText } = render(<ColorInput inputColor="#0a0aa" onInputChange={vi.fn()} />);
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "#f" } });
    const errorMessage = getByText("Invalid hex color code.");
    expect(errorMessage).toBeInTheDocument();
  });
});
