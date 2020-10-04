import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "../redux/actions/modal";
function Modal() {
  //state
  let [value, setValue] = useState("");
  let [activeValue, setActiveValue] = useState(false);
  let [valueLength, setValueLength] = useState(0);
  //

  //redux
  let dispatch = useDispatch();
  let modalActive = useSelector((state) => state.modal.active);

  //

  //fun
  let addNotes = () => {
    axios.post("http://localhost:3001/notes/add", {
      text: value,
    });
    closeModal();
    window.location.reload();
  };

  let checkValue = (event) => {
    setValue(event.target.value);
    setValueLength(event.target.value.length);
    event.target.value.length >= 1
      ? setActiveValue(true)
      : setActiveValue(false);
  };

  let closeModal = () => {
    if (document.querySelector(".modal__input")) {
      document.querySelector(".modal__input").value = "";
      setValueLength(0);
      setActiveValue(false);
      dispatch(modalClose());
    } else {
      console.log("no");
    }
  };

  let handlerClickBody = (event) => {
    let path = event.path;
    if (!path.includes(modalContent.current)) {
      closeModal();
    }
  };
  //

  useEffect(() => {
    document.body.addEventListener("click", handlerClickBody);
  }, []);

  let modalContent = useRef();
  return (
    <div className={modalActive ? "modal active" : "modal"}>
      <div ref={modalContent} className="modal__content">
        <div className="modal__header">
          <i
            onClick={closeModal}
            className="fa fa-arrow-left"
            aria-hidden="true"
          >
            ⟶
          </i>
          <i
            onClick={addNotes}
            className={activeValue ? "fa fa-check active-modal" : "fa fa-check"}
            aria-hidden="true"
          >
            ✔
          </i>
        </div>
        <div className="modal__info">{valueLength} символов</div>
        <div className="modal__body">
          <textarea
            onChange={checkValue}
            className="modal__input"
            cols="30"
            rows="10"
            autoFocus
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Modal;
