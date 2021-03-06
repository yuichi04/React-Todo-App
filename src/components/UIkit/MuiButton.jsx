import React from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    backgroundColor: (props) => props.backgroundColor,
    color: (props) => props.color,
    fontSize: (props) => props.fontSize,
    margin: (props) => props.margin,
    "&:hover": {
      backgroundColor: (props) => props.hoveredBgColor,
      color: (props) => props.hoveredColor,
    },
  },
});

const MUIButton = (props) => {
  const classes = useStyles(props);
  const { variant, text, href, onClick } = props;
  return (
    <Button
      className={classes.button}
      variant={variant}
      href={href}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
export default MUIButton;
