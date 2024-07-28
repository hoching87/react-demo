import { Link, useNavigate } from "react-router-dom";
import { useState, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import axios, { AxiosError } from "axios";

interface IFormData {
	name?: string;
	password?: string;
}

interface FieldErrors {
	name?: string;
	password?: string;
	passwordConfirm?: string;
}
interface IErrorRes {
	errors: {
		fields: FieldErrors;
	};
}

const Login = () => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState({} as FieldErrors);
	const [open, setOpen] = useState(false);
	const [snackMsg, setSnackMsg] = useState("");

	const { isPending, mutate } = useMutation({
		mutationFn: async (data: IFormData) => {
			const res = await axios.post(
				`${process.env.REACT_APP_API_ROUTE}/register`,
				data
			);

			openSnack("User Created!");
			navigate("/login");
		},
		onError(error: AxiosError<IErrorRes>, variables, context) {
			setError(error.response?.data.errors.fields || {});
		},
	});

	const openSnack = (msg: string) => {
		setSnackMsg(msg);
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
				<h1>Register</h1>
				<TextField
					{...register("name", { required: true })}
					label="Name"
					variant="filled"
					error={error.name ? true : false}
					helperText={error.name}
				/>

				<TextField
					{...register("password", { required: true })}
					label="Password"
					variant="filled"
					type="password"
					error={error.password ? true : false}
					helperText={error.password}
				/>

				<TextField
					{...register("passwordConfirm", { required: true })}
					label="Password Confirm"
					variant="filled"
					type="password"
					error={error.passwordConfirm ? true : false}
					helperText={error.passwordConfirm}
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					disabled={isPending}
				>
					Submit
				</Button>

				<Link to="/login">Login</Link>
			</form>
			<Snackbar
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={snackMsg}
				action={action}
			/>
		</Box>
	);
};

export default Login;
