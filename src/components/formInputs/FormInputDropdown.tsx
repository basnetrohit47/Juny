import { TextField, MenuItem } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormInputDropdownProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { label: string; value: string | number }[]; // Dropdown options
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  required?: boolean;
}

export const FormInputDropdown = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  variant = "filled",
  size = "medium",
  required = false,
}: FormInputDropdownProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          select
          helperText={error ? error.message : null}
          size={size}
          error={!!error}
          onChange={onChange}
          value={value || ""}
          fullWidth
          label={
            <>
              {label} {required && <span> *</span>}
            </>
          }
          variant={variant}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
