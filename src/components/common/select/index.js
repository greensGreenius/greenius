/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import { NormalInput } from 'components/common';
// import ListSubheader from '@mui/material/ListSubheader';
// import { multySearchObjects } from 'services/helperFunctions';
import Select from 'react-select';

export function NormalSelect(props) {
  // const [filterObject, setFilterObject] = React?.useState({
  //   label: ''
  // });
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
    // size = 'small',
    isLabel = true,
    isLoading = false
  } = props;
  const [selectValue, setSelectValue] = React.useState('');
  const [multySelectValue, setMultySelectValue] = React.useState([]);

  const handleChange = (event, name) => {
    const { value = '' } = event;
    if (multiple) {
      // const val = typeof value === 'string' ? value.split(',') : value;
      console.log('val------', event);
      setMultySelectValue(event);
      const select = {
        target: {
          value: event.map(({ value }) => value),
          name
        }
      };
      onChange(select);
    } else {
      setSelectValue(String(value));
      const select = {
        target: {
          value,
          name
        }
      };
      onChange(select);
    }
  };

  const handleSetLaodValue = () => {
    if (multiple) {
      if (Array.isArray(value)) {
        const val = value?.map((val) => {
          return option.find(({ value }) => value === val);
        });

        setMultySelectValue(val);
      }
    } else {
      console.log('-----', value);
      setSelectValue(String(value));
    }
  };

  React.useEffect(() => {
    handleSetLaodValue();
  }, []);
  React.useEffect(() => {
    handleSetLaodValue();
  }, [option]);

  React.useEffect(() => {
    handleSetLaodValue();
  }, [value]);

  // const handleInputChange = (event) => {
  //   const {
  //     target: { value, checked, type, name }
  //   } = event;

  //   const filterValue = {
  //     ...filterObject,
  //     [name]: type === 'checkbox' ? checked : value
  //   };

  //   setFilterObject(filterValue);
  // };

  // eslint-disable-next-line consistent-return
  // const handleRenderValue = () => {
  //   if (multiple) {
  //     if (multySelectValue.length === 0) {
  //       return !isLoading ? (
  //         <em>{`Select ${label}`}</em>
  //       ) : (
  //         <em>{`Loading}`}</em>
  //       );
  //     }

  //     if (option.length > 0) {
  //       return multySelectValue
  //         .map((data) => option.find(({ value }) => value === data)?.label)
  //         .join(', ');
  //     }
  //   } else {
  //     if (selectValue.length === 0) {
  //       return !isLoading ? (
  //         <em>{`Select ${label}`}</em>
  //       ) : (
  //         <em>{`Loading}`}</em>
  //       );
  //     }

  //     return option.find(({ value }) => String(value) === String(selectValue))
  //       ?.label;
  //   }
  // };

  // const handleKeyDown = (event) => {
  //   event.stopPropagation();
  // };

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
          name={name}
          value={
            multiple
              ? multySelectValue
              : option?.find(({ value = '' }) => value === selectValue)
          }
          isMulti={multiple}
          onChange={(e) => handleChange(e, name)}
          readOnly={readOnly}
          disabled={disabled || isLoading}
          options={option}
        />
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={multiple ? multySelectValue : selectValue}
          label={label}
          multiple={multiple}
          displayEmpty
          onKeyDown={handleKeyDown}
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
          <ListSubheader value="search" onKeyDown={handleKeyDown}>
            <NormalInput
              name="label"
              value={filterObject.label}
              onChange={handleInputChange}
            />
          </ListSubheader>
          {multySearchObjects(option, filterObject)?.map((data) => (
            <MenuItem
              key={data.value}
              value={data.value}
              onKeyDown={handleKeyDown}
            >
              {multiple && (
                <Checkbox checked={multySelectValue.indexOf(data.value) > -1} />
              )}
              {data.label}
            </MenuItem>
          ))}
        </Select> */}
        {!!errorMessage && (
          <div className="form-text text-danger">{errorMessage}</div>
        )}
      </FormControl>
    </Box>
  );
}
