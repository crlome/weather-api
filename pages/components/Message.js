import PropTypes from 'prop-types';

import { 
	Snackbar,
} from '@material-ui/core';

function Message(props) {
	const { error_message, setError } = props;

	const onCloseSnackbar = () => {
		setError(null);
	}

	return (
		<Snackbar
			autoHideDuration={3000}
			onClose={onCloseSnackbar}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={(error_message || '').length > 0}
			message={error_message}
		/>
	)
}

Message.propTypes = {
	error_message: PropTypes.string,
	setError: PropTypes.func.isRequired,
};

export default Message
