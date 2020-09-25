import PropTypes from 'prop-types';

import WeatherInfo from './WeatherInfo';
import WeatherList from './WeatherList';

import styles from './WeatherView.module.css';

import _ from 'lodash';

function WeatherView(props) {
	const { weather_info } = props;

	return (
		<section className={styles.weatherView}>
			<img className={styles.weatherView__background} src="/background.jpg" />

			{
				!_.isEmpty(weather_info?.current) ?
				<>
					<WeatherInfo weather_info={weather_info}/>
					
					<WeatherList forecastday={weather_info?.forecast?.forecastday}/>
				</>
				:
				null
			}
		</section>
	)
}

WeatherView.propTypes = {
	weather_info: PropTypes.shape({}),
};

export default WeatherView
