import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { Validations } from "helpers";
import { PairValue } from "types";
import { useApp, useTheme } from "contexts";

type Props = {
  sx?: any;
  id?: string;
  name?: string;
  label?: string;
  items: PairValue[];
  multiple?: boolean;
  disabled?: boolean;
  withNone?: boolean;
  required?: boolean; // Added required prop
  value?: any;
  onChange?: (value: any) => void;
  onDropdownChange?: (event: SelectChangeEvent<any>) => void;
};

export const Select = ({
  multiple = false,
  withNone = false,
  required = false, // Default required to false
  ...props
}: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const [value, setValue] = useState<any>(
    props.value ? props.value : multiple ? [] : "" // Adjusted default value handling
  );

  useEffect(() => {
    setValue(props.value ? props.value : multiple ? [] : "");
  }, [props.value]);

  const handleChange = (newValue: any): void => {
    setValue(newValue);
    props.onChange && props.onChange(newValue);
  };

  const handleDropdownChange = (event: SelectChangeEvent<any>): void => {
    setValue(event.target.value);
    props.onDropdownChange && props.onDropdownChange(event);
  };

  return (
    <>
      {props.items && (
        <FormControl
          variant="outlined"
          sx={{ width: 1, display: "flex", flexDirection: "row" }}
          required={required} // Pass the required prop to FormControl
        >
          {props.label && (
            <InputLabel
              id={props.id}
              sx={{
                color: props.disabled
                  ? theme.palette.background.accent
                  : theme.palette.font.color,
              }}
            >
              {props.label}
            </InputLabel>
          )}
          <MUISelect
            value={value}
            name={props.name}
            labelId={props.id}
            multiple={multiple} // Enable multiple selection
            required={required} // Pass the required prop to MUISelect
            disabled={props.disabled}
            onChange={handleDropdownChange}
            input={<OutlinedInput label={props.label} />}
            sx={{
              width: 1,
              "& .MuiSelect-icon": {
                color: props.disabled
                  ? theme.palette.background.accent
                  : theme.palette.font.color,
              },
              "& .MuiFormLabel-root": {
                color: theme.palette.font.color,
              },
              "& .MuiSelect-select": {
                color: theme.palette.font.color,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.input.accent,
              },
            }}
            MenuProps={{
              MenuListProps: {
                sx: {
                  color: theme.palette.font.color,
                  backgroundColor: theme.palette.background.accent,
                },
              },
            }}
          >
            {withNone && (
              <MenuItem
                key={t.label.none}
                value={""}
                onClick={() => handleChange("")}
              >
                {t.label.none}
              </MenuItem>
            )}
            {props.items.map((item: PairValue) => (
              <MenuItem
                key={item.key}
                value={item.key}
                onClick={() => handleChange(item.key)}
              >
                {item.value}
              </MenuItem>
            ))}
          </MUISelect>
        </FormControl>
      )}
    </>
  );
};
