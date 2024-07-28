import { Box, Button, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IEvent } from "./types";
import FormDialog from "./components/FormDialog";
import { Fragment, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EventTable from "./components/EventTable";

const Main = () => {
	const { user, setUser } = useContext(UserContext);
	const { isError, data, error, refetch, isFetching } = useQuery({
		queryKey: ["events"],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_API_ROUTE}/user/events`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
					params: {
						status: filter === "all" ? "" : filter,
					},
				}
			);

			return res.data.res as IEvent[];
		},
	});
	const [modalOpen, setModal] = useState(false);
	const [filter, setFilter] = useState("all");

	const handleChange = (event: SelectChangeEvent) => {
		setFilter(event.target.value as string);
	};

	const handleOpen = () => {
		setModal(true);
	};

	const handleClose = () => {
		setModal(false);
	};

	useEffect(() => {
		refetch();
	}, [filter]);

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<Box
			p={5}
			alignItems="center"
			display="flex"
			flexDirection="column"
			gap={2}
		>
			<Box>
				<Button onClick={() => refetch()}>Referesh</Button>
				<Button onClick={() => handleOpen()}>Create</Button>
				<Select value={filter} label="Age" onChange={handleChange}>
					<MenuItem value="all">All</MenuItem>
					<MenuItem value="Ongoing">Ongoing</MenuItem>
					<MenuItem value="Completed">Completed</MenuItem>
				</Select>
			</Box>
			{isFetching ? (
				<span>Loading...</span>
			) : (
				<Fragment>
					{data && (
						<EventTable
							refresh={refetch}
							events={data}
						></EventTable>
					)}
				</Fragment>
			)}
			<FormDialog
				refresh={refetch}
				open={modalOpen}
				onClose={handleClose}
				title="Create Event"
			></FormDialog>
		</Box>
	);
};

export default Main;
