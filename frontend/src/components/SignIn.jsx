import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {   useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };
const login = useGoogleLogin(
  {
    onSuccess:(resp)=>{getuserdetails(resp)},
    onError:(error)=>{console.log(error);}
   
  }
)

const getuserdetails =(tokeninfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`
  ,{headers:{
            Authorization:`Bearer ${tokeninfo?.access_token}`,
            Accept:"Application/json"
  }}).then((resp)=>{console.log(resp);
    localStorage.setItem('user',JSON.stringify(resp.data))
    setOpen(false)
    toast.success("Logged in ")
    navigate("/planner")
    window.location.reload()
  })
}

  const handleClose = () => {
    setOpen(false);
  };
  const setrandomuser = async () => {
    let a = Math.floor(Math.random() * 100); 
    const picture = `https://api.dicebear.com/9.x/adventurer/svg?seed=${a}`;
    const name = `user_x${a}x`;
    const random = true;
    localStorage.setItem('user', JSON.stringify({ picture, name,random }));
    navigate("/planner")
};

  return (
    <React.Fragment>
    <div className=' flex justify-center '>
<div>


   
      <h1 className=' p-3 lg:text-3xl md:text-2xl sm:text-xl text-emerald-600' >
        Sign in With Google
      </h1> 
      <div className=' flex justify-center gap-3'>

      <Button variant="outlined" onClick={handleClickOpen}>
        Sign In
      </Button>
      <Button variant="outlined" onClick={setrandomuser} >
      Continue Without SignIn
      </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sign In Here !!!!!!!!!"}
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
