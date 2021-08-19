import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	isLoading: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 50px'
	}
}));

const Loading = () => {
	const classes = useStyles();
	return (
		<div className={classes.isLoading}>
			<Skeleton />
			<Skeleton animation={false} />
			<Skeleton animation="wave" />
		</div>
	);
};

export default Loading;
