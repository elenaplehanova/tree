import { render, screen } from "@testing-library/react";
import App from "./App";

test("main header", () => {
    render(<App />);
    const headerElement = screen.getByText(/tree/i);
    expect(headerElement).toBeInTheDocument();
});
