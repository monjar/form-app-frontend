import React from "react";
import { Link } from "react-router-dom";
import "./FormListItem.css";
export default function FormListItem(props) {
  return (
    <Link
      className="d-flex list-item-container list-item-color"
      to={"/" + props.form.id}
    >
      <div>{props.form.id}</div>
      <div>{props.form.title}</div>
    </Link>
  );
}
