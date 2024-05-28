import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

export function NormalSearch(props) {
  const {
    label = '',
    className = '',
    // isLoader = false,
    placeholder = '',
    variant = 'outlined',
    // materialUi = true,
    position = 'end',
    id = Math.random(),
    size = 'small'
  } = props;

  return (
    <FormControl
      placeholder={placeholder}
      variant={variant}
      className={`w-100 ${className} ${
        size === 'small' && 'small-search-input'
      }`}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        {...props}
        size={size}
        placeholder={placeholder}
        id={id}
        endAdornment={
          <InputAdornment position={position}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}
