import { useParams, Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { BOOKS_API_KEY } from "./Key"
import { Typography, Box, Paper, Container, Button, Card, CardMedia, AppBar, Toolbar, } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GoogleIcon from '@mui/icons-material/Google';
import NotFoundPage from './NotFoundPage'


function BookDetail () {

  const params = useParams()
  console.log(params)

  const [book, setBook] = useState({})


  const handleBooks = () => {
    
    fetch(`https://www.googleapis.com/books/v1/volumes/${params.bookID}?key=${BOOKS_API_KEY}`)
      .then(res => res.json())
      .then(res => setBook(res))
      //.then(res => console.log(res))
    
  };

  const [favorite, setFavorite] = useState ([])
  //console.log(favorite.length)
  //console.log(favorite)

  const [toReadBooks, setToReadBooks] = useState ([])

 
  const handleFavorite = (clickedObject) => {
    const newFavorite = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.large || clickedObject?.volumeInfo?.imageLinks?.smallThumbnail, 
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in favorites
    if (!favorite.some(item => item.id === newFavorite.id)) {
      setFavorite([newFavorite, ...favorite]);
      localStorage.setItem('favoriteBooks', JSON.stringify([newFavorite, ...favorite])); 
      // Update the local storage after adding the book
    }

    //console.log([newFavorite, ...favorite ]);
  };
  
  const handleMyShelf = (clickedObject) => {
    const newShelfBook = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.large || clickedObject?.volumeInfo?.imageLinks?.smallThumbnail,
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in myshelf
    if (!toReadBooks.some(item => item.id === newShelfBook.id)) {
      setToReadBooks([newShelfBook, ...toReadBooks]);
      localStorage.setItem('toReadBooks', JSON.stringify([newShelfBook, ...toReadBooks])); 
      // Update the local storage after adding the book
    }
    //console.log([newShelfBook, ...toReadBooks])
  };
  
  
  useEffect(() => {
    // Get favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem('favoriteBooks');
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }

    const storedMyShelfBooks = localStorage.getItem('toReadBooks');
    if (storedMyShelfBooks) {
      setToReadBooks(JSON.parse(storedMyShelfBooks));
    }
  }, []);
  

  // Update localStorage whenever the favorite state changes
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favorite));
    localStorage.setItem('toReadBooks', JSON.stringify(toReadBooks));
  }, [favorite, toReadBooks]);


  useEffect(handleBooks, [params.bookID])
  
  if (!params.bookID) {
    return <p>Please select a book to view.</p>;
  }

  if (!book) {
    return <p>Failed to fetch book details. Please try again later.</p>;
  }
  

  const {volumeInfo = {}, saleInfo = {}, id} = book;
  const {title, authors, categories, description, imageLinks = {}, industryIdentifiers, publisher, publishedDate, pageCount, previewLink, } = volumeInfo;
  const {isEbook} = saleInfo;
  //if volumeInfo is not present or undefined, assigned to an empty object as its default value


  const getHttpsLink = (httpLink) => httpLink.replace(/^http:\/\//i, 'https://');
  //regular expression - replace the beginning of the URL with "https://"
  
  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  //to remove all HTML tags in the description
  
  const imageUrl = imageLinks && imageLinks.extraLarge
  ? getHttpsLink(imageLinks.extraLarge)
  : (imageLinks && imageLinks.smallThumbnail)
  ? getHttpsLink(imageLinks.smallThumbnail)
  : null;


  return (

    <Container sx={{marginTop: '150px', display: 'flex', flexDirection: 'column', }}>
{params.bookID === id ?
      <Box>


      <AppBar  position="fixed" sx={{backgroundColor: '#44318D', height:'70px'}}> 

        <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <Link to={'/'}>
          <Box sx={{marginTop: '50px', marginLeft: '15px'}}>
              <img src='/bookworm2.png' alt='Book Worm' height='85px'/>
            </Box>
          </Link>

          <Typography sx={{color: 'white', letterSpacing: '3px'}}>
            {title}
          </Typography>

        </Toolbar>

      </AppBar>

      
      
      <Paper elevation={3} sx={{height: '', display: 'flex', flexDirection: 'row', padding: '30px', position: 'relative'}}>

        <Box sx={{ flex: '2', paddingRight: '80px' }}>
          
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '30px', }}>{title}</Typography>

          <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1px', color: 'rgb(1, 121, 202)', }}>{authors}</Typography>
          
          <Typography sx={{ fontSize: '15px', marginBottom: '20px', color: 'grey', }}>{publishedDate && new Date(publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {publisher}</Typography>



          <Box  sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '30px', marginY: '50px',}}>

            {pageCount && 
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px', borderRight: '1px solid grey'}}>
                <Typography sx={{fontWeight: '700'}}>Pages</Typography>
                <Typography>{pageCount}</Typography>
              </Box>
            }

            {saleInfo && 
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px', borderRight: '1px solid grey'}}>
                <Typography sx={{fontWeight: '700'}}>Type</Typography>
                {isEbook ? <Typography>eBook</Typography> : <Typography>Book</Typography>}
              </Box>
            }

            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px', }}>     
              {industryIdentifiers && industryIdentifiers.length > 0 && 
              industryIdentifiers[0].type === 'ISBN_13'
              ? 
              <><Typography sx={{fontWeight: '700'}}>ISBN</Typography><Typography>{industryIdentifiers[0].identifier}</Typography>
              </>
              : 
              industryIdentifiers && industryIdentifiers.length > 0 && 
              industryIdentifiers[1].type === 'ISBN_13'
              ? 
              <><Typography sx={{fontWeight: '700'}}>ISBN</Typography><Typography>{industryIdentifiers[1].identifier}</Typography></> 
              : null}
            </Box>

            
  
          </Box>

          
          

         

          
  
          <Box sx={{marginTop: '50px', position: 'absolute', bottom: '30px'}}>

            {/*
            <Button color="secondary" variant="contained" onClick={() => handleFavorite(book)} startIcon={<FavoriteIcon />} sx={{marginRight: '10px'}}>
              Favorite
              </Button>*/}

            {!favorite.some(item => item.id === book.id) ?
            <Button color="secondary" variant="contained" onClick={() => handleFavorite(book)} startIcon={<FavoriteIcon />} sx={{marginRight: '10px', bgcolor: '#d82679', '&:hover': {
              bgcolor: '#ad0352'}, letterSpacing:'1px'}}>
              Favorite
            </Button> : 
            <Button color="secondary" variant="contained" disabled startIcon={<FavoriteIcon />} sx={{marginRight: '10px', letterSpacing:'1px'}}>
            Favorite
            </Button>
            }
  
            {/*
            <Button color="success" variant="contained" startIcon={<LibraryBooksIcon />} onClick={() => handleMyShelf(book)}>
              Add to My Shelf
          </Button>*/}

          {!toReadBooks.some(item => item.id === book.id) ?
          <Button color="success" variant="contained" startIcon={<LibraryBooksIcon />} onClick={() => handleMyShelf(book)} sx={{letterSpacing:'1px'}}>
          Add to My Shelf
            </Button> :
            <Button color="success" variant="contained" disabled startIcon={<LibraryBooksIcon />} sx={{letterSpacing:'1px'}}>
            Add to My Shelf
        </Button>
          }

          </Box>
  
  
        </Box>
  
        <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
            

          <Card sx={{ height: '400px', boxShadow: '5' }}>
          {imageUrl && <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />}</Card>
          
        </Box>
  
      </Paper>
  
      <Paper elevation={3} sx={{marginY: '50px', padding: '30px'}}>
        {description ?
        <>
          <Typography sx={{marginBottom: '15px', color: 'rgb(1, 121, 202)' }}><strong>About this Book:</strong></Typography>
          <Typography align="justify">{removeHTMLTags(description)}</Typography> 
        </> 
          : null
        }

        {categories ?
          <Box sx={{marginTop: '30px'}}>
            <Typography sx={{fontWeight: 'bold', color: 'rgb(1, 121, 202)', marginBottom: '15px'}}>Categories:</Typography>
            <Typography>
              {categories}
            </Typography> 
          </Box> 
          : null
        }

        {previewLink && <Link to={previewLink}><Button color="primary" variant="contained" endIcon={<GoogleIcon />} sx={{marginTop: '30px'}}>More about This Book...</Button></Link>}

        
      </Paper>

      </Box> : <NotFoundPage />}
  

    </Container>
  
  
  )
}
  
export default BookDetail

/*

import './BookDetail.css'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { BOOKS_API_KEY } from "./Key"
import { Typography, Box, Paper, Container, Button, Card, CardMedia, AppBar, Toolbar, } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GoogleIcon from '@mui/icons-material/Google';


function BookDetail () {

  const params = useParams()
  console.log(params)

  const [book, setBook] = useState({})


  const handleBooks = () => {
    
    fetch(`https://www.googleapis.com/books/v1/volumes/${params.bookID}?key=${BOOKS_API_KEY}`)
      .then(res => res.json())
      .then(res => setBook(res))
      //.then(res => console.log(res))
    
  };

  const [favorite, setFavorite] = useState ([])
  //console.log(favorite.length)
  //console.log(favorite)

  const [toReadBooks, setToReadBooks] = useState ([])

 
  const handleFavorite = (clickedObject) => {
    const newFavorite = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.thumbnail,
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in favorites
    if (!favorite.some(item => item.id === newFavorite.id)) {
      setFavorite([newFavorite, ...favorite]);
      localStorage.setItem('favoriteBooks', JSON.stringify([newFavorite, ...favorite])); 
      // Update the local storage after adding the book
    }

    //console.log([newFavorite, ...favorite ]);
  };
  
  const handleMyShelf = (clickedObject) => {
    const newShelfBook = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.thumbnail,
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in myshelf
    if (!toReadBooks.some(item => item.id === newShelfBook.id)) {
      setToReadBooks([newShelfBook, ...toReadBooks]);
      localStorage.setItem('toReadBooks', JSON.stringify([newShelfBook, ...toReadBooks])); 
      // Update the local storage after adding the book
    }
    //console.log([newShelfBook, ...toReadBooks])
  };
  
  
  useEffect(() => {
    // Get favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem('favoriteBooks');
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }

    const storedMyShelfBooks = localStorage.getItem('toReadBooks');
    if (storedMyShelfBooks) {
      setToReadBooks(JSON.parse(storedMyShelfBooks));
    }
  }, []);
  

  // Update localStorage whenever the favorite state changes
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favorite));
    localStorage.setItem('toReadBooks', JSON.stringify(toReadBooks));
  }, [favorite, toReadBooks]);


  useEffect(handleBooks, [params.bookID])
  
  if (!params.bookID) {
    return <p>Please select a book to view.</p>;
  }

  if (!book) {
    return <p>Failed to fetch book details. Please try again later.</p>;
  }
  

  const {volumeInfo = {}, saleInfo = {}} = book;
  const {title, authors, categories, description, imageLinks = {}, industryIdentifiers, publisher, publishedDate, pageCount, previewLink, } = volumeInfo;
  const {isEbook} = saleInfo;
  //if volumeInfo is not present or undefined, assigned to an empty object as its default value


  const getHttpsLink = (httpLink) => httpLink.replace(/^http:\/\//i, 'https://');
  //regular expression - replace the beginning of the URL with "https://"
  
  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  //to remove all HTML tags in the description
  
  const imageUrl = imageLinks && imageLinks.extraLarge
  ? getHttpsLink(imageLinks.extraLarge)
  : (imageLinks && imageLinks.smallThumbnail)
  ? getHttpsLink(imageLinks.smallThumbnail)
  : null;


  return (

    <Container sx={{marginTop: '150px', display: 'flex', flexDirection: 'column', }}>

      <AppBar  position="fixed" sx={{backgroundColor: 'lightpink', height:'70px'}}> 

        <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <Link to={'/'}>
            <Box sx={{marginTop: '40px'}}>
              <img src='/bookworm.png' alt='Book Worm' height='100px'/>
            </Box>
          </Link>

          <Typography sx={{color: 'black'}}>
            {title}
          </Typography>

        </Toolbar>

      </AppBar>

      

      <Paper elevation={3} sx={{height: '', display: 'flex', flexDirection: 'row', padding: '30px', position: 'relative'}}>

        <Box sx={{ flex: '2', paddingRight: '80px' }}>
          
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '30px', }}>{title}</Typography>

          <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1px', color: 'rgb(1, 121, 202)', }}>{authors}</Typography>
          
          <Typography sx={{ fontSize: '15px', marginBottom: '20px', color: 'grey', }}>{publishedDate && new Date(publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {publisher}</Typography>

          <Box  sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '30px', marginY: '50px',}}>

            {pageCount && 
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px', borderRight: '1px solid grey'}}>
                <Typography>Pages</Typography>
                <Typography>{pageCount}</Typography>
              </Box>
            }

            {saleInfo && 
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px', borderRight: '1px solid grey'}}>
                <Typography>Type</Typography>
                {isEbook ? <Typography>eBook</Typography> : <Typography>Book</Typography>}
              </Box>
            }

            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px', }}>     
              {industryIdentifiers && industryIdentifiers.length > 0 && 
              industryIdentifiers[0].type === 'ISBN_13'
              ? 
              <><Typography>ISBN</Typography><Typography>{industryIdentifiers[0].identifier}</Typography>
              </>
              : 
              industryIdentifiers && industryIdentifiers.length > 0 && 
              industryIdentifiers[1].type === 'ISBN_13'
              ? 
              <><Typography>ISBN</Typography><Typography>{industryIdentifiers[1].identifier}</Typography></> 
              : null}
            </Box>

            
  
          </Box>

          
          

         

          
  
          <Box sx={{marginTop: '50px', position: 'absolute', bottom: '30px'}}>

            <Button color="secondary" variant="contained" onClick={() => handleFavorite(book)} startIcon={<FavoriteIcon />} sx={{marginRight: '10px'}}>
              Favorite
            </Button>
  
            <Button color="success" variant="contained" startIcon={<LibraryBooksIcon />} onClick={() => handleMyShelf(book)}>
              Add to My Shelf
            </Button>

          </Box>
  
  
        </Box>
  
        <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
            

          <Card sx={{ height: '400px', boxShadow: '5' }}>
          {imageUrl && <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />}</Card>
          
        </Box>
  
      </Paper>
  
      <Paper elevation={3} sx={{marginY: '50px', padding: '30px'}}>
        {description ?
        <>
          <Typography sx={{marginBottom: '15px', color: 'rgb(1, 121, 202)' }}><strong>About this Book:</strong></Typography>
          <Typography align="justify">{removeHTMLTags(description)}</Typography> 
        </> 
          : null
        }

        {categories ?
          <Box sx={{marginTop: '30px'}}>
            <Typography sx={{fontWeight: 'bold', color: 'rgb(1, 121, 202)', marginBottom: '15px'}}>Categories:</Typography>
            <Typography>
              {categories}
            </Typography> 
          </Box> 
          : null
        }

        {previewLink && <Link to={previewLink}><Button color="primary" variant="contained" endIcon={<GoogleIcon />} sx={{marginTop: '30px'}}>More about This Book...</Button></Link>}

        
      </Paper>
  

    </Container>
  
  
  )
}
  
export default BookDetail

  



*/

  



