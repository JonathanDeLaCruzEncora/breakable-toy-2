// Add Jest DOM matchers for better assertions on DOM nodes
import "@testing-library/jest-dom";

// Mock Next.js Router (optional, for components using useRouter)
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(() => Promise.resolve()),
    back: jest.fn(),
  })),
}));
