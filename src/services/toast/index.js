import { toast } from 'react-toastify';

export const Toast = ({
  type = 'success',
  message = '',
  position = 'top-right'
}) => {
  toast[type](`🦄 ${message}`, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};
