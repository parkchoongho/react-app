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

### Binding Event Handlers

obj.method()로 바로 부르는 것은 this에 대한 접근권한을 가집니다. 하지만 특정 event에 function을 정의해놓고 그 event가 발생할 때 함수를 호출하는 것은 this에 대한 접근권한을 제한합니다. 이럴 때는 **bind method**이나 **arrow function**을 활용합니다.

```javascript
class Counter extends Component {
  state = {
    count: 0
    // tags: ["tag1", "tag2", "tag3"]
  };

  // constructor() {
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  handleIncrement = () => {
    console.log("Increment Clicked!");
    console.log(this);
  };

}
```

