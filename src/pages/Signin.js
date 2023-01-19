/** @format */

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LoadingButton } from "@mui/lab";
import PopupSnackbar from "../components/PopupSnackbar";
import axios from "axios";

export default function SignIn() {


  //to set the snackbar functionalities
  const [snackBar, setsnackBar] = useState({})
  //to set loading when the async function is loading
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);

    if (!data.get("email") || !data.get("password")) {
      setsnackBar({ open: true, message: "Please fill all the fields", severity: "warning" });
      setLoading(false)
      return
    };

    const loginData = {
      email: data.get("email"),
      password: data.get("password")
    };

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };

      const responseData = await axios.post(
        "/api/auth/login",
        loginData,
        config
      );


      setsnackBar({ open: true, message: "Login Successful", severity: "success" });
      setLoading(false);
      localStorage.setItem("authToken", responseData.data.token)
      return

    } catch (error) {

    }

    setLoading(false)
  };

  return (
    <Container component='main' maxWidth='xs'>
      <PopupSnackbar obj={snackBar} close={setsnackBar} />
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "40px",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          <LoadingButton
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
            variant="contained"
          >
            Login

          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
