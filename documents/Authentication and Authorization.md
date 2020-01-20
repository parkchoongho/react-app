# Authentication and Authorization

### Submitting the Registration Form

userService.js

```javascript
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/users`;

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.nickname
  });
}
```

registerForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", nickname: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    nickname: Joi.string()
      .required()
      .label("Nickname")
  };

  doSubmit = async () => {
    await register(this.state.data)
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("nickname", "Nickname")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
```

### Handling Registration Errors

registerForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", nickname: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    nickname: Joi.string()
      .required()
      .label("Nickname")
  };

  doSubmit = async () => {
    try {
      await register(this.state.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("nickname", "Nickname")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
```

### Submitting the Login Form

authService.js

```javascript
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}
```

loginForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { data } = this.state;
    await login(data.username, data.password);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

### Handling Login Errors

loginForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

### Storing the JWT

loginForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      this.props.history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

### Logging in the User upon Registration

loginForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", nickname: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    nickname: Joi.string()
      .required()
      .label("Nickname")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await register(data);

      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("nickname", "Nickname")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
```

### Getting the Current User

App.js

```javascript
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RegisterForm from "./components/registerForm";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
```

### Displaying the Current User on NavBar

navBar.jsx

```jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkUp">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
```

loginForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

registerForm.jsx

```jsx
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", nickname: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    nickname: Joi.string()
      .required()
      .label("Nickname")
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);

      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("nickname", "Nickname")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
```

