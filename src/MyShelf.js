import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyShelf.css'
import { Button, Paper, AppBar, Toolbar, Box, Typography, Container,} from '@mui/material'
import ShelfSelection from './ShelfSelection';


function MyShelf () {

  const [toReadBooks, setToReadBooks] = useState ([])
  const [readingBooks, setReadingBooks] = useState ([])
  const [completedBooks, setCompletedBooks] = useState ([])

  const myShelfBooksCount = (toReadBooks.length + readingBooks.length + completedBooks.length)

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

    <Container sx={{marginY: '120px',}}>
      
      <AppBar  position="fixed" sx={{backgroundColor: '#44318D', height:'70px'}}> 

        <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <Link to={'/'}>
            <Box sx={{marginTop: '50px', marginLeft: '15px'}}>
              <img src='/bookworm2.png' alt='Book Worm' height='85px'/>
            </Box>
          </Link>

          <Typography sx={{color: 'white', letterSpacing: '3px'}}>
            My Shelf ({myShelfBooksCount})
          </Typography>

        </Toolbar>
        
      </AppBar>


      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px', marginTop: '60px'}}>

        <Typography><strong>To-Read</strong> ({toReadBooks.length})</Typography>

        {toReadBooks.length !== 0 &&
        <Button onClick={handleRemovalToRead} size="small" variant="contained" sx={{bgcolor: "#d82679", '&:hover': {
          bgcolor: '#ad0352'}, letterSpacing: '1px'}}>Clear All</Button>}

      </Box>

      <Paper elevation={3} sx={{position: 'relative' ,
      height: toReadBooks.length === 0 ? '80px' : '330px', 
      paddingY: '24px', backgroundImage: 'url(/Shelf2.jpg)', backgroundPosition: 'bottom center', backgroundSize: 'auto 35px', backgroundRepeat: 'repeat-x'}}>
        <ShelfSelection 
          buttonText='To Reading'
          books={toReadBooks}
          handleRemovalofOne={handleRemoveOneToRead}
          handleMoveToNext={handleMoveToReading}
        />
      </Paper>
      
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px', marginTop: '60px'}}>

        <Typography><strong>Reading</strong> ({readingBooks.length})</Typography>

        {readingBooks.length !== 0 && 
        <Button onClick={handleRemovalReading} size="small" variant="contained" sx={{bgcolor: "#d82679", '&:hover': {
          bgcolor: '#ad0352'}, letterSpacing: '1px'}}>Clear All</Button>}

      </Box>

      <Paper elevation={3} sx={{position: 'relative' ,
      height: readingBooks.length === 0 ? '80px' : '330px', 
      paddingY: '24px', backgroundImage: 'url(/Shelf2.jpg)', backgroundPosition: 'bottom center', backgroundSize: 'auto 35px', backgroundRepeat: 'repeat-x'}}>
        <ShelfSelection 
          buttonText='To Completed'
          books={readingBooks}
          handleRemovalofOne={handleRemoveOneReading}
          handleMoveToNext={handleMoveToCompleted}
        />
      </Paper>


      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px', marginTop: '60px'}}>

        <Typography><strong>Completed</strong> ({completedBooks.length})</Typography>
        {completedBooks.length !== 0 && <Button onClick={handleRemovalCompleted} size="small" variant="contained" sx={{bgcolor: "#d82679", '&:hover': {
          bgcolor: '#ad0352'}, letterSpacing: '1px'}}>Clear All</Button>}
        
      </Box>

      <Paper elevation={3} sx={{position: 'relative' ,
      height: completedBooks.length === 0 ? '80px' : '330px', 
      paddingY: '24px', backgroundImage: 'url(/Shelf2.jpg)', backgroundPosition: 'bottom center', backgroundSize: 'auto 35px', backgroundRepeat: 'repeat-x'}}>
        <ShelfSelection 
          buttonText={null}
          books={completedBooks}
          handleRemovalofOne={handleRemoveOneCompleted}
        />
      </Paper>      
      
        
    
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


