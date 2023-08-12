import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyShelf.css'
import { Typography, Container,} from '@mui/material'
import ShelfSelection from './ShelfSelection';


function MyShelf () {

  const [toReadBooks, setToReadBooks] = useState ([])
  const [readingBooks, setReadingBooks] = useState ([])
  const [completedBooks, setCompletedBooks] = useState ([])


  //Update the local storage after removing a set of books
  const handleRemovalToRead = () => {
    localStorage.removeItem('toReadBooks');
    setToReadBooks([]);
  }

  const handleRemovalReading = () => {
    localStorage.removeItem('readingBooks');
  setReadingBooks([]);
  }

  const handleRemovalCompleted = () => {
    localStorage.removeItem('completedBooks');
    setCompletedBooks([]);
  }



  //Update the local storage after removing one of the books
  const handleRemoveOneToRead = (clickedObject) => {
    const removeBook = toReadBooks.filter(item => item !== clickedObject)
    setToReadBooks(removeBook)
    localStorage.setItem('toReadBooks', JSON.stringify(removeBook)); // 
  }

  const handleRemoveOneReading = (clickedObject) => {
    const removeBook = readingBooks.filter(item => item !== clickedObject)
    setReadingBooks(removeBook)
    localStorage.setItem('readingBooks', JSON.stringify(removeBook)); 
  }

  const handleRemoveOneCompleted = (clickedObject) => {
    const removeBook = completedBooks.filter(item => item !== clickedObject)
    setCompletedBooks(removeBook)
    localStorage.setItem('completedBooks', JSON.stringify(removeBook)); 
  }


  const handleMoveToReading = (clickedObject) => {
    const movedBook = toReadBooks.filter(item => item !== clickedObject)
    setReadingBooks([...readingBooks, clickedObject])
    setToReadBooks(movedBook)
    localStorage.setItem('toReadBooks', JSON.stringify(movedBook));
    localStorage.setItem('readingBooks', JSON.stringify([...readingBooks, clickedObject]));
    //console.log(toReadBooks)
    //console.log(readingBooks)
  }

  const handleMoveToCompleted = (clickedObject) => {
    const movedBook = readingBooks.filter(item => item !== clickedObject)
    setCompletedBooks([...completedBooks, clickedObject])
    setReadingBooks(movedBook)
    localStorage.setItem('readingBooks', JSON.stringify(movedBook));
    localStorage.setItem('completedBooks', JSON.stringify([...completedBooks, clickedObject]));
    //console.log(readingBooks)
    //console.log(completedBooks)
  }


  // Get books from local storage on component mount
  useEffect(() => {
    const storedToReadBooks = localStorage.getItem('toReadBooks');
    if (storedToReadBooks) {
      setToReadBooks(JSON.parse(storedToReadBooks));
    }
    const storedReadingBooks = localStorage.getItem('readingBooks');
    if (storedReadingBooks) {
      setReadingBooks(JSON.parse(storedReadingBooks));
    }

    const storedCompletedBooks = localStorage.getItem('completedBooks');
    if (storedCompletedBooks) {
      setCompletedBooks(JSON.parse(storedCompletedBooks));
    }
  }, []);

  //console.log(toReadBooks)

  return (

    <Container sx={{marginY: '50px'}}>
      
      <Link to={'/'}><button>Home</button></Link>

      <Typography>MyShelf</Typography>

      <ShelfSelection 
        sectionTitle='To-Read'
        buttonText='Move to Reading'
        handleRemovalofAll={handleRemovalToRead}
        books={toReadBooks}
        handleRemovalofOne={handleRemoveOneToRead}
        handleMoveToNext={handleMoveToReading}
      />

      <ShelfSelection 
        sectionTitle='Reading'
        buttonText='Move to Completed'
        handleRemovalofAll={handleRemovalReading}
        books={readingBooks}
        handleRemovalofOne={handleRemoveOneReading}
        handleMoveToNext={handleMoveToCompleted}
      />

      <ShelfSelection 
        sectionTitle='Completed'
        buttonText={null}
        handleRemovalofAll={handleRemovalCompleted}
        books={completedBooks}
        handleRemovalofOne={handleRemoveOneCompleted}
      />
            
      
        
    
    </Container>
  )
}

export default MyShelf


/*

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyShelf.css'
import { Grid, Typography, Box, Paper, Container, Button, IconButton, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';


function MyShelf () {

  const [toReadBooks, setToReadBooks] = useState ([])
  const [readingBooks, setReadingBooks] = useState ([])
  const [completedBooks, setCompletedBooks] = useState ([])


  //Update the local storage after removing a set of books
  const handleRemovalToRead = () => {
    localStorage.removeItem('toReadBooks');
    setToReadBooks([]);
  }

  const handleRemovalReading = () => {
    localStorage.removeItem('readingBooks');
  setReadingBooks([]);
  }

  const handleRemovalCompleted = () => {
    localStorage.removeItem('completedBooks');
    setCompletedBooks([]);
  }



  //Update the local storage after removing one of the books
  const handleRemoveOneToRead = (clickedObject) => {
    const removeBook = toReadBooks.filter(item => item !== clickedObject)
    setToReadBooks(removeBook)
    localStorage.setItem('toReadBooks', JSON.stringify(removeBook)); // 
  }

  const handleRemoveOneReading = (clickedObject) => {
    const removeBook = readingBooks.filter(item => item !== clickedObject)
    setReadingBooks(removeBook)
    localStorage.setItem('readingBooks', JSON.stringify(removeBook)); 
  }

  const handleRemoveOneCompleted = (clickedObject) => {
    const removeBook = completedBooks.filter(item => item !== clickedObject)
    setCompletedBooks(removeBook)
    localStorage.setItem('completedBooks', JSON.stringify(removeBook)); 
  }


  const handleMoveToReading = (clickedObject) => {
    const movedBook = toReadBooks.filter(item => item !== clickedObject)
    setReadingBooks([...readingBooks, clickedObject])
    setToReadBooks(movedBook)
    localStorage.setItem('toReadBooks', JSON.stringify(movedBook));
    localStorage.setItem('readingBooks', JSON.stringify([...readingBooks, clickedObject]));
    //console.log(toReadBooks)
    //console.log(readingBooks)
  }

  const handleMoveToCompleted = (clickedObject) => {
    const movedBook = readingBooks.filter(item => item !== clickedObject)
    setCompletedBooks([...completedBooks, clickedObject])
    setReadingBooks(movedBook)
    localStorage.setItem('readingBooks', JSON.stringify(movedBook));
    localStorage.setItem('completedBooks', JSON.stringify([...completedBooks, clickedObject]));
    //console.log(readingBooks)
    //console.log(completedBooks)
  }


  // Get books from local storage on component mount
  useEffect(() => {
    const storedToReadBooks = localStorage.getItem('toReadBooks');
    if (storedToReadBooks) {
      setToReadBooks(JSON.parse(storedToReadBooks));
    }
    const storedReadingBooks = localStorage.getItem('readingBooks');
    if (storedReadingBooks) {
      setReadingBooks(JSON.parse(storedReadingBooks));
    }

    const storedCompletedBooks = localStorage.getItem('completedBooks');
    if (storedCompletedBooks) {
      setCompletedBooks(JSON.parse(storedCompletedBooks));
    }
  }, []);

  //console.log(toReadBooks)

  return (

    <Container sx={{marginY: '50px'}}>
      
      <Link to={'/'}><button>Home</button></Link>

      <Typography>MyShelf</Typography>



      <Box>

        <h3>To-Read {toReadBooks.length}</h3>
        <button onClick={handleRemovalToRead}>Clear All</button>
        

        <Grid container spacing={5} sx={{marginY: '10px'}}>

          {toReadBooks && toReadBooks.map(item => (

            <Grid item xs={2.4} key={item.id}>

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

                  <Button size="small" variant="outlined" color="primary" onClick={() => handleMoveToReading(item)} sx={{fontSize: '12px', paddingX: '5px', paddingY: '0px'}}>
                  ➔ Reading
                  </Button>

                  <IconButton onClick={() => handleRemoveOneToRead(item)} aria-label="delete" size="small" color="primary">
                    <DeleteIcon fontSize="inherit"/>
                  </IconButton>
                </Box>

              </Paper>

            </Grid>

          ))}

        </Grid>

      </Box>





      <Box>

        <h3>Reading {readingBooks.length}</h3>
        <button onClick={handleRemovalReading}>Clear All</button>

        <Grid container spacing={5} sx={{marginY: '10px'}}>

          {readingBooks && readingBooks.map(item => (

            <Grid item xs={2.4} key={item.id}>

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
                  <button onClick={() => handleMoveToCompleted(item)}>Move to Completed</button>

                  <IconButton onClick={() => handleRemoveOneReading(item)} aria-label="delete" size="small" color="primary">
                    <DeleteIcon fontSize="inherit"/>
                  </IconButton>
                </Box>

              </Paper>

            </Grid>

          ))}
          
        </Grid>

      </Box>






      <Box>

        <h3>Completed {completedBooks.length}</h3>
        <button onClick={handleRemovalCompleted}>Clear All</button>

        <Grid container spacing={5} sx={{marginY: '10px'}}>

          {completedBooks && completedBooks.map(item => (

              <Grid item xs={2.4} key={item.id}>

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
                    <IconButton onClick={() => handleRemoveOneCompleted(item)} aria-label="delete" size="small" color="primary">
                      <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                  </Box>

                </Paper>
              
              </Grid>

            ))}

        </Grid>

      </Box>
      
      
        
    
    </Container>
  )
}

export default MyShelf



*/


