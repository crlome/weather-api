import PropTypes from 'prop-types';

import styles from './WeatherInfo.module.css';

function WeatherInfo(props) {
	const { weather_info } = props;
	
	return (
		<article className={styles.weatherInfo__card}>
			<label className={styles.weatherInfo__title}>
				{weather_info?.location?.name}, {weather_info?.location?.region}, {weather_info?.location?.country}
			</label>
			<span className={styles.weatherInfo__subtitle}>
				{weather_info?.current?.condition?.text}
			</span>
			<div className={styles.weatherInfo__container}>
				<span className={styles.weatherInfo__temp}>{weather_info?.current?.temp_f}°</span>
				<img className={styles.weatherInfo__icon} src={weather_info?.current?.condition?.icon} />
			</div>
		</article>
	)
}

WeatherInfo.propTypes = {
	weather_info: PropTypes.shape({}),
}

export default WeatherInfo
