# React with Django


## React 개요

- React를 왜 쓰는가?

  - 인기가 많다.

    - Stack Over Flow 개발자 Web Frameworks 인지도 투표에서 React.js는 2위를 차지

- React.js의 장점

  - **상호작용이 많은 UI**

  - 효율적인컴포넌트 갱신 및 렌더링

  - **스스로 상태를 관리하는 컴포넌트**

  - DOM과 별개로 상태(State)관리

  - **앱안 데이터를 손쉽게 전달**

- DOM(Document Object Model)

  - HTML Document (구조적으로 짜여있는 웹 페이지 문서구조 자체)

  - 거대한 트리구조 트리 구조로 웹사이트가 작동함

- Component

  - 웹의 기능별 추상화, 모듈화

- 기존 웹 의 인터랙션
  - 데이터의 변경이 있을때, 처음부터 다시 로드되어 웹에 정보가 표출됨
  - 규모가 큰 웹의 경우 속도가 상당히 느리다.

- React의 인터랙션
  - 데이터의 변겨이 있을때, 변경사항만 렌더함 (Virtual Dom)을 이용하여

- React의 활용을 위해 할 수 있는것
  1. 전체 컴포넌트의 구조 기획
  2. 각 컴포넌트가 가지는 상태(State)와 변화를 생각한다.
  3. 컴포넌트를 만든다.
  4. 컴포넌트에 HTML과 비슷한 것(JSX)을 통해 구조를 만들어 준다.
  5. CSS를 통해 꾸민다.
  6. 여러 React의 함수를 통해 기능을 추가한다.

## create-react-app

- npm
  - Node Package Manager
  - Node.js 에 들어간 다양한 라이브러리들을 들어가는 도구
- npm특징
  1. 개별 프로젝트 폴더에 따로 설치 가능
  2. 전체적으로 사용하도록 설치도 가능(-g, global)
  3. 사용은 주로 npm으로 시작
  4. npx : 따로 모듈 설치없이 사용할 수 있게 해주는 툴

- node.js 설치

```bash
node --version
// 노드 버전확인
npm --version
// npm 버전확인
npm
// npm 커맨드확인
```

- 리액트 앱 생성

```bash
npx create-react-app appname
cd appname
```

- 서버실행

```
yarn start
// npm start
```

- 설정(프로젝트 커스마이징)
  - eject이후에는 프로젝트를 eject 이전으로 되돌릴 수 없다!

```bash
yarn eject

//Remove untracked files, stash or commit any changes, and try again. 와 같은 에러 발생 커밋 이후 진행
```

- 생성된 리액트 앱 구조
  - public / index.html
    - 실제 로드되는 단일 페이지, 내부에 <div id=root>를 제외 하고는 아무것도 없음.
  - src / index.js 및 App.js
    - App.js에 실제 모든 내용들을 표현 함

## JSX

- JSX
  - JS에서 사용하는 HTML과 거의 유사한 형태.
  - Attributes는 css 카멜 방식이다.
    - className, textAlign
    - -로 구분되는 속성은 대문자로 (font-size = fontSize)
  - 리액트에서 사용하는 문법 구조로 ES6의 정식 언어가 아니다.
  - JSX에서 Js를 활용하기 위해서는 {}를 이용한다.
  
## Props, list(Map)

- Props
  - 하위 컴포넌트로 데이터를 전달
  - Props값은 부모가 자식에게 주는 값
  - Read Only (읽기 전용)

- App.js

```react
import React from 'react';
import WorldClock from './views/WorldClock';
import './App.css';

function App() {

	const cityTimeData = [
		 {city: '서울', clock: 10},
		 {city: '베이징', clock: 9},
		 {city: '시드니', clock: 12},
		 {city: 'LA', clock: 17},
	]

	const WorldClockList = cityTimeData.map((item, idx)=>(
		<WorldClock
			key={idx}
			city={item.city}
			time={item.clock}
		/>
	))

	const cityTimeDataV2 = [
		['도쿄', 10],
		['모스크바', 9],
		['런던', 14],
		['시애틀', 19],
	]

	const WorldClockListV2 = cityTimeDataV2.map((item, idx)=>(
		<WorldClock city={item[0]} time={item[1]} key={idx}/>
	))


	return (
		<div className="App">
			<h1>WorldTime V1</h1>
			{WorldClockList}
			<hr/>
			<h1>WorldTime V2</h1>
			{WorldClockListV2}
		</div>
	);
}
export default App;

```

- WroldClock.js

```react
import React from 'react';

function WorldClock(props) {
	return (
		<div className="WorldClock">
			<h2>🌎:{props.city}</h2>
			<p>⏰:{props.time}</p>
		</div>
	)
}

WorldClock.defaultProps = {
	city: 'Null',
	time: 'Null',
}

export default WorldClock;
```

## State(Class Component)

- State는 어떨때 사용할까?
  - 상태를 Props 만으로 표현할 수 없을 때
  - Render로 표시되지 않는 값일 때

- 함수형 컴포넌트(functional Component)
  - 클래스 컴포넌트에 비해 가볍고 속도가 빠른 장점이 있다.
  - State(hook)
    - 함수형 컴포넌트는 기존에는 State를 사용할 수 없었지만. Hook의 등장으로 state를 사용할 수 있게됨

- 클래스 컴포넌트

```react
import React from 'react';


// 클래스형 컴포넌트
	// 요구사항 1. 시간과 분이 변화하는 것을 보고 싶다.
	// 요구사항 2. 동적으로 보고 싶다.
class WorldClock extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			hour: this.props.time,
			minute: 0
		}

		setInterval(() => {
			this.setState((state)=>(
				state.minute === 59
				?{hour: state.hour+1, minute: 0}
				:{minute: state.minute+1}
			))
		}, 1000);
    
	}

	// render는 미리 약속된 함수
	render() {
		return (
			<div className="WorldClock">
				<h2>🌎:{this.props.city}</h2>
				<p>⏰:{this.state.hour}시 {this.state.minute}분</p>
			</div>	
		)	
	}
}

export default WorldClock;
```

## Event, Event Handling(Class Component)

- EVENT
  - 웹 상에서 일어나는 모든 행위(매우 많다)
- on + Event ex)

```
document.onclick = () => console.log("DOCUMENT CLICKED")
```

- 리액트에서 Event사용 방벙(exam code)
  1. State 생성
  2. Handling 함수 생성
  3. 이벤트 발생하는 HTML 태그에서 onEvent명을 통해 Handling함수를 부른다.

```react
import React from 'react';


// 클래스형 컴포넌트
class WorldClock extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			hour: this.props.time,
			minute: 0,
			stop: false,
			content: '',
		}

		this.timer = setInterval(() => {
			this.setState((state)=>(
				state.minute === 59
				?{hour: state.hour+1, minute: 0}
				:{minute: state.minute+1}
			))
		}, 100);

	}

	handlingClick = (evt) => {
		this.setState(
			{stop: evt.target.value}
		)
		clearInterval(this.timer)
	}

	handlingChange = (evt) => {
		this.setState({content: evt.target.value})
	}

	// render는 미리 약속된 함수
	render() {
		return (
			<div className="WorldClock">
				<input type="text" onChange={this.handlingChange} value={this.state.content} />
				<h1>{this.state.content}</h1> 
				<h2>🌎:{this.props.city}</h2>
				<p>⏰:{this.state.hour}시 {this.state.minute}분</p>
				<button onClick={this.handlingClick} value={true}>Stop</button>
			</div>	
		)	
	}
}

export default WorldClock;
```

## 11. Lifecycle

- LifeCycle(생명주기)

  - https://react-anyone.vlpt.us/05.html

  - 컴포넌트가
    - 나타날 때(Mounting)
    - 업데이트 될 때(Updating)
    - 사라질 때(Unmounting)

  1. Mounting(나타날 때)
     - Constructor : 생성자 함수, 만든 컴포넌트가 처음 브라우저에 나타나는 과정에서 먼저 생성되는 함수 (state등의 초기 설정 진행)

     - getDerivedStateFromProps : Props로 받은 값을 State로 동기화 시 사용, 마운팅, 업데이트 과정에서 실행됨

  - render : 어떤 돔을 만들지, 내부 태그에 어떤 값을 전달 할지 결정,

    - componentDidMount : 컴포넌트가 브라우저에 나타난 시점에, 외부 라이브러리 및 네트워크 api 요청. 이벤트 요청을 주로 처리함

  2. Updating(업데이트 될 때)

     - shouldComponentUpdate : 컴포넌트가 업데이트 되는 성능 최적화, 컴포넌트는 기본적으로 부모컴포넌트의 자식 컴포넌트까지 랜더되도록 되어 있지만, 로직에 따라 false를 시켜 가상돔에 랜더링을 조작해 성능최적화를 시켜 줌(업데이트를 막아줌)

     - getSnapshotBeforeUpdate : 랜더링 직후 브라우저 상에 반영 직전 호출되는 함수, 스크롤의 위치 혹은 돔의 크기를 가져옴

     - componentDidUpdate : 컴포넌트가 업데이트 되었을때 호출되는 함수 / 스테이트 변경 시 / 페이지 변경 시

  3. Unmounting(사라질 때)

     - componentWillUnmount : 앞 서 설정한 리스너를 제거해주는 과정


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

