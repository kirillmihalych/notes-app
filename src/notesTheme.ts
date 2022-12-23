import { createTheme } from '@mui/material/styles'
import { purple } from '@mui/material/colors'

export const notesTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#93e7fb',
    },
  },
})
