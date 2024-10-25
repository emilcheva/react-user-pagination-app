import { server } from "../../mocks/server";
import { render, screen, fireEvent, waitFor } from "../../tests/utils";
import { http, HttpResponse } from "msw";
import Users from "../Users";
import { queryClient } from "../../tests/queryClientSetup";
import { FALLBACK_COLOR } from "../../utils";

describe("Users Component", () => {
  it("should show skeleton screens when component renders and data is fetching", async () => {
    const skeletonElements = Array.from(document.querySelectorAll("loading-skeleton"));

    render(<Users />);

    expect(screen.getByText(/users/i)).toBeInTheDocument();
    skeletonElements.forEach((skeleton) => expect(skeleton).toBeVisible());
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
  });

  it("should fetch first 3 users when component renders", async () => {
    render(<Users />);

    expect(screen.getByText(/users/i)).toBeInTheDocument();

    const userNames = await screen.findAllByText(/marcus madsen|karl johnson|mirja stecher/i);
    expect(userNames).toHaveLength(3);
  });

  it('should show "Prev" pagination button as disabled when component renders 1-st page ', async () => {
    render(<Users />);

    expect(screen.getByText(/users/i)).toBeInTheDocument();

    await screen.findAllByText(/marcus madsen|karl johnson|mirja stecher/i);
    expect(screen.getByText(/current page/i)).toHaveTextContent("1");
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
  });

  it('should prefetch next page when "Next" pagination button is clicked', async () => {
    render(<Users />);

    await screen.findByText(/Marcus Madsen/i);

    const nextButton = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextButton);

    const queryCache = queryClient.getQueryCache();
    await waitFor(() => {
      const nextPageData = queryCache.find({ queryKey: ["users", 2] });
      expect(nextPageData).toBeTruthy();
    });
  });

  it("should display error when an error on fetch occurs", async () => {
    server.use(
      http.get("https://randomuser.me/api/", () => {
        return new HttpResponse(null, {
          status: 404,
        });
      }),
    );

    render(<Users />);

    const error = await screen.findByText(/Error: Request failed with status code 404/i);
    expect(error).toBeInTheDocument();
  });

  it("should show fallback color when changing pages", async () => {
    render(<Users />);

    const colorInput = (await screen.findByRole("textbox")) as HTMLInputElement;
    fireEvent.change(colorInput, { target: { value: "#fa0" } });

    const nextButton = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextButton);

    await screen.findByText(/Marcus Madsen/i);

    expect(colorInput.value).toBe(FALLBACK_COLOR);
    expect(screen.getByTestId("color-preview")).toHaveStyle(`background-color: ${FALLBACK_COLOR}`);
  });
});
