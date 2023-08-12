import { Grid, Typography, Box, Paper, Container, Button, IconButton, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

function ShelfSelection ({sectionTitle, books, handleRemovalofOne, handleMoveToNext, handleRemovalofAll, buttonText}) {

  return (

    <Container>

      <h3>{sectionTitle} {books.length}</h3>

      <button onClick={handleRemovalofAll}>Clear All</button>

      <Grid container spacing={5} sx={{marginY: '10px'}}>
      {books && books.map(item => (

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
        
      </Grid>

    </Container>
  )
}

export default ShelfSelection