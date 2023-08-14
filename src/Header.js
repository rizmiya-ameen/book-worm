import './Header.css'
import { useNavigate, Outlet, Link} from "react-router-dom"
import { useState } from "react"
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';



import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HeaderIcons from './HeaderIcons';

//import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl,  } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from './SearchStyles'


function Header () {

  let navigate = useNavigate()

  const [query, setQuery] = useState('') 
  
  const [value, setValue] = useState('0');


  const handleSearch = event => {
    event.preventDefault()
    navigate(`/search/${query}`)
    //when clicked search, take user to that page
    setQuery('')
    setValue('0')
  }

  const handleText = (event, newValue) => {
    const genre = event.currentTarget.textContent;
    
    navigate(`/genre/${genre}`);
    setValue(newValue);
  };
    

  return (

    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="fixed" sx={{backgroundColor: '#44318D'}}>

        <Toolbar  sx={{height: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <Box sx={{marginTop: '24px', marginLeft: '24px'}}>
            <Link to='/'><img src='/bookworm2.png' alt='Book Worm' height='95px' /></Link>
          </Box>

          <FormControl 
            onSubmit={handleSearch} 
            sx={{
              display: 'flex', 
              flexDirection: 'row', 
            }}>
              
            <Search>

              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                value={query} 
                
                placeholder="Search by Title..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={event => setQuery(event.target.value)}
              />
            </Search>
            <Button
              variant="contained"
              size="small"
              onClick={handleSearch}
              sx={{marginLeft: '2px', bgcolor: '#d82679', '&:hover': {
                bgcolor: '#ad0352'}, letterSpacing:'2px' }}
            >
              Search
            </Button>
          </FormControl>


          <HeaderIcons />

        </Toolbar>

        
        <Box sx={{ width: '100%', bgcolor: '#A4B3B6' }}>
        <Tabs onChange={handleText} centered value={value} indicatorColor="primary" >
        <Tab value="0" label="Home" component={Link} to="/" sx={{ fontWeight: '700' }} />
          <Tab value="1" label="Fiction" sx={{fontWeight: '700'}}/>
          <Tab value="2" label="Nonfiction" sx={{fontWeight: '700'}}/>
          <Tab value="3" label="Science" sx={{fontWeight: '700'}}/>
          <Tab value="4" label="Politics" sx={{fontWeight: '700'}}/>
          <Tab value="5" label="Business" sx={{fontWeight: '700'}}/>
          <Tab value="6" label="Poetry" sx={{fontWeight: '700'}}/>
          <Tab value="7" label="Law" sx={{fontWeight: '700'}}/>
          <Tab value="8" label="Biography" sx={{fontWeight: '700'}}/>
        </Tabs>
              </Box>
              


        

      </AppBar>
        

        <Outlet />

    </Box>
    

  )
}

export default Header

/*
<Tabs onChange={handleText} centered value={value} indicatorColor="primary" sx={{color: 'white'}}>
          <Tab value="1" label="Fiction" />
          <Tab value="2" label="Nonfiction" />
          <Tab value="3" label="Science" />
          <Tab value="4" label="Politics" />
          <Tab value="5" label="Business" />
          <Tab value="6" label="Poetry" />
          <Tab value="7" label="Law" />
          <Tab value="8" label="Biography" />
        </Tabs>
        */

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

