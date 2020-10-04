import React from "react";
import { useDispatch } from "react-redux";
import { modalInfoActive } from "../redux/actions/modalInfo";
function ContentCard({ text, index }) {
  let dispacth = useDispatch();
  let openModalInfo = () => {
    dispacth(modalInfoActive(index));
  };
  return (
    <li onClick={openModalInfo} className="menu__item">
      {text}
    </li>
  );
}

export default ContentCard;
