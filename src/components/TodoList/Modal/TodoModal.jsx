import React, { useCallback, useContext } from "react";
import { BoardContext } from "../../../contexts";
import { MuiButton, MuiTypography } from "../../UIkit";
import { TodoModalTitle, TodoModalMemo } from "./index";
//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import SubjectIcon from "@material-ui/icons/Subject";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    position: "fixed",
    backgroundColor: "rgba(0,0,0,.75)",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  modal: {
    zIndex: 2,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 32px)",
    },
  },
  container: {
    width: "calc(100% - 32px)",
    margin: "0 auto",
    padding: "16px 0",
  },
  closeIcon: {
    cursor: "pointer",
    color: "#666",
    textAlign: "right",
  },
  titleWrap: {
    display: "flex",
    alignItems: "center",
  },
  typWrap: {
    display: "flex",
    alignItems: "center",
    color: "#333",
    marginBottom: 8,
  },
  subjectIcon: {
    marginRight: 8,
  },
  deleteBtn: {
    textAlign: "right",
  },
}));

const TodoModal = (props) => {
  const classes = useStyles();
  // props
  const {
    id,
    text,
    editing,
    open,
    setOpen,
    memoText,
    memoEditing,
    handleChangeTodoAttribute,
  } = props;

  // context
  const [todos, setTodos] = useContext(BoardContext);

  // modalを閉じる
  const handleClickClose = () => {
    setOpen(false);
  };

  // タスクを削除する
  const handleClickDelete = useCallback(() => {
    const result = window.confirm("削除してよろしいですか？");
    if (result) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  }, [id, todos, setTodos]);

  return (
    <>
      {open && (
        <div className={classes.root} onClick={handleClickClose}>
          <Paper className={classes.modal} onClick={(e) => e.stopPropagation()}>
            <div className={classes.container}>
              <div className={classes.closeIcon}>
                <CloseIcon onClick={handleClickClose} />
              </div>
              <TodoModalTitle
                id={id}
                text={text}
                editing={editing}
                handleChangeTodoAttribute={handleChangeTodoAttribute}
              />
              <div className={classes.typWrap}>
                <SubjectIcon className={classes.subjectIcon} />
                <MuiTypography
                  variant="h6"
                  component="span"
                  typography="詳しい説明"
                  fontWeight={600}
                />
              </div>
              <TodoModalMemo
                id={id}
                memoText={memoText}
                memoEditing={memoEditing}
              />
              <div className={classes.deleteBtn}>
                <MuiButton
                  text="削除する"
                  variant="outlined"
                  onClick={handleClickDelete}
                  backgroundColor="#eee"
                />
              </div>
            </div>
          </Paper>
        </div>
      )}
    </>
  );
};

export default TodoModal;
