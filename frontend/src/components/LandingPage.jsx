import { useRef } from 'react';
import { Card, styled } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import {
  Typography,
  Button,
  ButtonGroup,
  Container,
} from '@mui/material';
const FullScreenContainer = styled(Container)({
  minWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '100vh',
  padding: '20px',
  backgroundImage: 'url("https://source.unsplash.com/1600x900/?nature,water")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
  position: 'relative',
  overflowX: 'hidden', // Prevent horizontal scrolling
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '@media (max-width: 768px)': {
    padding: '20px',
  },
});


const InstructorButton = styled(animated(Button))({
  marginTop: '20px',
  backgroundColor: '#7e57c2',
  '&:hover': {
    backgroundColor: '#5e35b1',
  },
});

const CourseOverviewSection = styled(animated.section)({
  padding: '50px 20px',
  background: '#f9f9f9',
  textAlign: 'center',
  marginTop: '50px',
});

const BlurBox = styled(animated.div)({
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  backdropFilter: 'blur(10px)',
  zIndex: 1,
});

const LandingPage = () => {
  const courseOverviewRef = useRef(null);

  const scrollToCourseOverview = () => {
    courseOverviewRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-100px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  const buttonSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  const blurBoxSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
  });

  return (
    <>
      <FullScreenContainer maxWidth="lg">
        <BlurBox style={blurBoxSpring} sx={{padding:"3vh", margin:"0 0 10vh 0"}}>
        <animated.div style={heroSpring} >
          <Typography variant="h2" component="h1" gutterBottom sx={{color:"yellow", padding:"5px"}}>
            Welcome to StudyForge!
          </Typography>
          <Typography variant="h5" gutterBottom sx={{color:"white"}}>
            Learn new skills and advance your career with our online courses.
          </Typography>
          <img src="src/assets/landingpage-learn.svg" alt="placeholder" style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', marginTop: '20px' }} />
        </animated.div>
          <ButtonGroup orientation="horizontial" variant="contained" aria-label="vertical contained primary button group" style={buttonSpring}>
            <InstructorButton color="secondary" size="large" sx={{width:"35vh", height:"10vh"}}>
              Login as Instructor
            </InstructorButton>
            <Button color="primary" variant="outlined" size="large" sx={{width:"35vh", height:"10vh", marginTop:"20px"}}>
              Login as Learner
            </Button>
          </ButtonGroup>
        </BlurBox>
      </FullScreenContainer>
      
      <CourseOverviewSection ref={courseOverviewRef}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom>
            Course Overview
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our courses are designed to help you grow your career. Whether youre looking to learn a new skill, or start a new career, StudyForge is the place to be.
          </Typography>
          <Card sx={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" component="h3" gutterBottom>
              What youill learn
            </Typography>
            <Timeline position="alternate-reverse">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
          </Card>
        </Container>
      </CourseOverviewSection>
    </>
  );
};

export default LandingPage;
