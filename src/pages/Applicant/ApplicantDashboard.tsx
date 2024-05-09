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
import AllJobs from "../Applicant/AllJobs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/Slice/UserSlice";
import useStorage from "../../hooks/useStorage";
import { useNavigate } from "react-router-dom";
import AppliedJobs from "./AppliedJobs";

const drawerWidth = 250;

interface Props {
  window?: () => Window;
}

const applicantDashboard = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [applicantTabStatus, setApplicantTabStatus] = useState("Jobs");
  const dispatch = useDispatch();
  const { clearDataFromStorage } = useStorage();
  const navigate = useNavigate();

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
              setApplicantTabStatus("Jobs");
              {
                !isClosing ? setMobileOpen(false) : null;
              }
            }}
          >
            <span className="text-[20px] font-medium">New Jobs</span>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setApplicantTabStatus("AppliedJob");
              {
                !isClosing ? setMobileOpen(false) : null;
              }
            }}
          >
            <span className="text-[20px] font-medium">Applied Jobs</span>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(setToken(null));
              clearDataFromStorage();
              navigate("/");
            }}
          >
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
        {applicantTabStatus === "Jobs" ? <AllJobs /> : null}
        {applicantTabStatus === "AppliedJob" ? <AppliedJobs /> : null}
      </Box>
    </Box>
  );
};

export default applicantDashboard;
