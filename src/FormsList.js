import React, { useState, useEffect } from "react";
import FormListItem from "./FormListItem";
import ScrollFab from "./ScrollToTopFab";
import "./FormList.css";
import Axios from "axios";

const fetchForms = (setForms) => {
  Axios.get("https://form-app-backend.herokuapp.com/api/forms")
    .then((res) => setForms(res.data))
    .catch((err) => alert(JSON.stringify(err)));
};

function FormsList() {
  const [forms, setForms] = useState([]);
  useEffect(() => fetchForms(setForms), []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex list-header">
        <div>شماره‌ی فرم</div>
        <div>عنوان</div>
      </div>
      {forms.map((form) => {
        return <FormListItem form={form} />;
      })}
      <ScrollFab />
    </div>
  );
}
export default FormsList;
