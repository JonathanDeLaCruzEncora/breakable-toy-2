import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VarietyCard from "@/components/utils/VarietyCard"; // Adjust path as needed

// Mock Link component from Next.js
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

describe("VarietyCard", () => {
  const defaultProps = {
    imgSrc: "https://example.com/image.jpg",
    mainText: "Main Text",
    secondText: "Second Text",
    thirdText: "Third Text",
    link: "/some-link",
  };

  it("should render with correct props", () => {
    render(<VarietyCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.mainText)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.secondText)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.thirdText)).toBeInTheDocument();

    // Query the button (CardActionArea)
    const cardButton = screen.getByRole("button");
    expect(cardButton).toBeInTheDocument();
  });

  it("should render the correct image", () => {
    render(<VarietyCard {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultProps.imgSrc);
  });
});
