import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GoogleLogin , useGoogleLogin } from '@react-oauth/google';



export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
const login = useGoogleLogin(
  {
    onSuccess:(resp)=>{console.log(resp);},
    onError:(error)=>{console.log(error);}
   
  }
)
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
    <div className=' flex justify-center '>
<div>


   
      <h1 className=' p-3 lg:text-3xl md:text-2xl sm:text-xl text-emerald-600' >
        Sign in With Google
      </h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Sign In
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Connect with us Get yourself Signed in!!!!!!!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={login} autoFocus>
            SignIn
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      </div>
    </React.Fragment>
  );
}
