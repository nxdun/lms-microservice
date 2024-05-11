import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Checkbox, Grid, TextField, Box, styled, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex"
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));
import ReCAPTCHA from "react-google-recaptcha";
// initial login credentials
const initialValues = {
  email: "",
  password: "",
  remember: true
};

export default function JwtLogin() {
  const [captcha, setCaptcha] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState(initialValues); // Define values state
  const [userEmail, setUserEmail] = useState(""); // State to store user's email

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Exclude the "remember" field from the values object
        const { remember, ...authData } = values;
        const url = "http://localhost:2222/api/v1/auth";
        const response = await axios.post(url, authData);
        console.log("Response Data:", response.data); // Log the response data
        const { token, role, email } = response.data.data;
        console.log("Token:", token); // Log the token
        localStorage.setItem("token", token);
        setUserEmail(email); // Set the user's email in state
        // setUserRole(role); // Commented out as it's not defined in this component

        // Check if user role is lecturer or admin
      if (response.data.data.role && (response.data.data.role.trim().toLowerCase() === 'lecturer' || response.data.data.role.trim().toLowerCase() === 'admin')) {
        window.location = "/admin/dashboard";// Navigate to admin dashboard
      } else {
        setError("Access denied. You do not have permission to access this resource.");
      }
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
            setError(error.response.data.message || "An error occurred. Please try again later.");
        } else {
            console.error('Network Error:', error.message);
            setError("An error occurred. Please try again later.");
        }
    } finally {
        setLoading(false);
    }
};

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img src="src/assets/images/Login.gif" width="100%" alt="Login" />
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="small"
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  sx={{ mb: 1.5 }}
                />

                <FlexBox justifyContent="space-between">
                  <FlexBox gap={1}>
                    <Checkbox
                      size="small"
                      name="remember"
                      checked={values.remember}
                      onChange={handleChange}
                      sx={{ padding: 0 }}
                    />
                    <span>Remember Me</span>
                  </FlexBox>

                  <NavLink to="/staffforgot" style={{ color: theme.palette.primary.main }}>
                    Forgot password?
                  </NavLink>
                </FlexBox>

                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={loading}
                  variant="contained"
                  sx={{ my: 2 }}
                >
                  Login
                </LoadingButton>

                <ReCAPTCHA
            sitekey="6Leg6dgpAAAAAOHOV9pQsn14p_G09lqGUsuEKPW6"
            onChange={(token) => setCaptcha(token)}
            onExpired={() => setCaptcha("")}
            data-testid="recaptcha"
          />
                {error && (
                  <Box color="error.main" mt={1}>
                    {error}
                  </Box>
                )}
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}
