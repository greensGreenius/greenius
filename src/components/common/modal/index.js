import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './modal.scss';

const style = {
  position: 'absolute',
  top: '0%',
  right: '0%',
  width: '600px',
  height: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24
};

export function NormalModal(props) {
  const {
    isShow = false,
    toggle = () => {},
    children = '',
    title = ''
  } = props;

  return (
    <>
      <Modal open={isShow} onClose={toggle && toggle} className="app-modal">
        <Box sx={{ ...style }}>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <IconButton className="text-dark" onClick={toggle && toggle}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="modal-body">{children}</div>
        </Box>
      </Modal>
    </>
  );
}
