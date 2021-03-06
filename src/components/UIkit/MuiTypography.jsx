import React from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  typography: {
    color: (props) => props.color,
    cursor: (props) => props.cursor,
    backgroundColor: (props) => props.backgroundColor,
    fontSize: (props) => props.fontSize,
    fontWeight: (props) => props.fontWeight,
    width: (props) => props.width,
    whiteSpace: (props) => props.whiteSpace,
    padding: (props) => props.padding,
  },
});

const MUITypography = (props) => {
  const classes = useStyles(props);
  const { typography, variant, component, display } = props;

  return (
    <Typography
      className={classes.typography}
      variant={variant}
      component={component}
      display={display}
    >
      {typography}
    </Typography>
  );
};

export default MUITypography;
