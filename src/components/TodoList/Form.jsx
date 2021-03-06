import React, { useState, useContext, useCallback } from "react";
import { BoardContext } from "../../contexts";
import { MuiButton, MuiTextField } from "../UIkit";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
});

const Form = (props) => {
  const classes = useStyles(props);
  const [todos, setTodos] = useContext(BoardContext);
  const [inputTodo, setInputTodo] = useState("");

  const generateStr = () => {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 32;
    const str =
      new Date().getTime().toString(16) +
      Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
    return str;
  };

  const handleChangeTodoText = useCallback((e) => {
    setInputTodo(e.target.value);
  }, []);

  const handleClickCreateTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputTodo) return;
      const id = generateStr();
      const newTodo = {
        id: id,
        text: inputTodo,
        editing: false,
        complete: false,
        memo: {
          text: "",
          editing: false,
        },
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setInputTodo("");
    },
    [todos, inputTodo, setTodos]
  );

  return (
    <form className={classes.form} onSubmit={handleClickCreateTodo}>
      <MuiTextField
        label="タスクを入力"
        variant="outlined"
        margin="dense"
        fullWidth={true}
        value={inputTodo}
        onChange={handleChangeTodoText}
      />
      <MuiButton
        variant="contained"
        text="追加"
        backgroundColor="#009688"
        hoveredBgColor="#33ab9f"
        color="#fff"
        onClick={handleClickCreateTodo}
        margin={"0 0 0 8px"}
      />
    </form>
  );
};

export default Form;
