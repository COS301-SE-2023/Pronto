import { useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position:'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ErrorModal(errorMessage) {

  const [open, setOpen] = useState(false);

  const handleOpen = async()=>{ 
    setOpen(true)
  }

  const handleClose= async()=>{ 
    setOpen(false)
  }
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {errorMessage}
        </Box>
    </Modal>     

}