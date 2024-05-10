import { styled } from '@mui/material/styles';
import { animated } from '@react-spring/web';
import { Button, Container, Grid, Card, CardContent, CardActions, Typography, CardMedia } from '@mui/material';

//styled component for creating a full-screen container
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

//styled card component with custom styles for appearance and hover effects
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

//styled component for card overlay with custom styles for background and layout
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

//functional component for the authentication landing page
const AuthLanding = () => {
  //define card data with titles, descriptions, and images
  const cards = [
    { title: "Login as Lecturer", description: "Access advanced tools and features for course creation and management.", image: "src/assets/ppLecturer.svg" },
    { title: "Login as Learner", description: "Discover courses, track progress, and engage with course content.", image: "src/assets/ppLearner.svg" },
    { title: "Login as Admin", description: "Manage user accounts, course catalogs, and platform settings.", image: "src/assets/ppAdmin.svg" }
  ];

  //function to handle button clicks and redirect to corresponding login pages
  const handleClick = (index) => {
    switch (index) {
      case 0:
        window.location.href = '/stafflogin';
        console.log('lecturer login')
        break;
      case 1:
        window.location.href = '/login/learner';
        break;
      case 2:
        window.location.href = '/stafflogin';
        console.log('admin login')
        break;
      default:
        break;
    }
  };


  return (
    <FullScreenContainer maxWidth="lg">
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StyledCard>
              <CardOverlay >
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
      </Grid>
    </FullScreenContainer>
  );
};

export default AuthLanding;
