import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Container, Grid, Card, CardContent, CardActions, Typography, CardMedia } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
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
  overflowX: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  '@media (max-width: 768px)': {
    padding: '20px',
  },
});

const StyledCard = styled(Card)({
  height: '75vh',
  position: 'relative',
  borderRadius: '15px',
  overflow: 'hidden',
  backgroundColor: '#333',
  color: '#fff',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CardOverlay = styled(animated.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  textAlign: 'center',
  zIndex: 1,
});

const AuthLanding = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showSelectedCard, setShowSelectedCard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cards = [
    { title: "Login as Lecturer", description: "Access advanced tools and features for course creation and management.", image: "src/assets/ppLecturer.svg", component: <LecturerLogin /> },
    { title: "Login as Learner", description: "Discover courses, track progress, and engage with course content.", image: "src/assets/ppLearner.svg", component: <LearnerLogin /> },
    { title: "Login as Admin", description: "Manage user accounts, course catalogs, and platform settings.", image: "src/assets/ppAdmin.svg", component: <AdminLogin /> }
  ];

  const handleClick = (index) => {
    setClickedIndex(index);
    setShowSelectedCard(true);
    setIsHovered(true); 
  };

  const handleReset = () => {
    setClickedIndex(null);
    setShowSelectedCard(false);
    setIsHovered(false); 
  };

  const hoverAnimation = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  });

  return (
    <FullScreenContainer maxWidth="lg">
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StyledCard onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <CardOverlay style={hoverAnimation}>
                <CardContent>
                  <Typography variant="h5" sx={{ top: "10vh", left: "20vh", position: "absolute" }}>
                    {card.title}
                  </Typography>
                  <CardMedia
                    width={"80%"}
                    component="img"
                    alt="Card image"
                    image={card.image}
                  />
                </CardContent>
                <CardActions>
                  <Button fullWidth size="large" sx={{ top: "vh", right: "2vh", position: "relative", backgroundColor: '#235234', color: 'grey', '&:hover': { backgroundColor: '#235234', color: 'white' } }}
                    variant="contained"
                    onClick={() => handleClick(index)}>Login</Button>
                </CardActions>
              </CardOverlay>
            </StyledCard>
          </Grid>
        ))}
        {showSelectedCard && (
          <Grid item xs={12}>
            <StyledCard>
              <CardOverlay>
                {cards[clickedIndex].component}
                <CardActions>
                  <Button fullWidth size="large" variant="contained" onClick={handleReset} sx={{ top: "vh", right: "2vh", position: "relative", backgroundColor: '#235234', color: 'grey', '&:hover': { backgroundColor: '#235234', color: 'white' } }}>Back</Button>
                </CardActions>
              </CardOverlay>
            </StyledCard>
          </Grid>
        )}
      </Grid>
    </FullScreenContainer>
  );
};

export default AuthLanding;

// Separate component for each login type
const LecturerLogin = () => {
  return (
    <div>
      {/* Add your lecturer login component here */}
      <Typography>Lecturer Login Component</Typography>
    </div>
  );
};

const LearnerLogin = () => {
  return (
    <div>
      {/* Add your learner login component here */}
      <Typography>Learner Login Component</Typography>
    </div>
  );
};

const AdminLogin = () => {
  return (
    <div>
      {/* Add your admin login component here */}
      <Typography>Admin Login Component</Typography>
    </div>
  );
};
