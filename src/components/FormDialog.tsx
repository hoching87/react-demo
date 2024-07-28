import {
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { IEvent } from "../types";
import { useState, Fragment, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import UserContext from "../UserContext";

export interface EventDialogProps {
	open: boolean;
	onClose: () => void;
	event?: IEvent;
	title: string;
	refresh: () => void;
}

interface IFormData {
	name?: string;
	location?: string;
	startDate?: Dayjs;
	endDate?: Dayjs;
	poster?: string;
}

const EventDialog = ({
	onClose,
	open,
	event,
	title,
	refresh,
}: EventDialogProps) => {
	const { user, setUser } = useContext(UserContext);
	const { register, handleSubmit, control, reset, setValue } = useForm({
		defaultValues: {
			name: event?.name,
			location: event?.location,
			startDate: dayjs(event?.startDate),
			endDate: dayjs(event?.endDate),
			poster: event?.poster,
		} as IFormData,
	});
	const [error, setError] = useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: async (data: IFormData) => {
			if (event?._id) {
				const res = await axios.post(
					`${process.env.REACT_APP_API_ROUTE}/user/event/update/${event._id}`,
					{
						...data,
						startDate: data.startDate?.valueOf(),
						endDate: data.endDate?.valueOf(),
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
			} else {
				const res = await axios.post(
					`${process.env.REACT_APP_API_ROUTE}/user/event/create`,
					{
						...data,
						startDate: data.startDate?.valueOf(),
						endDate: data.endDate?.valueOf(),
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
			}

			refresh();
			reset();
			handleClose();
		},
		onError(error, variables, context) {},
	});

	const handleClose = () => {
		reset();
		onClose();
	};

	useEffect(() => {
		if (event) {
			setValue("name", event?.name);
			setValue("location", event?.location);
			setValue("startDate", dayjs(event?.startDate));
			setValue("endDate", dayjs(event?.endDate));
			setValue("poster", event?.poster);
		}
	}, [event]);

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
						{...register("name", { required: true })}
						label="Name"
						variant="filled"
						fullWidth
					/>
					<TextField
						{...register("location", { required: true })}
						label="Location"
						variant="filled"
						fullWidth
					/>
					<Controller
						control={control}
						// defaultValue={dayjs().startOf("D")}
						name="startDate"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<DatePicker
									defaultValue={dayjs()}
									label="Start Date"
									value={field.value}
									inputRef={field.ref}
									onChange={(date: any) => {
										field.onChange(date);
									}}
									sx={{ width: "100%" }}
								/>
							);
						}}
					/>
					<Controller
						control={control}
						// defaultValue={dayjs().startOf("D")}
						name="endDate"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<DatePicker
									defaultValue={dayjs()}
									label="Start Date"
									value={field.value}
									inputRef={field.ref}
									onChange={(date: any) => {
										field.onChange(date);
									}}
									sx={{ width: "100%" }}
								/>
							);
						}}
					/>
					<TextField
						{...register("poster", { required: true })}
						label="Poster"
						variant="filled"
						fullWidth
					/>
					{/* <input type="file" {...register("poster")}></input> */}
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
		</Dialog>
	);
};

export default EventDialog;
