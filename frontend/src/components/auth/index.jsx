import { styled,} from '@mui/material';
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


const BlurBox = styled(animated.div)({
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  backdropFilter: 'blur(10px)',
  zIndex: 1,
});

const AuthLanding = () => {

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
            Aryu
          </Typography>
          <Typography variant="h5" gutterBottom sx={{color:"white"}}>
            Learn new skills and advance your career with our online courses.
          </Typography>
          <img src="src/assets/landingpage-learn.svg" alt="placeholder" style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', marginTop: '20px', color:"white" }} />
        </animated.div>
          <ButtonGroup orientation="horizontial" variant="contained" aria-label="vertical contained primary button group" style={buttonSpring}>
            <InstructorButton color="primary" size="large" sx={{width:"35vh", height:"10vh"}}>
              Login as Instructor
            </InstructorButton>
            <Button color="secondary" size="large" sx={{width:"35vh", height:"10vh", marginTop:"20px", marginLeft:"1vh"}}
            onClick={() => window.location.href = '/login'}
            >
              Login as Learner
            </Button>
          </ButtonGroup>
        </BlurBox>
      </FullScreenContainer>
    </>
  );
};

export default AuthLanding;
