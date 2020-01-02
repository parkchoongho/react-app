# Components Advanced

### Lifting the State Up

이제 navbar.jsx에서도 counters의 정보를 알고자 합니다. 그런데 현재 counters의 state는 counters.jsx에 저장되어 있습니다. counter.jsx와 다르게 counters.jsx는 navbar.jsx의 부모가 아닙니다. 이런 경우에는 어떻게 navbar.jsx에게 counters의 정보를 줄 수 있을까요? 바로 **Lifting State Up**을 통해서 입니다.

App.js

```jsx
import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [
      {
        id: 1,
        value: 4
      },
      {
        id: 2,
        value: 0
      },
      {
        id: 3,
        value: 0
      },
      {
        id: 4,
        value: 0
      }
    ]
  };

  handleReset = () => {
    const counters = this.state.counters.map(counter => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(
      counter => counter.id !== counterId
    );
    this.setState({ counters });
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value += 1;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value -= 1;
    this.setState({ counters });
  };
  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            counters={this.state.counters}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
```

counters.jsx

```jsx
import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            this.props.onReset();
          }}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            counter={counter}
          >
            <h4>Counter #{counter.id}</h4>
          </Counter>
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
```

navbar.jsx

```jsx
import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
          <span className="badge badge-pill badge-secondary">
            {this.props.totalCounters}
          </span>
        </a>
      </nav>
    );
  }
}

export default NavBar;
```

### Stateless Functional Components

navbar.jsx를 보면 render method만 보이는 것을 확인할 수 있습니다. 다른 eventhandler와 같은 method를 찾아볼 수 없습니다. 이런 경우 우리는 class component가 아닌, stateless functional component를 사용할 수 있습니다.

```jsx
import React from "react";

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
```

함수에서는 this keyword가 없습니다. 따라서 그대로 props로 받습니다. 그런데 받는 parameter를 destructing을 통해 받아서, 데이터마다 props.을 입력해야되는 것을 방지합니다.

### Lifecycle Hooks

Our components go through a few phases during their lifecycle. The first phase is **mounting phase**, and this is when an instance of a component is created and inserted into the DOM. In the **mounting phase** we have 3 lifecycle hooks, **constructor, render and componentDidMount**.

The second lifecycle is the **update phase**, and this happens when the state, or the props of a component get changed. In this phase we have two lifecycle hooks, **render and componentDidUpdate.**

And the last phase is the **unmounting phase**, and this is when a component is removed from the DOM such as when we delete the counter. In this phase we have one lifecycle hook, **componentWillUnmount.**

### Mounting Phase

Mounting은 태어나는 것과 같습니다.

- constructor()

react에서 온 것이 아니며, JavaScript에서 class를 만들 때 호출되는 것 method.

- render()

constructor()가 호출되고 그 다음 render()가 호출됩니다. 그리고 하나의 component가 render 되면 그 하위단에 있는 모든 components들도 render 됩니다.

- componentDidMount()

component가 render 될 때, 이 component가 처음 render 되었다고 알려줍니다.

App.js

```jsx
import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [
      {
        id: 1,
        value: 4
      },
      {
        id: 2,
        value: 0
      },
      {
        id: 3,
        value: 0
      },
      {
        id: 4,
        value: 0
      }
    ]
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor", this.props);
  }

  componentDidMount() {
    // Ajax Call
    console.log("App - Mounted");
  }

  handleReset = () => {
    const counters = this.state.counters.map(counter => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(
      counter => counter.id !== counterId
    );
    this.setState({ counters });
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value += 1;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value -= 1;
    this.setState({ counters });
  };

  render() {
    console.log("App - Rendered");
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            counters={this.state.counters}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
```

### Updating Phase

일반적인 업데이트를 뜻한다.

- render()
- componentDidUpdate()

State를 바꾸면 component를 호출하고 그 다음 render를 호출한 다음에, 업데이트가 완료되면 componentDidUpdate()가 실행된다.

counter.jsx

```jsx
import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps: ", prevProps);
    console.log("prevState: ", prevState);
  }

  render() {
    const {
      children,
      onIncrement,
      counter,
      onDecrement,
      onDelete
    } = this.props;
    return (
      <div>
        {children}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => {
            onIncrement(counter);
          }}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => {
            onDecrement(counter);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Decrement
        </button>
        <button
          onClick={() => {
            onDelete(counter.id);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
```

### Unmouting Phase

Component가 죽는 것을 의미한다. (페이지를 바꿀 때, state를 사용해 component를 교체 등등)

- componentWillUnmount

component가 사라질 때, 호출된다.

counter.jsx

```jsx
import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps: ", prevProps);
    console.log("prevState: ", prevState);
  }

  componentWillUnmount() {
    console.log("Counter - Unmount");
  }

  render() {
    const {
      children,
      onIncrement,
      counter,
      onDecrement,
      onDelete
    } = this.props;
    return (
      <div>
        {children}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => {
            onIncrement(counter);
          }}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => {
            onDecrement(counter);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Decrement
        </button>
        <button
          onClick={() => {
            onDelete(counter.id);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
```

참고자료: http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

