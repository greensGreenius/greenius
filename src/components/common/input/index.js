/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { TextField, FormControl, OutlinedInput } from '@mui/material';

export const NormalInput = (props) => {
  const {
    // type = 'text',
    className = '',
    // id = Math.random(),
    placeholder = '',
    label = '',
    errorMessage = '',
    // materialUi = true,
    // maxRows = 2,
    outlinedInput = true,
    readOnly = false,
    size = 'small'
  } = props;

  return (
    <FormControl
      fullWidth
      error={!!errorMessage}
      className={`mb-3 ${className}`}
    >
      <>
        <label className="form-label fw-medium">{label}</label>
        {outlinedInput ? (
          <OutlinedInput
            {...props}
            size={size}
            label=""
            placeholder={placeholder ? placeholder : `Enter ${label}`}
            classes={readOnly ? { root: 'Mui-disabled' } : {}}
          />
        ) : (
          <TextField
            {...props}
            classes={readOnly ? { root: 'Mui-disabled' } : {}}
            size={size}
          />
        )}
        {!!errorMessage && (
          <div className="form-text text-danger">{errorMessage}</div>
        )}
      </>
    </FormControl>
  );
};
