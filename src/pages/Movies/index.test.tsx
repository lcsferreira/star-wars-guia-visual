import { render, screen } from "@testing-library/react";
import Movies from "./index";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import * as useMovies from "../../hooks/useMovies";
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

const getMoviesSpy = jest.spyOn(useMovies, "useMovies");

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={["/movies"]}>
      <Movies />
    </MemoryRouter>
  );
};

describe("Movies", () => {
  it("should render 'Pesquisar por filmes' in SearchInput", () => {
    getMoviesSpy.mockReturnValueOnce({
      movies: [],
      loading: false,
      page: 1,
      total: 0,
      search: "",
      handleSearch: jest.fn(),
      handleSearchChange: jest.fn(),
      setPage: jest.fn(),
    });

    renderComponent();

    const searchInput = screen.getByPlaceholderText("Pesquisar por filmes");
    expect(searchInput).toBeInTheDocument();
  });

  it("should render 'Voltar' in BackButton", () => {
    getMoviesSpy.mockReturnValueOnce({
      movies: [],
      loading: false,
      page: 1,
      total: 0,
      search: "",
      handleSearch: jest.fn(),
      handleSearchChange: jest.fn(),
      setPage: jest.fn(),
    });

    renderComponent();
    const backButton = screen.getByText("Voltar");
    expect(backButton).toBeInTheDocument();
  });

  it("should render a loading spinner when loading", () => {
    getMoviesSpy.mockReturnValueOnce({
      movies: [],
      loading: true,
      page: 1,
      total: 0,
      search: "",
      handleSearch: jest.fn(),
      handleSearchChange: jest.fn(),
      setPage: jest.fn(),
    });

    renderComponent();

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  //test after fetching data
  it("should render the movies", async () => {
    getMoviesSpy.mockReturnValueOnce({
      movies: [
        {
          title: "A New Hope",
          episode_id: 4,
          opening_crawl: "It is a period of civil war...",
          director: "George Lucas",
          producer: "Gary Kurtz, Rick McCallum",
          release_date: "1977-05-25",
          characters: [],
          planets: [],
          starships: [],
          vehicles: [],
          species: [],
          created: "2014-12-10T14:23:31.880000Z",
          edited: "2014-12-20T19:49:45.256000Z",
          url: "https://swapi.dev/api/films/1/",
        },
      ],
      loading: false,
      page: 1,
      total: 1,
      search: "",
      handleSearch: jest.fn(),
      handleSearchChange: jest.fn(),
      setPage: jest.fn(),
    });

    renderComponent();
    expect(screen.getAllByText("A New Hope")).toHaveLength(2);
  });
});
