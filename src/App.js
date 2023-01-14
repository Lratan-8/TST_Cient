/** @format */

import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Homepage from "./pages/Homepage";
import { CssBaseline } from "@mui/material";
import LoginLogout from "./components/LoginLogout";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<LoginLogout />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
