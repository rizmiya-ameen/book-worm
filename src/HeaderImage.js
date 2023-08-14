import { Container, } from '@mui/material'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './HeaderImage.css'

function HeaderImage () {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Container>
      <Carousel responsive={responsive}  autoPlay={true} autoPlaySpeed={2000} transitionDuration={50} >
      
      <img className='image-header' src='/1.png' alt=''/>

      <img className='image-header' src='/3.png' alt=''/>
      
      <img className='image-header' src='/2.png' alt=''/>

     
      </Carousel>
    </Container>
  )
}

export default HeaderImage

/*
<Card sx={{ height: '500px', boxShadow: '5' }}>
          <CardMedia
          component="img"
          image="/1.png"
          alt=''
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        </Card>
        
        <Card sx={{ height: '300px', boxShadow: '5' }}>
          <img className='image-header' src='/2.png' alt=''/>
        </Card>
        */