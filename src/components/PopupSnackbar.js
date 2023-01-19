import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const PopupSnackbar = (props) => {

  const close = () => {
    props.close({ open: false })
  }

  return (
    <div style={{ cursor: 'pointer' }}>
      <Snackbar
        open={props.obj.open}
        autoHideDuration={5000}
        onClose={close}
      >
        <Alert severity={props.obj.severity} sx={{ width: '100%' }}>
          {props.obj.message}

        </Alert>
      </Snackbar>
    </div>
  );
};

export default PopupSnackbar;