import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { resetQueryClient } from "./tests/queryClientSetup";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  resetQueryClient();
  localStorage.clear();
  server.resetHandlers();
});
