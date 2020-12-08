import React, { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import Modal from "./Modal";
import axios from "axios";
import ModalInfo from "./ModalInfo";
import { useDispatch, useSelector } from "react-redux";
import { modalActive } from "../redux/actions/modal";
function Content() {
  let dispatch = useDispatch();
  let openModal = () => {
    dispatch(modalActive());
  };
  let [notesValue, setNotesValue] = useState([]);
  let searchText = useSelector((state) => state.search.searchText);

  useEffect(() => {
    axios
      .get("https://xioami-notes.herokuapp.com/notes")
      .then((res) => setNotesValue(res.data.notes));
  }, []);

  let emptyNotes = "Список заметок пуст!";
  // let filterNotes = notesValue.filter((note) => {
  //   return note.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  // });

  return (
    <div className="App__content">
      <ul className="menu">
        {notesValue.length ? (
          filterNotes.map((note, index) => {
            return <ContentCard key={note.id} text={note.text} index={index} />;
          })
        ) : (
          <h1>{emptyNotes}</h1>
        )}
      </ul>
      <i onClick={openModal} className="fa fa-plus" aria-hidden="true">
        &#10010;
      </i>
      <Modal />
      <ModalInfo />
    </div>
  );
}

export default Content;
