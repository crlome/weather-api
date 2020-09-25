import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Search.module.css';

import api from '../api/weather';

import Message from './Message';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SearchIcon from '@material-ui/icons/Search';

import { 
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Tooltip,
} from '@material-ui/core';

function Search(props) {
	const available_days = 3;
	
	const { setWeatherInfo } = props;
	
	const [open_select_days, setOpenSelectDays] = useState(false);
	const [search, setSearch] = useState({ days: 3, zip_code: '' });
	const [error_message, setError] = useState(null);

	useEffect(() => {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((location) => {
				execSearch({
					zip_code: `${location.coords.latitude},${location.coords.longitude}`,
					days: search.days,
				});
			});
		}
	}, []);

	const execSearch = (search) => {
		api.get(search)
		.then(({ data }) => {
			setWeatherInfo(data);
			setError(null);
		}).catch(err => {
			console.log(err);
			setWeatherInfo({});
			setError('The Zip code provided is not valid');
		});
	}
	
	const handleChange = (field) => (event) => {
		let new_search = { ...search };
		new_search[field] = event.target.value;

		setSearch(new_search);
	};

	const handleClose = () => {
		setOpenSelectDays(false);
	};

	const handleOpen = () => {
		setOpenSelectDays(true);
	};

	const onClickSearch = () => {
		if((search.zip_code || '').trim().length == 0) {
			setError('The Zip code cannot be empty');
			return;
		}

		execSearch(search);
	}

	return (
		<Paper elevation={4} square>
			<Grid container spacing={2} justify="center">
				<Grid item>
					<Grid container spacing={1} alignItems="flex-end">
						<Grid item>
							<Tooltip title="Zip codes available: USA, UK and Canada" className={styles.search__iconTwoLines}>
								<LocationOnIcon />
							</Tooltip>
						</Grid>
						<Grid item>
							<TextField
								className={styles.search__formControl}
								onChange={handleChange('zip_code')}
								label="Zip code"
								helperText="Zip codes available: USA, UK and Canada"
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container spacing={1} alignItems="flex-end">
						<Grid item>
							<DateRangeIcon />
						</Grid>
						<Grid item>
							<FormControl>
								<InputLabel >Days</InputLabel>
								<Select
									className={styles.search__formControl}
									open={open_select_days}
									onClose={handleClose}
									onOpen={handleOpen}
									value={search.days}
									onChange={handleChange('days')}
								>
									{
										Array(available_days).fill().map((_, i) => <MenuItem key={i} value={i+1}>{i+1}</MenuItem>)
									}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						className={styles.search__button}
						startIcon={<SearchIcon />}
						onClick={onClickSearch}
					>
						Search
					</Button>
				</Grid>
			</Grid>

			<Message error_message={error_message} setError={setError}/>
		</Paper>
	)
}

Search.propTypes = {
	setWeatherInfo: PropTypes.func.isRequired,
};

export default Search
