import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@mui/material";
import JobApplications from "../pages/Recruiter/JobApplications";
import AllJobs from "../pages/Recruiter/AllJobs";
import Responses from "../pages/Recruiter/Responses";

const drawerWidth = 250;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [recruiterTabStatus, setRecruiterTabStatus] = React.useState("View");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: "#021E45" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          style={{
            color: "white",
            fontSize: "24px",
          }}
        >
          Job Portal
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setRecruiterTabStatus("CreateJob");
              {
                !isClosing ? setMobileOpen(false) : null;
              }
            }}
          >
            <span className="text-[20px] font-medium">Create Job</span>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setRecruiterTabStatus("AllJob");
              {
                !isClosing ? setMobileOpen(false) : null;
              }
            }}
          >
            <span className="text-[20px] font-medium">Posted Jobs</span>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <span className="text-[20px] font-medium">Logout</span>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ bgcolor: "white" }}>
          <div className="flex justify-between md:justify-end w-full">
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "#021E45" }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex items-center gap-7">
              <Box sx={{ color: "action.active" }}>
                <Badge sx={{ color: "#021E45" }} variant="dot">
                  <NotificationsIcon sx={{ cursor: "pointer" }} />
                </Badge>
              </Box>
              <Avatar
                sizes="small"
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
                sx={{
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#021E45",
                }}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {recruiterTabStatus === "CreateJob" ? <JobApplications /> : null}
        {recruiterTabStatus === "AllJob" ? <AllJobs /> : null}
        {recruiterTabStatus === "View" ? <Responses /> : null}
      </Box>
    </Box>
  );
}
