import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchData from "@/utils/fetchData"; // Mock fetchData
import { useRouter } from "next/navigation"; // Mock useRouter
import { useAuth } from "@/components/Auth/AuthContext";
import SearchBar from "@/components/Search/SearchBar";

// Mocking the dependencies
jest.mock("@/components/Auth/AuthContext");
jest.mock("@/utils/fetchData");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchBar Component", () => {
  const setSearchResults = jest.fn();
  const push = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock the context and router
    (useAuth as jest.Mock).mockReturnValue({
      accessToken: "mock-token",
      setSearchResults,
    });
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it("should render the search bar", () => {
    render(<SearchBar />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should update the query when typing in the input", async () => {
    render(<SearchBar />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test query");

    expect(input).toHaveValue("test query");
  });

  it("should call handleSearch when Enter key is pressed", async () => {
    render(<SearchBar />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test query");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Ensure fetchData was called with the expected URL
    await waitFor(() =>
      expect(fetchData).toHaveBeenCalledWith(
        "/search?query=test%20query",
        "mock-token"
      )
    );
    expect(setSearchResults).toHaveBeenCalled();
  });

  it("should clear the query when the clear icon is clicked", async () => {
    render(<SearchBar />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test query");

    const clearButton = screen.getByRole("button");
    userEvent.click(clearButton);

    await waitFor(() => {
      expect(input).toHaveValue(""); // Ensure the query is cleared
    });
  });

  it("should not call handleSearch if the query is empty", async () => {
    render(<SearchBar />);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // handleSearch should not be called if the query is empty
    await waitFor(() => expect(fetchData).not.toHaveBeenCalled());
  });
});
