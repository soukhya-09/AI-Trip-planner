import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);

  const login = useGoogleLogin({
    onSuccess: (resp) => getUserDetails(resp),
    onError: (error) => console.log(error)
  });

  const getUserDetails = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpen(false);
      toast.success('Logged in');
      navigate('/planner');
      window.location.reload();
    });
  };

  const handleClose = () => setOpen(false);

  const setRandomUser = () => {
    const a = Math.floor(Math.random() * 100);
    const picture = `https://api.dicebear.com/9.x/adventurer/svg?seed=${a}`;
    const name = `user_x${a}x`;
    const random = true;
    localStorage.setItem('user', JSON.stringify({ picture, name, random }));
    navigate('/planner');
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-cyan-50 p-6'>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-700 mb-6 text-center'
      >
        Sign in With Google
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className='flex flex-col md:flex-row gap-4'
      >
        <Button 
          variant='contained' 
          color='success' 
          onClick={handleClickOpen} 
          className='shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all'
        >
          Sign In
        </Button>

        <Button 
          variant='outlined' 
          color='success' 
          onClick={setRandomUser}
          className='shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all'
        >
          Continue Without SignIn
        </Button>
      </motion.div>

      <Dialog open={open} onClose={handleClose} PaperProps={{ className: 'rounded-3xl p-4 bg-gradient-to-br from-emerald-50 to-cyan-50' }}>
        <DialogTitle className='text-emerald-800 font-bold text-center'>Sign In Here!</DialogTitle>
        <DialogContent>
          <DialogContentText className='text-emerald-700 text-center'>Connect with us to get signed in and enjoy personalized trip planning!</DialogContentText>
        </DialogContent>
        <DialogActions className='justify-center gap-4'>
          <Button variant='outlined' onClick={handleClose} className='text-emerald-700 border-emerald-700 hover:bg-emerald-100'>Cancel</Button>
          <Button variant='contained' onClick={login} className='bg-emerald-600 hover:bg-emerald-700 text-white'>SignIn</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position='bottom-right' autoClose={2500} />
    </div>
  );
}
