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