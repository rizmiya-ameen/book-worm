import { Link } from "react-router-dom"
import { Badge, } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Box from '@mui/material/Box';
import { useState, useEffect} from 'react'

function HeaderIcons () {

  const [favorite, setFavorite] = useState ([])
  const [toReadBooks, setToReadBooks] = useState ([])
  const [readingBooks, setReadingBooks] = useState ([])
  const [completedBooks, setCompletedBooks] = useState ([])

  const myShelfBooksCount = (toReadBooks.length + readingBooks.length + completedBooks.length)

  useEffect(() => {
    // Get favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem('favoriteBooks');
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }
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

  console.log(myShelfBooksCount)

  return (
    
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Link to={'/favorite'}>
              <Tooltip title="Favorites" placement="top">
                <IconButton
                  size="large"
                  aria-label="show favorite items"
                  //color="inherit"
                  sx={{color: 'white', backgroundColor: 'black',}}
                >
                  <Badge badgeContent={favorite.length} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link> 

            <Link to={'/myshelf'}>
              <Tooltip title="My Shelf" placement="top">
                <IconButton
                  size="large"
                  aria-label="show favorite items"
                  //color="inherit"
                  sx={{color: 'white', backgroundColor: 'black',}}
                >
                  <Badge badgeContent={myShelfBooksCount} color="error">
                    <LibraryBooksIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
    
  )
}

export default HeaderIcons