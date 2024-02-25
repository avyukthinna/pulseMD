import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useAuth } from '../../store/AuthProvider';

export default function DeleteAccountDialog({isOpen,handleClose}){
    const {handleDeleteAccount} = useAuth()

    return (
        <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your PulseMD Account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleDeleteAccount} className='border-2 rounded-md border-red-700 px-5 py-1 mr-2 hover:bg-red-700 hover:text-primary-white'>Yes</button>
          <button onClick={handleClose} autoFocus className='border-2 border-blue-700 rounded-md text-primary-white bg-blue-700 hover:bg-blue-600 hover:border-blue-600 px-5 py-1 mr-2'>No</button>
        </DialogActions>
      </Dialog>
    )
}