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

