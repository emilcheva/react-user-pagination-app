import { render } from "../../tests/utils";
import List from "../List";

describe("List and ListItem", () => {
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });
  it("should apply background color from context to ListItem", () => {
    const { getByRole } = render(
      <List itemsBgColor="#f00">
        <List.Item>Item 1</List.Item>
      </List>,
    );
    const listItem = getByRole("listitem");
    expect(listItem).toHaveStyle("background-color: #f00");
  });

  it("should throw an error when ListItem is used outside of a List", () => {
    const renderListItemOutsideList = () => {
      render(<List.Item>Item</List.Item>);
    };
    expect(renderListItemOutsideList).toThrow("ListItem must be used within a List component");
  });
});
