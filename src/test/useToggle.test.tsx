
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useToggle from "../hooks/useToggle";

describe("useToggle", () => {
  it("starts with the initial value and toggles it", () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });
});
