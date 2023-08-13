import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorite.css'
import { AppBar, Grid, Typography, Box, Paper, Container, Button, IconButton, Toolbar, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

function Favorite () {

  
  const [favorite, setFavorite] = useState([]);

  const handleRemoval = () => {
    localStorage.removeItem('favoriteBooks');
    setFavorite([]);
  }

  const handleRemovalofOne = (clickedObject) => {
    const removeBook = favorite.filter(item => item !== clickedObject)
    setFavorite(removeBook)
    localStorage.setItem('favoriteBooks', JSON.stringify(removeBook)); // Update the local storage after removing the book
  }


  //to get favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteBooks');
    //if storedFavorites is empty on component mount it results an error
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }
  }, []);

  //console.log(favorite)
  

  return (

    <Container sx={{marginY: '50px'}}>

      <AppBar  position="fixed" sx={{backgroundColor: 'lightpink', height:'70px'}}> 

        <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <Link to={'/'}>
            <Box sx={{marginTop: '40px'}}>
              <img src='/bookworm.png' alt='Book Worm' height='100px'/>
            </Box>
          </Link>

          <Typography sx={{color: 'black'}}>
            Favorite Books ({favorite.length})
          </Typography>

        </Toolbar>
        
      </AppBar>
      

      <Grid container spacing={5} sx={{marginY: '10px'}}>

        {favorite && favorite.map(item => (
          
          <Grid item xs={2.4}>

            <Paper elevation={3}  sx={{height: '400px', display: 'flex', flexDirection: 'column', position: 'relative'}}> 

            
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <img className='book-thumbnail' src={item.image} alt={item.title}/>
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
                <IconButton onClick={() => handleRemovalofOne(item)} aria-label="delete" size="small" color="primary">
                  <DeleteIcon fontSize="inherit"/>
                </IconButton>
              </Box>
              
            </Paper>
          </Grid>

        ))}

      </Grid>

      <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
        <Button onClick={handleRemoval} size="small" variant="contained" sx={{bgcolor: "Red", '&:hover': {
        bgcolor: 'darkred', 
      },}} >
          Clear All
        </Button>
      </Box>
      
        
    </Container>
  )
}

export default Favorite

/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorite.css'
import { Pagination, Stack, Grid, Typography, Box, Paper, Container, Rating, IconButton, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

function Favorite () {

  
  const [favorite, setFavorite] = useState([]);

  const handleRemoval = () => {
    localStorage.removeItem('favoriteBooks');
    setFavorite([]);
  }

  const handleRemovalofOne = (clickedObject) => {
    const removeBook = favorite.filter(item => item !== clickedObject)
    setFavorite(removeBook)
    localStorage.setItem('favoriteBooks', JSON.stringify(removeBook)); // Update the local storage after removing the book
  }


  //to get favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteBooks');
    //if storedFavorites is empty on component mount it results an error
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }
  }, []);

  //console.log(favorite)
  

  return (

    <Container sx={{marginY: '0px'}}>

      <Link to={'/'}><button>Home</button></Link>

      <Typography>Favorite Books {favorite.length}</Typography>

      <button onClick={handleRemoval}>Clear All</button>

      <div className='favorite-books'>

        {favorite && favorite.map(item => (
          
          <div key={item.id}>

            <img src={item.image} alt=''/>

            <p>{item.title}</p>

            {item.authors.length > 1 ? <p>{item.authors[0]} and more</p> : <p>{item.authors[0]}</p>}

            <button onClick={() => handleRemovalofOne(item)}>Remove</button>
            <IconButton onClick={() => handleRemovalofOne(item)} aria-label="delete" size="small" color="primary">
              <DeleteIcon fontSize="inherit"/>
            </IconButton>

          </div>

        ))}

      </div>
      
        
    </Container>
  )
}

export default Favorite

*/
