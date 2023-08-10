import './GenreBooks.css'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

function GenreBooks ({fetchedBooks}) {

  // to get the first 5 elements of the array
  const firstFiveBooks = fetchedBooks.slice(0, 5);
  
  return (

    <Grid container spacing={5} sx={{marginY: '50px'}}>

      {firstFiveBooks.map(item => {
        
        const { id, volumeInfo } = item;
        const { title, imageLinks, authors, averageRating, ratingsCount} = volumeInfo;

         
        if (imageLinks && title && volumeInfo && authors && authors.length > 0) {

          return (
           
          <Grid key={id} item xs={2.4}>  

            <Paper key={id} elevation={3}  sx={{height: '400px', display: 'flex', flexDirection: 'column', position: 'relative'}}>
            
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                {imageLinks && imageLinks.thumbnail && 
                  <Link to={`/${id}`}>
                    <img 
                      className='book-thumbnail'
                      src={imageLinks.thumbnail} 
                      alt={title} 
                    />
                  </Link> 
                } 
              </Box>
              

              <Box sx={{paddingX:'15px'}}>

                <Typography sx={{display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '17px', fontWeight: 'bold'}}>{title}</Typography>

                {authors.length > 1 ? <Typography className='author-name'>{authors[0]} and more</Typography> : <Typography className='author-name'>{authors[0]}</Typography>}
                

                {averageRating && ratingsCount &&
                <Box sx={{display: 'flex'}}>
                  
                  <Rating name="read-only" value={averageRating} readOnly precision={0.5} size='small' sx={{position: 'absolute', bottom: '8px', left: '9px'}}/>

                  {/*<Typography variant='body2' component='p' marginLeft={0.5} sx={{position: 'absolute', bottom: '0px'}}>
                    {averageRating}
                </Typography>*/}

                  <Typography sx={{fontSize: '12px', position: 'absolute', bottom: '8px', right: '9px'}}>
                    ({ratingsCount} reviews)
                  </Typography>
                  
                </Box>}
                  
                
              </Box>
              
              
            </Paper>
          </Grid>
          ) 

        }

        return null;
        
      })}
    </Grid>
  )
}
export default GenreBooks


/*

import './GenreBooks.css'
import { Link } from 'react-router-dom'

function GenreBooks ({fetchedBooks}) {

  // to get the first 5 elements of the array
  const firstFiveBooks = fetchedBooks.slice(0, 5);
  
  return (

    <div className="GenreBooks">

      {firstFiveBooks.map(item => {
        
        const { id, volumeInfo } = item;
        const { title, imageLinks, authors, averageRating, ratingsCount} = volumeInfo;

         
        if (imageLinks && title && volumeInfo && authors && authors.length > 0) {

          return (
            
            <div key={id}>
            
              {imageLinks && imageLinks.thumbnail && 
                <Link to={`/${id}`}>
                  <img 
                    src={imageLinks.thumbnail} 
                    alt={title} 
                    height='200px'
                  />
                </Link> 
              } 

              <p>{title}</p>

              {authors.length > 1 ? <p>{authors[0]} and more</p> : <p>{authors[0]}</p>}
              
              {averageRating && ratingsCount && <p>{averageRating} ★ ({ratingsCount})</p>}
              
            </div>
          ) 

        }

        return null;
        
      })}
    </div>
  )
}
export default GenreBooks

*/
