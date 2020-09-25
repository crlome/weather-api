import PropTypes from 'prop-types';

import styles from './WeatherList.module.css';

function WeatherList(props) {
	const { forecastday } = props;

	return (
		<article className={styles.weatherList__list}>
		{
			(forecastday || []).map((forecastday, index) =>
				<div className={styles.weatherList__item} key={index}>
					<label className={styles.weatherList__date}>{forecastday?.date}</label>
					<article className={styles.weatherList__group}>
						<div>
							<span className={styles.weatherList__groupTemp}>{forecastday?.day?.avgtemp_f}°</span>
							<img className={styles.weatherList__groupIcon} src={forecastday?.day?.condition?.icon} />
						</div>
						<span className={styles.weatherList__groupCondition}>{forecastday?.day?.condition?.text}</span>
					</article>
				</div>
			)
		}
		</article>
	)
}

WeatherList.propTypes = {
	forecastday: PropTypes.array,
}

export default WeatherList
