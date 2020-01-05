# Pagination, Filtering, and Sorting

### Pagination - Component Interface

vidly Project의 movies.jsx

```jsx
import React, { Component } from "react";
import PageNavBar from "./common/pageNavBar";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4
  };

  summaryMovies() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    return <p>Showing {this.state.movies.length} movies in the database.</p>;
  }

  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log(page);
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize } = this.state;
    return (
      <React.Fragment>
        {this.summaryMovies()}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(movie._id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PageNavBar
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
```

pageNavBar.jsx

```jsx
import React from "react";

const PageNavBar = props => {
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">
            Previous
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            1
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            2
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            3
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavBar;
```

### Pagination - Displaying Pages

movies.jsx

```jsx
import React, { Component } from "react";
import PageNavBar from "./common/pageNavBar";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4
  };

  summaryMovies() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    return <p>Showing {this.state.movies.length} movies in the database.</p>;
  }

  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log(page);
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize } = this.state;
    return (
      <React.Fragment>
        {this.summaryMovies()}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(movie._id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PageNavBar
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
```

pageNavBar.jsx

```jsx
import React from "react";
import _ from "lodash";

const PageNavBar = props => {
  const { itemsCount, pageSize } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {pages.map(page => (
          <li key={page} class="page-item">
            <a class="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageNavBar;
```

### Pagination - Handling Page Changes

movies.jsx

```jsx
import React, { Component } from "react";
import PageNavBar from "./common/pageNavBar";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
  };

  summaryMovies() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    return <p>Showing {this.state.movies.length} movies in the database.</p>;
  }

  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;
    return (
      <React.Fragment>
        {this.summaryMovies()}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(movie._id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PageNavBar
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
```

pageNavBar.jsx

```jsx
import React from "react";
import _ from "lodash";

const PageNavBar = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageNavBar;
```

### Pagination - Paginating Data

pageNavBar.jsx

```jsx
import React from "react";
import _ from "lodash";

const PageNavBar = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageNavBar;
```

movies.jsx

```jsx
import React, { Component } from "react";
import PageNavBar from "./common/pageNavBar";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
  };

  summaryMovies() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    return <p>Showing {this.state.movies.length} movies in the database.</p>;
  }

  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        {this.summaryMovies()}

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(movie._id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PageNavBar
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
```

paginate.js

```javascript
import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
```

### Pagination - Type Checking with PropTypes

만약 prop을 넘겨주는 것을 잊어먹거나 잘못된 type을 넘겨주는 경우에는 어떻게 해야 할까요? 이런경우에 사용하는 것이 바로 **PropTypes**입니다.

```jsx
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const PageNavBar = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

PageNavBar.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default PageNavBar;
```

### Filtering - Component Interface

movies.jsx

```jsx
import React, { Component } from "react";
import PageNavBar from "./common/pageNavBar";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate, genrenate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    currentGenre: "Action"
  };

  componentDidMount() {
    this.setState({ movies: getMovies() });
    this.setState({ genres: getGenres() });
  }

  summaryMovies() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    return <p>Showing {this.state.movies.length} movies in the database.</p>;
  }

  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ currentGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      currentGenre
    } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup items={genres} onItemSelect={} />
        </div>
        <div className="col">
          {this.summaryMovies()}

          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleDelete(movie._id);
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PageNavBar
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handleGenreSelect}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
```

listGroup.jsx

```jsx
import React, { Component } from "react";

const ListGroup = () => {
  return null;
};

export default ListGroup;
```

