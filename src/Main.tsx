import { Link } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";

export default () => {
	return (
		<div>
			<Link to={`/user`}>/user</Link>
			<Button variant="contained">Hello world</Button>
		</div>
	);
};
