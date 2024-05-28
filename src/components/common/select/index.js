/* eslint-disable no-shadow */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

export function NormalSelect(props) {
  const {
    label = '',
    option = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ],
    multiple = false,
    outlinedInput = true,
    errorMessage = '',
    onChange = () => {},
    value = '',
    name = '',
    readOnly = false,
    disabled = false,
    size = 'small',
    isLabel = true,
    isLoading = false
  } = props;
  const [selectValue, setSelectValue] = React.useState('');
  const [multySelectValue, setMultySelectValue] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value = '' }
    } = event;
    if (multiple) {
      const val = typeof value === 'string' ? value.split(',') : value;
      setMultySelectValue(val);
    } else {
      console.log('-----', value);
      setSelectValue(String(value));
    }
    onChange(event);
  };

  React.useEffect(() => {
    if (multiple) {
      const val = typeof value === 'string' ? value.split(',') : value;
      setMultySelectValue(val);
    } else {
      console.log('-----', value);
      setSelectValue(String(value));
    }
  }, []);

  React.useEffect(() => {
    if (multiple) {
      const val = typeof value === 'string' ? value.split(',') : value;
      setMultySelectValue(val);
    } else {
      console.log('-----', value);
      setSelectValue(String(value));
    }
  }, [value]);

  // eslint-disable-next-line consistent-return
  const handleRenderValue = () => {
    if (multiple) {
      if (multySelectValue.length === 0) {
        return !isLoading ? (
          <em>{`Select ${label}`}</em>
        ) : (
          <em>{`Loading}`}</em>
        );
      }

      if (option.length > 0) {
        return multySelectValue
          .map((data) => option.find(({ value }) => value === data)?.label)
          .join(', ');
      }
    } else {
      if (selectValue.length === 0) {
        return !isLoading ? (
          <em>{`Select ${label}`}</em>
        ) : (
          <em>{`Loading}`}</em>
        );
      }

      return option.find(({ value }) => String(value) === String(selectValue))
        ?.label;
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className="mb-3" error={!!errorMessage}>
        {outlinedInput && isLabel
          ? // eslint-disable-next-line jsx-a11y/label-has-associated-control
            label && <label className="form-label fw-medium">{label}</label>
          : isLabel && (
              <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            )}

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={multiple ? multySelectValue : selectValue}
          label={label}
          multiple={multiple}
          displayEmpty
          name={name}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={disabled || isLoading}
          size={size}
          input={outlinedInput && <OutlinedInput />}
          renderValue={(selected) =>
            selected.length > 0 ? (
              handleRenderValue()
            ) : (
              <span style={{ color: 'rgba(0, 0, 0, 0.23)' }}>
                {!isLoading ? `Select ${label}` : `Loading...`}
              </span>
            )
          }
          // MenuProps={MenuProps}
        >
          {option?.map((data) => (
            <MenuItem key={data.value} value={data.value}>
              {multiple && (
                <Checkbox checked={multySelectValue.indexOf(data.value) > -1} />
              )}
              {data.label}
            </MenuItem>
          ))}
        </Select>
        {!!errorMessage && (
          <div className="form-text text-danger">{errorMessage}</div>
        )}
      </FormControl>
    </Box>
  );
}
