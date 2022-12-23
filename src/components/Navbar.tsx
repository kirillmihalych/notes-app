import { FC } from 'react'
// import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'

const Navbar: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <LightbulbCircleIcon fontSize='large' />

          <Typography
            variant='h5'
            component='div'
            sx={{ flexGrow: 1, marginLeft: '10px' }}
          >
            Notes
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
