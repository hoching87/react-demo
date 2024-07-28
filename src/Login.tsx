import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, SyntheticEvent } from "react";
import UserContext from "./UserContext";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

interface IFormData {
	name?: string;
	password?: string;
}

const Login = () => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const { user, setUser } = useContext(UserContext);
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: async (data: IFormData) => {
			const res = await axios.post(
				`${process.env.REACT_APP_API_ROUTE}/login`,
				data
			);

			setUser(res.data);
			localStorage.setItem("user", JSON.stringify(res.data));
			navigate("/dashboard");
		},
		onError(error, variables, context) {
			openSnack();
		},
	});

	const openSnack = () => {
		setError(true);
		setOpen(true);
	};

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const action = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				p: 3,
			}}
		>
			<form
				onSubmit={handleSubmit((data) => mutate(data))}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<h1>Login</h1>
				<TextField
					{...register("name", { required: true })}
					label="Name"
					variant="filled"
					error={error}
				/>

				<TextField
					{...register("password", { required: true })}
					label="Password"
					variant="filled"
					type="password"
					error={error}
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					disabled={isPending}
				>
					Submit
				</Button>

				<Link to="/register">Register</Link>
			</form>
			<Snackbar
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Login Failed!"
				action={action}
			/>
		</Box>
	);
};

export default Login;
