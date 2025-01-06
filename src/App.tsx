import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { MainLayout } from "./layouts/MainLayout";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./theme/darkTheme";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <MainLayout />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
