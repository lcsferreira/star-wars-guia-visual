import { render, screen } from "@testing-library/react";
import { Home } from "./index";
import { MemoryRouter } from "react-router-dom";
// Dummy import so that the linter won't complain

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Home />
    </MemoryRouter>
  );
};

test("renders welcome message", () => {
  renderComponent();
  const welcomeMessage = screen.getByText(
    (_, element) =>
      element?.textContent === "Bem-vindo ao Guia Visual de Star Wars"
  );

  expect(welcomeMessage).toBeInTheDocument();
});

test("renders category cards", () => {
  renderComponent();
  const characterCard = screen.getByText("Personagens");
  const movieCard = screen.getByText("Filmes");
  const planetCard = screen.getByText("Planetas");
  const starshipCard = screen.getByText("Naves");

  expect(characterCard).toBeInTheDocument();
  expect(movieCard).toBeInTheDocument();
  expect(planetCard).toBeInTheDocument();
  expect(starshipCard).toBeInTheDocument();
});

test("renders footer", () => {
  renderComponent();
  const footer = screen.getByText(
    "Desenvolvido por Lucas Ferreira ©2024. Star wars e todos os personagens são de autoria da Disney e Lucasfilm. As imagens foram recolhidas livremente da Wookiepedia e Unsplash."
  );
  expect(footer).toBeInTheDocument();
});
