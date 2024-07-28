import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { AppBar, Box } from "@mui/material";
import UserContext, { IUser } from "./UserContext";

const Layout = () => {
	const [user, setUser] = useState({} as IUser);
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log("log");
		setUser({});
		localStorage.removeItem("user");
		navigate("/");
	};

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Box sx={{ p: 1 }}>
				<AppBar
					position="static"
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: 2,
						p: 1,
					}}
				>
					<Link to="/" style={{ marginLeft: "auto" }}>
						Home
					</Link>
					{user.token ? (
						<Fragment>
							<Link to="/dashboard">Dashboard</Link>
							<a onClick={handleLogout}>Logout</a>
						</Fragment>
					) : (
						<Link to="/login">Login</Link>
					)}
				</AppBar>
				<Outlet></Outlet>
			</Box>
		</UserContext.Provider>
	);
};

export default Layout;
