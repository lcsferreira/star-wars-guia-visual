import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

test("renders welcome message", () => {
  render(<Home />);
  const welcomeMessage = screen.getByText(
    /Bem-vindo ao Guia Visual de Star Wars/i
  );
  expect(welcomeMessage).toBeInTheDocument();
});

test("renders category cards", () => {
  render(<Home />);
  const characterCard = screen.getByText(/Personagens/i);
  const movieCard = screen.getByText(/Filmes/i);
  const planetCard = screen.getByText(/Planetas/i);
  const starshipCard = screen.getByText(/Naves/i);

  expect(characterCard).toBeInTheDocument();
  expect(movieCard).toBeInTheDocument();
  expect(planetCard).toBeInTheDocument();
  expect(starshipCard).toBeInTheDocument();
});

test("renders footer", () => {
  render(<Home />);
  const footer = screen.getByText(/©2024 Star Wars App, Inc./i);
  expect(footer).toBeInTheDocument();
});
