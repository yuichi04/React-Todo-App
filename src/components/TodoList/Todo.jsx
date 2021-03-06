import React, { useState, useContext, useCallback } from "react";
import { BoardContext } from "../../contexts";
import { MuiTypography } from "../UIkit";
import { TodoModal } from "./Modal";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NotesIcon from "@material-ui/icons/Notes";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  checkIcon: {
    cursor: "pointer",
    marginRight: 8,
    color: "#666",
    [theme.breakpoints.down("sm")]: {
      marginRight: 4,
    },
  },
  typWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    padding: 8,
  },
  notesIcon: {
    color: "#666",
  },
}));

const IncompleteTodo = (props) => {
  const classes = useStyles();

  // props
  const { todo } = props;
  const id = todo.id;
  const text = todo.text;
  const completed = todo.completed;
  const editing = todo.editing;
  const memoText = todo.memo.text;

  // contexts
  const [todos, setTodos] = useContext(BoardContext);

  // state
  const [open, setOpen] = useState(false);

  // 編集・完了・メモなどのタスクの状態を変更する
  const handleChangeTodoAttribute = useCallback(
    (id, key, value) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            [key]: value,
          };
        }
        return todo;
      });
      setTodos(newTodos);
    },
    [todos, setTodos]
  );

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <li className={classes.list}>
      {completed ? (
        <CheckCircleIcon
          className={classes.checkIcon}
          onClick={() => handleChangeTodoAttribute(id, "completed", !completed)}
          style={{ color: green[500] }}
        />
      ) : (
        <CheckCircleOutlineIcon
          className={classes.checkIcon}
          onClick={() => handleChangeTodoAttribute(id, "completed", !completed)}
        />
      )}
      <Paper
        className={classes.typWrap}
        elevation={2}
        onClick={handleClickOpen}
      >
        <MuiTypography typography={text} component="p" />
        {memoText && <NotesIcon className={classes.notesIcon} />}
      </Paper>
      {/* openがtrueの時に表示 */}
      <TodoModal
        id={id}
        text={text}
        open={open}
        editing={editing}
        memoText={memoText}
        setOpen={setOpen}
        handleChangeTodoAttribute={handleChangeTodoAttribute}
      />
    </li>
  );
};

export default IncompleteTodo;
