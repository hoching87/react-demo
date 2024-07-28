import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Select,
	MenuItem,
	SelectChangeEvent,
} from "@mui/material";
import { IEvent } from "../types";
import FormDialog from "./FormDialog";
import { useContext, useState } from "react";
import { formatDate } from "../untils";
import axios from "axios";
import UserContext from "../UserContext";
import FormDelete from "./FormDelete";

interface EventProps {
	events: IEvent[];
	refresh: () => void;
}

const EventTable = ({ events, refresh }: EventProps) => {
	const [modalOpen, setModal] = useState(false);
	const [deleteOpen, setDelete] = useState(false);
	const [event, setEvent] = useState<IEvent>();
	const { user, setUser } = useContext(UserContext);

	const handleChange = async (id: string, value: string) => {
		const res = await axios.post(
			`${process.env.REACT_APP_API_ROUTE}/user/event/update/${id}`,
			{
				status: value,
			},
			{
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
		);

		refresh();
	};

	const handleOpen = (event: IEvent) => {
		setEvent(event);
		setModal(true);
	};

	const handleClose = () => {
		setModal(false);
	};

	const handleDeleteOpen = (event: IEvent) => {
		setEvent(event);
		setDelete(true);
	};

	const handleDeleteClose = () => {
		setDelete(false);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="right">Name</TableCell>
						<TableCell align="right">Location</TableCell>
						<TableCell align="right">Start Date</TableCell>
						<TableCell align="right">End Date</TableCell>
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{events.map((row) => (
						<TableRow
							key={row.name}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.location}</TableCell>
							<TableCell align="right">
								{formatDate(row.startDate)}
							</TableCell>
							<TableCell align="right">
								{formatDate(row.endDate)}
							</TableCell>
							<TableCell align="right">
								<Select
									value={row.status}
									label="Age"
									onChange={(event: SelectChangeEvent) => {
										handleChange(
											row._id,
											event.target.value
										);
									}}
								>
									<MenuItem value="Ongoing">Ongoing</MenuItem>
									<MenuItem value="Completed">
										Completed
									</MenuItem>
								</Select>
							</TableCell>
							<TableCell align="right">
								<Button
									onClick={() => {
										handleOpen(row);
									}}
								>
									Details
								</Button>
								<Button
									onClick={() => {
										handleDeleteOpen(row);
									}}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<FormDialog
				open={modalOpen}
				onClose={handleClose}
				refresh={refresh}
				event={event}
				title="Edit Event"
			></FormDialog>

			<FormDelete
				open={deleteOpen}
				onClose={handleDeleteClose}
				refresh={refresh}
				event={event}
				title="Delete Event"
			></FormDelete>
		</TableContainer>
	);
};

export default EventTable;
