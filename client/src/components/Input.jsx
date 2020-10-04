import React from "react";
import { useDispatch } from "react-redux";
import { searchText } from "../redux/actions/search";
function Input() {
  let dispatch = useDispatch();
  let onSearchText = (e) => {
    dispatch(searchText(e.target.value));
  };
  return (
    <input
      onChange={onSearchText}
      className="App__form"
      type="text"
      placeholder="Поиск заметок"
    />
  );
}

export default Input;
