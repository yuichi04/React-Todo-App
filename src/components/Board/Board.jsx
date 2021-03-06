import React, { useState, useEffect } from "react";
import { BoardContext } from "../../contexts";
import { MuiTypography } from "../UIkit";
import { Form, SimpleTab, Todos } from "../TodoList";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "calc(100% - 256px)",
    margin: "32px auto",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 16px)",
      margin: "16px auto",
    },
  },
  todos: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  todo: {
    width: "calc(50% - 8px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 16,
    },
  },
  title: {
    marginBottom: 16,
  },
  spTab: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
}));

const Board = () => {
  const classes = useStyles();

  // state
  const [todos, setTodos] = useState([]);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  useEffect(() => {
    const newIncompleteTodos = todos.filter((todo) => !todo.completed);
    setIncompleteTodos(newIncompleteTodos);
    const newCompleteTodos = todos.filter((todo) => todo.completed);
    setCompleteTodos(newCompleteTodos);
  }, [todos]);

  return (
    <BoardContext.Provider value={[todos, setTodos]}>
      <div className={classes.container}>
        <div className={classes.title}>
          <MuiTypography
            component="h1"
            variant="h4"
            fontWeight={600}
            color="#333"
            typography="React Todoアプリ"
          />
        </div>
        <Form />
        <div className={classes.todos}>
          <div className={classes.todo}>
            <Todos todos={incompleteTodos} title="未完了リスト" />
          </div>
          <div className={classes.todo}>
            <Todos todos={completeTodos} title="完了リスト" />
          </div>
        </div>
        <div className={classes.spTab}>
          <SimpleTab
            incompleteTodos={incompleteTodos}
            completeTodos={completeTodos}
          />
        </div>
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
