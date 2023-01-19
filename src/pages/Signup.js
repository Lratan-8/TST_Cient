/** @format */

import React, { Fragment, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PopupSnackbar from "../components/PopupSnackbar";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SignUp() {

  //to set loading when the async function is loading
  const [loading, setLoading] = useState(false);

  //to set the snackbar functionalities
  const [snackBar, setsnackBar] = useState({
    open: false,
  })

  const handleClick = () => {
    setsnackBar({ open: true });
  };


  //to handle the user form data from the sign up form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const dataF = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword")
    }


    if (!dataF.name || !dataF.phone || !dataF.email || !dataF.password || !dataF.confirmPassword) {
      console.log(dataF)
      setsnackBar({ open: true, message: "Please fill all the fields", severity: "warning" });
      setLoading(false)
      return
    }
    if (dataF.password !== dataF.confirmPassword) {
      console.log(dataF)
      setsnackBar({ open: true, message: "Password and confirm password does not match", severity: "error" });
      setLoading(false);
      return
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      };
      const responseData = await axios.post("/api/auth/createuser", dataF, config);

      setsnackBar({ open: true, message: "Registration Successfull", severity: "success" });
      localStorage.setItem('UserInfo', JSON.stringify(responseData));
      console.log(responseData)
      setLoading(false);
      return
    } catch (error) {
      setsnackBar({ open: true, message: "we have an error", severity: "error" });
      setLoading(false)
      return
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <PopupSnackbar obj={snackBar} close={setsnackBar} />
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
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='name'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='phone'
                label='Phone Number'
                name='phone'
                autoComplete='your-phone-number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='confirmPassword'
                id='confirmPassword'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
            loading={loading}
            variant="contained"
          >
            Sign up

          </LoadingButton>

        </Box>
      </Box>
    </Container>
  );
}
