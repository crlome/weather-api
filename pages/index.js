import { useState } from 'react';

import Search from './components/Search';
import WeatherView from './components/WeatherView';

export default function Home() {
	const [weather_info, setWeatherInfo] = useState({});

	return (
		<div>
			<Search setWeatherInfo={setWeatherInfo}/>

			<WeatherView weather_info={weather_info}/>
		</div>
	)
}
