import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
  p: 4,
};


export function SeesionExpireModal(successMessage) {

  const [open, setOpen] = useState(true);
  const navigate =useNavigate();
  const handleClose = async () => {
    setOpen(false);
    navigate("/");
  }

  return (
    <div className="form-row">
      <div className="form-group col-6">

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <h1>Session Expired</h1>
            <p>Click Login to continue using Pronto</p>
            <button
              onClick={handleClose}
              type="submit"
              className="btn btn-primary float-right"
              style={{
                backgroundColor: "#e32f45",
                color: "white",
                width: "20%",
                borderRadius: "20px",
              }}
            >
              Login
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}