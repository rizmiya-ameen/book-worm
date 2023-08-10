import './Header.css'
import { useNavigate, Outlet, Link  } from "react-router-dom"
import { useState } from "react"
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, Badge, } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from './SearchStyles'


function Header () {

  let navigate = useNavigate()

  const [query, setQuery] = useState('') 
 
  const handleSearch = event => {
    event.preventDefault()
    navigate(`/search/${query}`)
    //when clicked search, take user to that page
    setQuery('')
  }

  const handleText = event => {
    const genre = event.currentTarget.textContent;
    navigate(`/genre/${genre}`);
  };



  
    

  return (

    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="fixed" sx={{backgroundColor: 'purple'}}>

        <Toolbar sx={{height: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

          <img src='' alt='Book Worm'/>

          <FormControl onSubmit={handleSearch} sx={{display: 'flex', flexDirection: 'row', }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={query} 
                
                placeholder="Search by Title or Author"
                inputProps={{ 'aria-label': 'search' }}
                onChange={event => setQuery(event.target.value)}
              />
            </Search>
            <Button
              variant="contained"
              size="small"
              onClick={handleSearch}
            >
              Search
            </Button>
          </FormControl>


          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Link to={'/favorite'}>
              <Tooltip title="Favorites" placement="top">
                <IconButton
                  size="large"
                  aria-label="show favorite items"
                  //color="inherit"
                  sx={{color: 'white', backgroundColor: 'black',}}
                >
                  <Badge badgeContent={5} color="error">
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
                  <Badge badgeContent={8} color="error">
                    <LibraryBooksIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
          </Box>

        </Toolbar>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs onChange={handleText} centered value={0} indicatorColor="primary">
          <Tab label="Fiction" />
          <Tab label="Nonfiction" />
          <Tab label="Science" />
        </Tabs>
      </Box>

      </AppBar>

          
      
      
      {/*
      <div className='nav-bar'>

      <button onClick={handleText}>Fiction</button>
      <button onClick={handleText}>Nonfiction</button>
      <button onClick={handleText}>Science</button>
      <button onClick={handleText}>Politics</button>
      <button onClick={handleText}>Business</button>
      <button onClick={handleText}>Poetry</button>
      <button onClick={handleText}>Law</button>
      <button onClick={handleText}>Biography</button>

      </div>
*/}
        

        <Outlet />

    </Box>
    

  )
}

export default Header



/*



import './Header.css'
import { useNavigate, Outlet, Link  } from "react-router-dom"
import { useState } from "react"

function Header () {

  let navigate = useNavigate()

  const [query, setQuery] = useState('') 
 
  const handleSearch = event => {
    event.preventDefault()
    navigate(`/search/${query}`)
    //when clicked search, take user to that page
    setQuery('')
  }

  const handleText = event => {
    const genre = event.currentTarget.textContent;
    navigate(`/genre/${genre}`);
  };

  return (

    <div className="Header">

      <div className='main-bar'>

        <form onSubmit={handleSearch}>
          <input type="text" placeholder='Search by Title or Author' value={query} onChange={event => setQuery(event.target.value)} />
          <button>Search</button>
        </form>

        <Link to={'/favorite'}><button>Favorite</button></Link>
        <Link to={'/myshelf'}><button>My Shelf</button></Link>

      </div>
      
      <div className='nav-bar'>

        <button onClick={handleText}>Fiction</button>
        <button onClick={handleText}>Nonfiction</button>
        <button onClick={handleText}>Science</button>
        <button onClick={handleText}>Politics</button>
        <button onClick={handleText}>Business</button>
        <button onClick={handleText}>Poetry</button>
        <button onClick={handleText}>Law</button>
        <button onClick={handleText}>Biography</button>

      </div>
      
      
      <Outlet />

    </div>
  )
}

export default Header


*/

