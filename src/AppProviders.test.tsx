import { render, screen } from "./tests/utils";
import AppProviders from "./AppProviders";

const defaultProps = {
  children: "Content",
};

const renderComponent = () => render(<AppProviders {...defaultProps} />);

describe("AppProviders", () => {
  it("should match snapshot", () => {
    renderComponent();
    const content = screen.getByText("Content");
    expect(content).toBeInTheDocument();
  });
});
