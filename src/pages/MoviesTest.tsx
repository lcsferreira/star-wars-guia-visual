import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Movies from "./Movies";

test("renders movies component", () => {
  render(<Movies />);
  const searchInput = screen.getByPlaceholderText(/Pesquisar por filmes/i);
  expect(searchInput).toBeInTheDocument();
});

test("loads movies on initial render", async () => {
  render(<Movies />);
  const loadingSpinner = screen.getByLabelText(/loading/i);
  expect(loadingSpinner).toBeInTheDocument();

  // Wait for movies to load
  await screen.findByText(/movie title/i);

  expect(loadingSpinner).not.toBeInTheDocument();
  const movieCard = screen.getByText(/movie title/i);
  expect(movieCard).toBeInTheDocument();
});

test("searches for movies", async () => {
  render(<Movies />);
  const searchInput = screen.getByPlaceholderText(/Pesquisar por filmes/i);
  fireEvent.change(searchInput, { target: { value: "action" } });

  // Wait for movies to load
  await screen.findByText(/action movie/i);

  const movieCard = screen.getByText(/action movie/i);
  expect(movieCard).toBeInTheDocument();
});
