import { Grid, Typography, Box, Container, Button, IconButton, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ShelfSelection.css'

function ShelfSelection ({books, handleRemovalofOne, handleMoveToNext, buttonText}) {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (

    <Container>

      <Carousel responsive={responsive}>

      {books.length === 0 ? <Typography sx={{width: '500px', fontWeight: '700', fontSize: '15px'}}>An Empty Bookshelf Awaits!</Typography> : 
      books && books.map(item => (

        <Grid item xs={2.4} key={item.id} sx={{margin: '10px'}}>

          <Box className="book-card">
            
            <img className="image-thumbnail" src={item.image} alt=''/>
              
              
            <Box className="book-info">

              <Typography sx={{display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '17px', fontWeight: 'bold', margin: '0px'}}>{item.title}</Typography>


                <Typography sx={{display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis', fontSize: '13px', letterSpacing: '1px', marginTop: '8px'}}>
                  {item.authors.length > 1 ? `${item.authors[0]} and more` : item.authors[0]}
                </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px',}}>

                {buttonText &&
                <Button size="small" variant="contained" color="primary" onClick={() => handleMoveToNext(item)} sx={{fontSize: '10px', paddingX: '5px', paddingY: '0px', letterSpacing: '1px'}}>
                {buttonText}
                </Button>}

                <IconButton onClick={() => handleRemovalofOne(item)} aria-label="delete" size="small" sx={{color: 'white', bgcolor: 'red'}}>
                  <DeleteIcon fontSize="inherit"/>
                </IconButton>

              </Box>

            </Box>

          </Box>
          

        </Grid>

        ))}

      </Carousel>
      
      
      
    </Container>
  )
}

export default ShelfSelection


/*

import { Grid, Typography, Box, Paper, Container, Button, IconButton, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function ShelfSelection ({books, handleRemovalofOne, handleMoveToNext, buttonText}) {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (

    <Container>

      

    

      

       
      <Carousel responsive={responsive}>
      {books.length === 0 ? <p>Shelf is Empty</p> : 
      books && books.map(item => (

        <Grid item xs={2.4} key={item.id} sx={{margin: '10px'}}>

          

          <Paper elevation={3}  sx={{height: '400px', display: 'flex', flexDirection: 'column', position: 'relative'}}> 


            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <img className='book-thumbnail' src={item.image} alt=''/>
            </Box>


            <Box sx={{paddingX:'15px'}}>

              <Typography sx={{display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '17px', fontWeight: 'bold'}}>
                {item.title}
              </Typography>

              {item.authors.length > 1 ? <Typography className='author-name'>{item.authors[0]} and more</Typography> : <Typography className='author-name'>{item.authors[0]}</Typography>}

            </Box>

            <Box sx={{ display: 'flex', position: 'absolute', bottom: '5px', right: '5px'}}>

              {buttonText &&
              <Button size="small" variant="outlined" color="primary" onClick={() => handleMoveToNext(item)} sx={{fontSize: '12px', paddingX: '5px', paddingY: '0px'}}>
              ➔ {buttonText}
              </Button>}

              <IconButton onClick={() => handleRemovalofOne(item)} aria-label="delete" size="small" color="primary">
                <DeleteIcon fontSize="inherit"/>
              </IconButton>
            </Box>

          </Paper>

          

        </Grid>

        ))}

      </Carousel>
      
      
      
    </Container>
  )
}

export default ShelfSelection

*/