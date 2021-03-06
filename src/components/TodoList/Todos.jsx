import React from "react";
import { MuiTypography } from "../UIkit";
import { Todo } from "./index";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid #ccc",
    backgroundColor: "#eee",
    padding: 16,
    [theme.breakpoints.down("sm")]: {
      padding: "0 8px",
      backgroundColor: "#fff",
    },
  },
}));

const Todos = (props) => {
  const classes = useStyles();

  // props
  const { title, todos } = props;

  return (
    <div className={classes.container} elevation={2}>
      <MuiTypography
        typography={title}
        fontWeight={600}
        color="#333"
        component="h2"
      />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
