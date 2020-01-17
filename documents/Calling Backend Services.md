# Calling Backend Services

### Getting Data

App.js

```jsx
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const { data: posts } = response;
    this.setState({ posts });
    console.log(this.state.posts);
  }

  handleAdd = () => {
    console.log("Add");
  };

  handleUpdate = post => {
    console.log("Update", post);
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

```

**componentDidMount** phase가 server에 요청하고 data를 가져오는데 좋은 단계입니다.

### Creating Data

App.js

```jsx
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await axios.get(apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
    console.log(this.state.posts);
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = post => {
    console.log("Update", post);
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

### Updating Data

App.js

```jsx
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await axios.get(apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
    console.log(this.state.posts);
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    await axios.patch(`${apiEndPoint}/${post.id}`, post);
    // axios.patch(`${apiEndPoint}/${post.id}`, { title: post.title });
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].title = post.title;
    this.setState({ posts });
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

### Deleting Data

```jsx
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await axios.get(apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
    console.log(this.state.posts);
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    await axios.patch(`${apiEndPoint}/${post.id}`, post);
    // axios.patch(`${apiEndPoint}/${post.id}`, { title: post.title });
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].title = post.title;
    this.setState({ posts });
  };

  handleDelete = async post => {
    await axios.delete(`${apiEndPoint}/${post.id}`, post);
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

### Optimistic vs Pessimistic Updates

App.js

```jsx
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await axios.get(apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
    console.log(this.state.posts);
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    await axios.patch(`${apiEndPoint}/${post.id}`, post);
    // axios.patch(`${apiEndPoint}/${post.id}`, { title: post.title });
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].title = post.title;
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(`${apiEndPoint}/${post.id}`, post);
      throw new Error("");
    } catch (error) {
      alert("Something Failed while Deleting a post!");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

Pessimistic Update란 서버를 먼저 호출하고 그 다음 View에 반영하는 것을 의미합니다. 이를 Pessimistic Update라고 합니다. 하지만 이렇게 코드를 작성할 경우, 사용자가 웹이 늦게 동작하는 것 처럼 느낍니다. 이러한 사용자 경험을 개선시키기 위해 View를 먼저 반영하고 그 다음 서버를 호출하는 작업을 시행합니다. 이를 Optimistic Update라 합니다. 그런데 Optimistic Update의 경우 서버를 호출할 때 에러가 발생한 경우 이를 다시 View에 반영해주어야합니다. 왜냐하면 사용자가 경험하는 View와 서버에서 제공하는 데이터간의 불일치가 발생할 수 있기 때문입니다. 따라서 위와 같이 원래의 state 값을 변수에 저장하고 서버 호출 과정에서 에러가 발생할 때, 그 변수 값을 state에 다시 반영시킵니다.

### Expected vs Unexpected

App.js

```jsx
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await axios.get(apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
    console.log(this.state.posts);
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    await axios.patch(`${apiEndPoint}/${post.id}`, post);
    // axios.patch(`${apiEndPoint}/${post.id}`, { title: post.title });
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].title = post.title;
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(`${apiEndPoint}/${post.id}`, post);
      throw new Error("");
    } catch (error) {
      // Expected (404: Not Found, 400: Bad Request) - Client Errors
      // - Display a specific error message
      //
      // Unexpected (Network Down, Server Down, Database Down, Bug)
      // - Log Them
      // - Display a generic and friendly error message

      if (error.response && error.response.status === 404) {
        alert("This post has already been deleted");
      } else {
        console.log("Logging the error", error);
        alert("An unexpected error occured");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

-  Expected (404: Not Found, 400: Bad Request) - Client Errors
- => Display a specific error message
- Unexpected (Network Down, Server Down, Database Down, Bug)
- => Log Them
- => Display a generic and friendly error message

### Extracting a Reusable Http Service

httpService.js

```javascript
import axios from "axios";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 404 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    alert("An unexpected error occured");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
```

App.js

```javascript
import React, { Component } from "react";
import http from "./services/httpService";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await http.get(apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(apiEndPoint, obj);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    await http.patch(`${apiEndPoint}/${post.id}`, post);
    // http.patch(`${apiEndPoint}/${post.id}`, { title: post.title });
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].title = post.title;
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`s${apiEndPoint}/${post.id}`);
    } catch (error) {
      // Expected (404: Not Found, 400: Bad Request) - Client Errors
      // - Display a specific error message
      //
      // Unexpected (Network Down, Server Down, Database Down, Bug)
      // - Log Them
      // - Display a generic and friendly error message

      if (error.response && error.response.status === 404) {
        alert("This post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

### Extracting a Config Module

config.json

```json
{
  "apiEndPoint": "https://jsonplaceholder.typicode.com/posts"
}
```

App.js

```javascript
import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await http.get(config.apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndPoint, obj);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    await http.patch(`${config.apiEndPoint}/${post.id}`, post);
    // http.patch(`${config.apiEndPoint}/${post.id}`, { title: post.title });
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].title = post.title;
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`${config.apiEndPoint}/${post.id}`);
    } catch (error) {
      // Expected (404: Not Found, 400: Bad Request) - Client Errors
      // - Display a specific error message
      //
      // Unexpected (Network Down, Server Down, Database Down, Bug)
      // - Log Them
      // - Display a generic and friendly error message

      if (error.response && error.response.status === 404) {
        alert("This post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

### Displaying Toast Notifications

httpService.js

```javascript
import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 404 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error occured");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
```

App.js

```javascript
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await http.get(config.apiEndPoint);
    const { data: posts } = response;
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndPoint, obj);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    await http.patch(`${config.apiEndPoint}/${post.id}`, post);
    // http.patch(`${config.apiEndPoint}/${post.id}`, { title: post.title });
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].title = post.title;
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`${config.apiEndPoint}/${post.id}`);
    } catch (error) {
      // Expected (404: Not Found, 400: Bad Request) - Client Errors
      // - Display a specific error message
      //
      // Unexpected (Network Down, Server Down, Database Down, Bug)
      // - Log Them
      // - Display a generic and friendly error message

      if (error.response && error.response.status === 404) {
        alert("This post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
```

### Logging Errors

여기서는 Error를 확인할 수 있는 서비스를 소개합니다.

```powershell
PS C:\Users\User\Desktop\Programming\Section 8- Calling Backend Services\Section 8- Calling Backend Services\start\http-app> npm i @sentry/browser
```

설치 후, 각각 코드를 추가합니다.

index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as Sentry from "@sentry/browser";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({
  dsn: "https://9a8bf4c30f984940be00f5c3184498cc@sentry.io/1885408"
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
```

httpService.js

```javascript
import axios from "axios";
import * as Sentry from "@sentry/browser";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 404 &&
    error.response.status < 500;

  if (!expectedError) {
    Sentry.captureException(error);
    toast.error("An unexpected error occured");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
```

`index.js`에 작성되어 있는 dsn은 https://sentry.io 에서 받는 url입니다.

### Extracting a Logger Service

logService.js

```javascript
import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://9a8bf4c30f984940be00f5c3184498cc@sentry.io/1885408"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };
```

httpService.js

```javascript
import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 404 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occured");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
```

index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import logger from "./services/logService";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

logger.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
```

