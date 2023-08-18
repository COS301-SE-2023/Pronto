import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};


export function ErrorModal(errorMessage) {

  const [open, setOpen] = useState(true);

  const handleOpen = async () => {
    setOpen(true)
  }

  const handleClose = async () => {
    setOpen(false)
    errorMessage.setError("")
  }

  return (
    <div className="form-row">
      <div className="form-group col-6">

        {/* <button onClick={handleOpen}  
      className="btn btn-primary"
      data-testid="submitButton">View</button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <p>{errorMessage.errorMessage}</p>
            <button
              onClick={handleClose}
              type="submit"
              className="btn btn-primary float-right"
              data-testid="submitCourses"
              style={{
                backgroundColor: "#e32f45",
                color: "white",
              }}
            >
              Ok
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}