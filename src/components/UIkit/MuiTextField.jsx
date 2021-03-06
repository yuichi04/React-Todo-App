import React from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  textField: {
    width: (props) => props.width,
    margin: (props) => props.margin,
  },
});

const MUITextField = (props) => {
  const classes = useStyles(props);
  const {
    label,
    variant,
    value,
    fullWidth,
    margin,
    rows,
    multiline,
    placeholder,
    onChange,
  } = props;
  return (
    <TextField
      className={classes.textField}
      rows={rows}
      multiline={multiline}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      margin={margin}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default MUITextField;
