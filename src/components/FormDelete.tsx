import {
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	Typography,
	TextField,
	Button,
	Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IEvent } from "../types";
import { useState, Fragment, useContext, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import UserContext from "../UserContext";

export interface EventDialogProps {
	open: boolean;
	onClose: () => void;
	event?: IEvent;
	title: string;
	refresh: () => void;
}

interface IFormData {
	password?: string;
}

const EventDialog = ({
	onClose,
	open,
	event,
	title,
	refresh,
}: EventDialogProps) => {
	const { user, setUser } = useContext(UserContext);
	const { register, handleSubmit, reset } = useForm();
	const [error, setError] = useState(false);
	const [snackOpen, setSnackOpen] = useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: async (data: IFormData) => {
			const res = await axios.post(
				`${process.env.REACT_APP_API_ROUTE}/user/event/delete/${event?._id}`,
				{
					password: data.password,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			refresh();
			reset();
			handleClose();
		},
		onError(error, variables, context) {
			reset();
			setSnackOpen(true);
		},
	});

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleSnackClose = (
		event: SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackOpen(false);
	};

	const action = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleSnackClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);

	return (
		<Dialog onClose={handleClose} open={open} fullWidth>
			<DialogTitle>{title}</DialogTitle>
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
				<Typography gutterBottom>Event : {event?.name}</Typography>
				<form
					onSubmit={handleSubmit((data) => mutate(data))}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "1rem",
					}}
				>
					<TextField
						{...register("password", { required: true })}
						label="Password"
						type="password"
						variant="filled"
						fullWidth
					/>

					<Button
						type="submit"
						variant="contained"
						fullWidth
						disabled={isPending}
					>
						Submit
					</Button>
				</form>
			</DialogContent>

			<Snackbar
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
				open={snackOpen}
				autoHideDuration={2000}
				onClose={handleSnackClose}
				message="Password Wrong!"
				action={action}
			/>
		</Dialog>
	);
};

export default EventDialog;
