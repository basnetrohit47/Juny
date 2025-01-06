import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  label: string;
  varient?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  required?: boolean;
};

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  varient = "outlined",
  size = "medium",
  required = false,
  ...rest // Spread all other props
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest} // Spread props to the TextField
          helperText={error ? error.message : rest.helperText}
          size={size}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          variant={varient}
          sx={{ "&:hover": { border: "none" }, ...rest.sx }}
          label={
            <>
              {label} {required && <span> *</span>}
            </>
          }
        />
      )}
    />
  );
};
