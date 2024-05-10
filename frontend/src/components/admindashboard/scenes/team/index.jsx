import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Header } from "src/components/admindashboard/";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "src/theme";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //setting up appearance and behaviour of each col in data grid
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        let icon = null;
        switch (role) {
          case "admin":
            icon = <AdminPanelSettingsOutlined />;
            break;
          case "lecturer":
            icon = <SecurityOutlined />;
            break;
          case "learner":
            icon = <LockOpenOutlined />;
            break;
          default:
            break;
        }
        return (
          <Box
            width="120px"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
            bgcolor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "lecturer"
                ? colors.blueAccent[600]
                : colors.primary[600]
            }
            borderRadius={1}
          >
            {icon}
            <Typography textTransform="capitalize">{role}</Typography>
          </Box>
        );
      },
    },
  ];

  // State to store the fetched user data
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getallusers");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();

        // Map the user data to rename _id to id
        const mappedData = data.map(user => ({
          ...user,
          id: user._id
        }));
        setUserData(mappedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  //display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  //display error message if there is an error fetching data
  if (error) {
    return <div>Error: {error}</div>;
  }

  //render the Team component with Header and DataGrid
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        mt="40px"
        height="75vh"
        flex={1}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
        }}
      >
        <DataGrid
          rows={userData}
          columns={columns}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Team;
