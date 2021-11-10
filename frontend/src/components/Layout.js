import React, { useState } from "react";
import {
	List,
	Divider,
	ListItem,
	Box,
	ListItemText,
	ListItemIcon,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	Grid,
} from "@mui/material";
import PatientForm from "./PatientForm";
import Patients from "./Patients";
import { Switch, Route, useHistory } from "react-router-dom";
import { Menu, GridOn, Create } from "@mui/icons-material";

const drawerWidth = 240;

const listItems = [
	{
		text: "View",
		icon: <GridOn />,
	},
	{
		text: "Add",
		icon: <Create />,
	},
];

const Layout = ({ contacts }) => {
	const history = useHistory();

	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar />
			<List>
				<ListItem button key={0} onClick={(e) => history.push("/")}>
					<ListItemIcon>{listItems[0].icon}</ListItemIcon>
					<ListItemText primary={listItems[0].text} />
				</ListItem>
				<Divider />
				<ListItem button key={1} onClick={(e) => history.push("/create")}>
					<ListItemIcon>{listItems[1].icon}</ListItemIcon>
					<ListItemText primary={listItems[1].text} />
				</ListItem>
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }} component="div">
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{
							mr: 2,
							display: {
								sm: "none",
							},
						}}
					>
						<Menu />
					</IconButton>
					<Typography variant="h5" noWrap>
						Contact Manager
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				{/* Mobile View Drawer 600px and above Hide it*/}
				<Drawer
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					variant="temporary"
					anchor="left"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
				>
					{drawer}
				</Drawer>
				{/* PC View Drawer */}
				<Drawer
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					variant="permanent"
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Toolbar />
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							if (contacts.length > 0) {
								return (
									<Grid container sx={{ p: 5 }}>
										{contacts.map((contact) => (
											<Grid
												item
												xs={12}
												md={3}
												key={contact["_id"]}
												sx={{ p: 3 }}
											>
												<Contacts contact={contact} />
											</Grid>
										))}
									</Grid>
								);
							} else {
								return <h1>No data</h1>;
							}
						}}
					/>
					<Route path="/create" render={() => <PatientForm />} />
				</Switch>
			</Box>
		</Box>
	);
};

export default Layout;
