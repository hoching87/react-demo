import { Box, Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IEvent } from "./types";
import EventItem from "./components/EventItem";

const Main = () => {
	const { isError, data, error, refetch, isFetching } = useQuery({
		queryKey: ["events"],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_API_ROUTE}/events`
			);

			return res.data.res as IEvent[];
		},
	});

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
			<Button onClick={() => refetch()}>Referesh</Button>
			{isFetching ? (
				<span>Loading...</span>
			) : (
				<Stack
					direction="row"
					useFlexGap
					flexWrap="wrap"
					gap={3}
					justifyContent={"center"}
				>
					{data && <EventItem events={data}></EventItem>}
				</Stack>
			)}
		</Box>
	);
};

export default Main;
