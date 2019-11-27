import React from 'react';

// 함수형 컴포넌트
// function WorldClock(props) {
// 	return (
// 		<div className="WorldClock">
// 			<h2>🌎:{props.city}</h2>
// 			<p>⏰:{props.time}</p>
// 		</div>
// 	)
// }

// // data가 없을 경우
// WorldClock.defaultProps = {
// 	city: 'Null',
// 	time: 'Null',
// }


// 클래스형 컴포넌트
	// 요구사항 1. 시간과 분이 변화하는 것을 보고 싶다.
	// 요구사항 2. 동적으로 보고 싶다.
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