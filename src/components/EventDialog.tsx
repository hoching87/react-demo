import {
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IEvent } from "../types";
import { Fragment } from "react";
import { formatDate } from "../untils";

export interface EventDialogProps {
	open: boolean;
	onClose: () => void;
	event?: IEvent;
}

const EventDialog = ({ onClose, open, event }: EventDialogProps) => {
	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog onClose={handleClose} open={open} fullWidth>
			{event && (
				<Fragment>
					<DialogTitle>{event.name}</DialogTitle>
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>

					<DialogContent dividers>
						<Typography variant="body2">
							Location : {event.location}
						</Typography>
						<Typography variant="body2">
							StartDate : {formatDate(event.startDate)}
						</Typography>
						<Typography variant="body2">
							EndDate : {formatDate(event.endDate)}
						</Typography>
						<Typography variant="body2">
							Status : {event.status}
						</Typography>
					</DialogContent>
				</Fragment>
			)}
		</Dialog>
	);
};

export default EventDialog;
