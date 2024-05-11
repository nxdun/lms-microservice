import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { tokens } from "src/theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  CalendarTodayOutlined,
  DashboardOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import logo from "src/assets/images/StudyForgeLOGO.png";
import Item from "./Item";
import { ToggledContext } from "src/App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log the token
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded Token:", decodedToken); // Log the decoded token
      setUserEmail(decodedToken.email);
      setUserRole(decodedToken.role);
    }
  }, []);

  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="Argon"
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.greenAccent[500]}
                >
                  StudyForge
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              {userEmail}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
              {userRole}
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="dashboard"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        
        {/* Render this item only if the user role is "admin" */}
        {userRole === "admin" && (
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Data" : " "}
        </Typography>
        )}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          {/* Render these item only if the user role is "admin" */}
          {userRole === "admin" && (
          <Item
            title="Manage Team"
            path="team"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
          )}
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Pages" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          {/* Render "Create Users" item only if the user role is "admin" */}
          {userRole === "admin" && (
            <Item
              title="Create Users"
              path="form"
              colors={colors}
              icon={<PersonOutlined />}
            />
          )}

          <Item
            title="Calendar"
            path="calendar"
            colors={colors}
            icon={<CalendarTodayOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Course Management" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Add Course"
            path="course"
            colors={colors}
            icon={<DashboardOutlined />}
          />

          <Item
            title="Manage Course"
            path="managecourse"
            colors={colors}
            icon={<DashboardOutlined />}
          />

          <Item
            title="Add Course Content"
            path="addcoursecontent"
            colors={colors}
            icon={<DashboardOutlined />}
          />


          <Item
            title="Manage Course Content"
            path="managecoursecontent"
            colors={colors}
            icon={<DashboardOutlined />}
          />

        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
