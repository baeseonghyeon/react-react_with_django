import React from 'react'; 
import WorldClock from './views/WorldClock';

import './App.css';
import './assets/custom.scss';

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
		<div className="App">git commit -m "first commit"
			<h1>WorldTime V1</h1>
			{WorldClockList}
			<hr/>
			<h1>WorldTime V2</h1>
			{WorldClockListV2}
		</div>
	);
}
export default App;
