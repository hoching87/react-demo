import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
import { IEvent } from "../types";
import { Fragment, useState } from "react";
import EventDialog from "./EventDialog";
import { formatDate } from "../untils";

interface EventProps {
	events: IEvent[];
}

const EventItem = ({ events }: EventProps) => {
	const [modalOpen, setModal] = useState(false);
	const [event, setEvent] = useState<IEvent | undefined>();

	const handleOpen = (event: IEvent) => {
		setEvent(event);
		setModal(true);
	};

	const handleClose = () => {
		setModal(false);
	};

	return (
		<Fragment>
			{events.length ? (
				events?.map((event) => (
					<Card
						sx={{ maxWidth: 345 }}
						key={event._id}
						style={{ width: "500px" }}
					>
						<CardMedia
							sx={{ height: 200, backgroundSize: "contain" }}
							image={
								event.poster ||
								"https://placehold.co/800?text=Placeholder&font=roboto"
							}
							title="green iguana"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								{event.name}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Location : {event.location}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								StartDate : {formatDate(event.startDate)}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								EndDate : {formatDate(event.endDate)}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Status : {event.status}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size="small"
								onClick={() => handleOpen(event)}
							>
								Details
							</Button>
						</CardActions>
					</Card>
				))
			) : (
				<h2>Empty</h2>
			)}
			<EventDialog
				event={event}
				open={modalOpen}
				onClose={handleClose}
			></EventDialog>
		</Fragment>
	);
};

export default EventItem;
