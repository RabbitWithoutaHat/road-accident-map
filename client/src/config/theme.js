import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#182961',
    },
    secondary: {
      main: '#d2084e',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: ["'Exo 2'", 'sans-serif'].join(','),
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'black',
      },
    },
  },
})
