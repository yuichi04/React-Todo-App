import React, { useState, useCallback, useContext } from "react";
import { BoardContext } from "../../../contexts";
import { MuiTextField, MuiButton, MuiTypography } from "../../UIkit";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  typWrap: {
    padding: 8,
    marginBottom: 16,
    cursor: "pointer",
  },
  btnWrap: {
    marginTop: 8,
  },
  editMemo: {
    cursor: "pointer",
    marginBottom: 16,
    padding: "8px 16px",
    height: 200,
    overflow: "scroll",
  },
});

const TodoModalMemo = (props) => {
  const classes = useStyles();
  // props
  const { id, memoText } = props;
  // context
  const [todos, setTodos] = useContext(BoardContext);
  // state
  const [inputMemo, setInputMemo] = useState(memoText);
  const [editing, setEditing] = useState(false);

  // メモの入力
  const handleChangeMemo = useCallback((e) => {
    setInputMemo(e.target.value);
  }, []);

  // メモの入力欄を表示する
  const AddMemo = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  //　メモの編集内容を破棄して入力をキャンセルする
  const inputCancel = useCallback(() => {
    setInputMemo(memoText);
    setEditing(!editing);
  }, [editing, memoText]);

  // メモを更新する
  const updateMemo = useCallback(() => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          memo: {
            ...todo.memo,
            text: inputMemo,
          },
        };
      }
      return todo;
    });
    setTodos(newTodos);
    setEditing(false);
  }, [id, todos, setTodos, inputMemo]);

  return (
    <div>
      {editing ? (
        <div>
          <MuiTextField
            multiline={true}
            rows={10}
            margin="dense"
            fullWidth={true}
            value={inputMemo}
            variant="outlined"
            onChange={handleChangeMemo}
            placeholder="ここにメモを入力"
          />
          <div className={classes.btnWrap}>
            <MuiButton
              text="保存"
              variant="outlined"
              onClick={updateMemo}
              backgroundColor="#009688"
              hoveredBgColor="#33ab9f"
              color="#fff"
              margin="0 8px 0 0"
            />
            <MuiButton text="戻る" variant="outlined" onClick={inputCancel} />
          </div>
        </div>
      ) : inputMemo ? (
        <div onClick={AddMemo} className={classes.editMemo}>
          <MuiTypography
            component="p"
            whiteSpace="pre-wrap"
            typography={memoText}
          />
        </div>
      ) : (
        <MuiButton
          text="メモを追加する"
          variant="outlined"
          onClick={AddMemo}
          backgroundColor="#009688"
          hoveredBgColor="#33ab9f"
          color="#fff"
        />
      )}
    </div>
  );
};

export default TodoModalMemo;
