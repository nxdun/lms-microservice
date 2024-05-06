import { useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  Card,
  styled,
  Typography,
  Button,
  ButtonGroup,
  Container,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
const FullScreenContainer = styled(Container)({
  minWidth: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
  padding: "20px",
  backgroundImage: 'url("https://source.unsplash.com/1600x900/?nature,water")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
  textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
  position: "relative",
  overflowX: "hidden", // Prevent horizontal scrolling
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  "@media (max-width: 768px)": {
    padding: "20px",
  },
});

const InstructorButton = styled(animated(Button))({
  marginTop: "20px",
  backgroundColor: "#7e57c2",
  "&:hover": {
    backgroundColor: "#5e35b1",
  },
});

const CourseOverviewSection = styled(animated.section)({
  padding: "50px 20px",
  background: "#f9f9f9",
  textAlign: "center",
  marginTop: "50px",
});

const BlurBox = styled(animated.div)({
  position: "absolute",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  backdropFilter: "blur(10px)",
  zIndex: 1,
});

const LandingPage = () => {
  const courseOverviewRef = useRef(null);

  const heroSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-100px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  const buttonSpring = useSpring({
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 500,
  });

  const blurBoxSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
  });

  const cardData = [
    {
      image: "src/assets/learn2.gif",
      title: "Diverse Course Catalog",
      description: "Explore an extensive and diverse catalog of courses covering a wide array of subjects and disciplines to cater to various interests and skill levels."
    },
    {
      image: "src/assets/learn3.gif",
      title: "Empower Educators",
      description: "Educators have the incredible opportunity to create, curate, and customize courses according to their unique teaching styles, pedagogical approaches, and curriculum requirements."
    },
    {
      image: "src/assets/learn4.gif",
      title: "Seamless Responsive Design",
      description: "Experience seamless navigation and engagement across all devices, including desktops, laptops, tablets, and smartphones, ensuring a consistent and optimized learning experience anytime, anywhere."
    },
    {
      image: "src/assets/learn1.gif",
      title: "Intuitive Interface",
      description: "Navigate through courses effortlessly with our intuitive and user-friendly interface designed to provide an intuitive and streamlined learning experience, enabling learners to focus on acquiring new knowledge and skills."
    },
    {
      image: "src/assets/learn5.gif",
      title: "Personalized Learning Paths",
      description: "Receive personalized recommendations and tailored learning paths based on your individual learning preferences, goals, and prior knowledge, empowering you to achieve your learning objectives more effectively and efficiently."
    },
    {
      image: "src/assets/learn6.gif",
      title: "Secure Payment Process",
      description: "Rest assured with our robust and secure payment gateway, ensuring the confidentiality, integrity, and safety of your financial transactions, providing you with peace of mind throughout the payment process."
    }
  ];

  return (
    <>
      <FullScreenContainer maxWidth="lg">
        <BlurBox
          style={blurBoxSpring}
          sx={{ padding: "3vh", margin: "0 0 10vh 0" }}
        >
          <animated.div style={heroSpring}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ color: "yellow", padding: "5px" }}
            >
              Welcome to StudyForge!
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
              Learn new skills and advance your career with our online courses.
            </Typography>
            <img
              src="src/assets/landingpage-learn.svg"
              alt="placeholder"
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "8px",
                marginTop: "20px",
                color: "white",
              }}
            />
          </animated.div>
          <ButtonGroup
            orientation="horizontial"
            variant="contained"
            aria-label="vertical contained primary button group"
            style={buttonSpring}
          >
            <InstructorButton
              onClick={() => {
                courseOverviewRef.current.scrollIntoView();
              }}
              color="primary"
              size="large"
              sx={{ width: "45vh", height: "10vh", borderRadius: "20px" }}
              variant="contained"
            >
              <KeyboardDoubleArrowDownIcon /> More{" "}
              <KeyboardDoubleArrowDownIcon />
            </InstructorButton>
            <Button
              color="secondary"
              size="large"
              sx={{
                width: "25vh",
                height: "10vh",
                marginTop: "20px",
                marginLeft: "1vh",
                borderRadius: "20px",
              }}
              onClick={() => (window.location.href = "/login")}
            >
              {"SignUp  >>"}
            </Button>
          </ButtonGroup>
        </BlurBox>
      </FullScreenContainer>

      <CourseOverviewSection
        ref={courseOverviewRef}
        sx={{
          maxHeight: "3vh",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4">⭐ what we offer ...</Typography>
        <br />
        <Grid container spacing={2}>
          {cardData.map((data) => (
            <Grid item xs={12} md={4} key={data.id} >
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255,255, 0.95)",
                  margin: "10px",
      
                  color: "grey",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    backgroundColor: "rgba(234, 234, 234, 0.1)",
                    color: "orange",
                  },
                }}
              >
                <CardMedia
                  width={"80%"}
                  component="img"
                  alt="Card image"
                  image={data.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}.
                  </Typography>
                  <Typography variant="body2" color="grey" sx={{ 
                    transform: "scale(1.03)",
                    color: "",
                }}>
                    {data.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth  size="large"  sx={{bottom:15, }}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CourseOverviewSection>
    </>
  );
};

export default LandingPage;
