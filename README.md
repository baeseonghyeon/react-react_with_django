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

## Lifecycle

- LifeCycle(생명주기)

  - https://react-anyone.vlpt.us/05.html

1. 검포넌트가 나타날 때(Mounting)
2. 검포넌트가 업데이트 될 때(Updating)
3. 검포넌트가 사라질 때(Unmounting)

1. Mounting(나타날 때)
   - Constructor : 생성자 함수, 만든 컴포넌트가 처음 브라우저에 나타나는 과정에서 먼저 생성되는 함수 (state등의 초기 설정 진행)
   - State 구조 설정, 컴포넌트가 Mount 하기 전에 할 설정, setStateX
   - getDerivedStateFromProps : Props로 받은 값을 State로 동기화 시 사용, 마운팅, 업데이트 과정에서 실행됨
   - render : 어떤 돔을 만들지, 내부 태그에 어떤 값을 전달 할지 결정,
   - **componentDidMount** : 컴포넌트가 브라우저에 나타난 시점에, 외부 라이브러리 및 네트워크 api 요청. 이벤트 요청을 주로 처리함
     - 필요한 데이터 요청
     - 각종 비동기 요청(Subscription)

2. Updating(업데이트 될 때)
   - shouldComponentUpdate : 컴포넌트가 업데이트 되는 성능 최적화, 컴포넌트는 기본적으로 부모컴포넌트의 자식 컴포넌트까지 랜더되도록 되어 있지만, 로직에 따라 false를 시켜 가상돔에 랜더링을 조작해 성능최적화를 시켜 줌(업데이트를 막아줌)
   - getSnapshotBeforeUpdate : 랜더링 직후 브라우저 상에 반영 직전 호출되는 함수, 스크롤의 위치 혹은 돔의 크기를 가져옴
   - **componentDidUpdate** : 컴포넌트가 업데이트 되었을때 호출되는 함수 / 스테이트 변경 시 / 페이지 변경 시
     - 업데이트 이후 수정할 때
     - If() { setState() } #setState 자체가 업데이트이기 때문에 루프에 빠질 수 있음, 분기를 달아주세요.

3. Unmounting(사라질 때)
   - **componentWillUnmount** : 앞 서 설정한 리스너를 제거해주는 과정
     - 데이터 요청, 비동기 함수, 타이머 종료
     - setState X

4. 컴포넌트 업데이트 최적화
   - PureComponent
     - 자식 컴포넌트 + 부모의 Updata 최적화
     - 자동화

     ```react
     class Exam extends React.PureComponent {
       
     }
     ```
   - ShouldComponentUpdate
     - 커스터마이징, 업데이트 여부 관리
     
     
## React Hook

- Hook을 통해서 함수영 컴포넌트에서도 state를 사용할 수 있다.
  - https://ko.reactjs.org/docs/hooks-state.html
- useState

```react
// 리액트 컴포넌트 구성에 필요한 요소들을 불러옵니다. useState 임포트
import React , { useState } from 'react';


fuction Example() {
  
// todo 라는 새로운 초기값 설정(useState) 상태값 정의와 함수생성(setTodo) 
// const [상태명, set상태명] = useState(초기값);
// set상태명 을 setState처럼 사용할 수 있다.

const [todo, setTodo] = useState('');
}
```
- Redux
  - 대규모 상태관리에 효과적 
     
     



