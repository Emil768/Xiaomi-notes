import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { modalInfoClose } from "../redux/actions/modalInfo";
function ModalInfo() {
  let [noteValue, setNoteValue] = useState([]);
  //redux
  let dispatch = useDispatch();
  let modalInfoActive = useSelector((state) => state.modalInfo.active);
  let index = useSelector((state) => state.modalInfo.index);
  //
  useEffect(() => {
    document.body.addEventListener("click", handlerClickBody);
    axios
      .get("https://xioami-notes.herokuapp.com/notes")
      .then((res) => setNoteValue(res.data.notes))
      .then(noteValue[index] ? setNewValue(noteValue[index].text) : "no")
      .then(
        noteValue[index] ? setValueLength(noteValue[index].text.length) : "no"
      )
      .then(noteValue[index] ? setNoteId(noteValue[index].id) : "no");
  }, [index]);

  //GetNewValue
  let [newValue, setNewValue] = useState("");
  let [noteId, setNoteId] = useState("");
  let [valueLength, setValueLength] = useState("");
  let [checkValueLength, setCheckValueLength] = useState(false);

  //

  //func
  let closeModalInfo = () => {
    if (document.querySelector(".modal__input-info")) {
      document.querySelector(".modal__input-info").value = "";
      dispatch(modalInfoClose());
      setCheckValueLength(false);
    } else {
      console.log("no");
    }
  };

  let handlerClickBody = (event) => {
    let path = event.path;
    if (!path.includes(modalContentInfo.current)) {
      closeModalInfo();
    }
  };

  let handlerClick = (e) => {
    setValueLength(e.target.value.length);
    setCheckValueLength(true);
    setNewValue(e.target.value);
  };

  let onUpdateNote = () => {
    axios.put("https://xioami-notes.herokuapp.com/notes/update", {
      id: noteId,
      text: newValue,
    });
    window.location.reload();
  };

  let onDeleteNote = () => {
    let confirm = window.confirm("Вы точно хотите удалить заметку?");
    if (confirm) {
      axios.delete(`https://xioami-notes.herokuapp.com/notes/delete/${noteId}`);
      closeModalInfo();
      window.location.reload();
    } else {
      console.log("no");
    }
  };

  //
  let modalContentInfo = useRef();
  return (
    <div
      className={
        modalInfoActive ? "modal modal-info active" : "modal modal-info"
      }
    >
      <div
        ref={modalContentInfo}
        className="modal__content modal__content-info"
      >
        <div className="modal__header">
          <i
            onClick={closeModalInfo}
            className="fa fa-arrow-left"
            aria-hidden="true"
          >
            ⟶
          </i>

          <i
            onClick={onUpdateNote}
            className={checkValueLength ? "fa fa-check active" : "fa fa-check"}
            aria-hidden="true"
          >
            ✔
          </i>
          <i onClick={onDeleteNote} className="fa fa-times" aria-hidden="true">
            ✖
          </i>
        </div>
        <div className="modal__info">{valueLength} символов</div>
        <div className="modal__body">
          <textarea
            className="modal__input modal__input-info"
            cols="30"
            rows="10"
            autoFocus
            name="noteValue"
            value={newValue}
            onChange={handlerClick}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default ModalInfo;
