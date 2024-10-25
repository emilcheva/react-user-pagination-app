import App from "./App";
import { render, screen } from "./tests/utils";

describe("App", () => {
  it("should render 'Users'", () => {
    render(<App />);
    const text = screen.getByText(/users/i);
    expect(text).toBeInTheDocument();
  });
});
