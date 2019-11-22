# Components

### Specifying Children

```jsx
import React, { Component } from "react";

class Counter extends Component {
  render() {
    return <h1>Hello World</h1><button>Increment</button>;
  }
}

export default Counter;
```

위와 같이 코드를 입력하면 에러가 발생합니다. 왜냐하면 위 코드를 `React.createElement()` 로 변경하는 과정에서 첫번째 argument 값으로 해당 요소의 type 값이 들어갑니다. 그런데 요소가 여러개일 경우, babel이 어떤 요소를 넣어야 되는지 판별할 수 없기 때문에 컴파일을 실행할 수 없어 에러가 발생하게 됩니다. 

```jsx
import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <button>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

만일 `<div>` 태그가 추가되는 것이 싫다면 `React.Fragment` 를 사용하면 됩니다.

```jsx
import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Hello World</h1>
        <button>Increment</button>
      </React.Fragment>
    );
  }
}

export default Counter;
```

