import React, { useState, useCallback, useContext } from "react";
import { BoardContext } from "../../../contexts";
import { MuiTextField, MuiButton, MuiTypography } from "../../UIkit";
//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    zIndex: 999,
    backgroundColor: "gray",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
  editIcon: {
    marginRight: 8,
    fontSize: 32,
    color: "#666",
  },
  closeIcon: {
    cursor: "pointer",
    color: "#666",
  },
  titleWrap: {
    color: "#333",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "4px 8px",
  },
  editTitleWrap: {
    display: "flex",
  },
});

const TodoModalTitle = (props) => {
  const classes = useStyles();

  // props
  const { id, text, editing, handleChangeTodoAttribute } = props;

  // context
  const [todos, setTodos] = useContext(BoardContext);

  // state
  const [inputText, setInputText] = useState(text);

  // 入力されたテキストをstateに保存
  const handleChangeTodoText = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  // タスクのテキストを更新する
  const handleClickUpdate = useCallback(
    (e, id, text) => {
      e.preventDefault();
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text,
            editing: false,
          };
        }
        return todo;
      });
      setTodos(newTodos);
    },
    [todos, setTodos]
  );
  return (
    <div className={classes.title}>
      {!editing ? (
        <div
          className={classes.titleWrap}
          onClick={() => handleChangeTodoAttribute(id, "editing", !editing)}
        >
          <EditIcon className={classes.editIcon} />
          <MuiTypography
            typography={inputText}
            color="#333"
            component="p"
            variant="h5"
          />
        </div>
      ) : (
        <form
          className={classes.editTitleWrap}
          onSubmit={(e) => handleClickUpdate(e, id, inputText)}
        >
          <MuiTextField
            value={inputText}
            variant="outlined"
            fullWidth={true}
            onChange={handleChangeTodoText}
          />
          <MuiButton
            margin={"0 0 0 8px"}
            text="更新"
            variant="outlined"
            backgroundColor="#009688"
            hoveredBgColor="#33ab9f"
            color="#fff"
            onClick={(e) => handleClickUpdate(e, id, inputText)}
          />
        </form>
      )}
    </div>
  );
};

export default TodoModalTitle;
