import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue color for primary theme
    },
    secondary: {
        main: "#c2185b", // Customize secondary color if needed
      },
    background: {
      default: "#edf2f6", 
      paper: '#FFFFFF',  
      
      



    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#f4f4f4", // Light app bar background color
        },
      },
    },
   
  },
});

export default lightTheme;
