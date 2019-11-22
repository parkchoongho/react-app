# Getting Started

## What is React?

React는 유저 인터페이스를 생성하기 위해 개발된 자바스크립트 라이브러리입니다. React는 UI의 구성요소인 Component를 생성합니다. 이렇게 만들어진 여러 개의 Component를 구성해서 복잡한 유저 인터페이스를 구성하는 것이 React가 하는 일이라 생각하시면 됩니다.

### Component

Component는 자바스크립트 클래스로 생성됩니다. Component는 크게 2가지 state, render 메서드로 구성됩니다. state는 component가 렌더링될 때 화면에 나타낼 data를 의미하고 render는 UI가 화면에 어떻게 보일지를 결정하는 메서드입니다. 렌더링된 결과는 React Element가 됩니다.

### React Element

React Element는 메모리상의 실제 DOM element와 mapping 되는 자바스크립트 객체입니다. DOM을 lightweight 하게 표현한 것을 Virtual DOM이라고 합니다. (이 개념은 더 복잡하지만 여기서는 우선 이렇게만 정의하고 넘어가겠습니다.) Virtual DOM은 실제 DOM과는 다르게 생성되는데 많은 자원을 소비하지 않는데 React Element는 이 Virtual DOM을 계속해서 가지고 있습니다. 

만약 component의 state가 변경되면 react element도 변경됩니다. react는 이 요소를 그 전에 있던 요소와 비교해 변경된 부분을 감지하고 이를 실제 DOM에 반영합니다. 이렇게 React는 실제 DOM에 접근하지 않고 DOM 요소를 제어할 수 있게 됩니다. 

## First React App

### create-react-app

create-react-app은 react 프로젝트에 자동으로 설치해주는 module입니다. react 프로젝트에 필요한 여러가지 configuration을 자동으로 설치해줍니다. (light-weight development server, webpack, babel등등) 만약 이러한 configuration 사항을  customize하고 싶다면 npm run eject 명령어를 실행해 설정사항을 가져올 수 있습니다. (자세한 사항은 추후에 알아보겠습니다.)

react 프로젝트안에 있는 App.js를 살펴보겠습니다.

```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

자세히 보면 html 코드처럼 보이는 것이 있으나 이는 html이 아닙니다. 이는 자바스크립트 XML이며 JSX라 불립니다. JSX는 UI가 어떻게 보이는지를 결정합니다.

위 코드가 동작하기 위해서는 이를 Babel이라는 compiler에게 전달합니다. Babel은 이 JSX syntax를 브라우저가 이해할 수 있는 자바스크립트 코드로 변경합니다. 그 다음, 브라우저가 컴파일된 자바스크립트 코드를 화면에 뿌리면 유저는 그 화면을 보게 되는 것이 React의 작동원리입니다.