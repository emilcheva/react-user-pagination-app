import { ChangeEvent, useEffect, useState } from "react";
import { validHex, prefix, FALLBACK_COLOR } from "../utils";

type ColorInputProps = {
  inputColor: string;
  onInputChange: (color: string) => void;
};

const ColorInput = ({ inputColor, onInputChange }: ColorInputProps) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(validHex(inputColor));
  }, [inputColor]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsValid(validHex(inputValue));
    onInputChange(inputValue);
  };

  const handleBlur = () => {
    if (!validHex(inputColor)) {
      onInputChange(FALLBACK_COLOR);
      setIsValid(true);
    } else {
      onInputChange(prefix(inputColor));
    }
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <label htmlFor="color-input">Card background color:</label>
      <div className="flex flex-col">
        <div className="relative">
          <input
            id="color-input"
            className={`h-8 rounded-md p-2 ring-1 ring-gray-900/10 ${isValid ? "" : "border-red-500"}`}
            type="text"
            value={inputColor}
            onBlur={handleBlur}
            onChange={handleTextChange}
            placeholder="Enter hex color"
          />
          <span
            data-testid="color-preview"
            className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 transform ring-1 ring-gray-900/10"
            style={{ backgroundColor: validHex(inputColor) ? prefix(inputColor) : FALLBACK_COLOR }}
          />
        </div>
        <div className="h-5">{!isValid && <p className="text-sm text-red-700">Invalid hex color code.</p>}</div>
      </div>
    </div>
  );
};

export default ColorInput;
