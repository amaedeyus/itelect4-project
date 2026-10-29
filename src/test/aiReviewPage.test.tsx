
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AiReviewPage from "../pages/aiReviewPage";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("AiReviewPage", () => {
  it("shows the schema error and sends no request for an empty report", async () => {
    const user = userEvent.setup();

    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AiReviewPage />
      </QueryClientProvider>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Review my report",
      })
    );

    expect(
      await screen.findByText(
        "Please enter at least 20 characters."
      )
    ).toBeInTheDocument();

    expect(fetchSpy).not.toHaveBeenCalled();

    queryClient.clear();
  });
});
