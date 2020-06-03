import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormBody from "./FormBody";
import "./FormPage.css";
import "./FormList.css";
import Axios from "axios";

const fetchForm = (setForm, formId) => {
  Axios.get("https://form-app-backend.herokuapp.com/api/forms/" + formId)
    .then((res) => setForm(res.data))
    .catch((err) => alert(JSON.stringify(err)));
};

export default function FormPage() {
  const { formId } = useParams();
  const [form, setForm] = useState([]);
  useEffect(() => fetchForm(setForm, formId), []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex list-header">
        <div>{form.id}</div>
        <div>{form.title}</div>
      </div>
      <div className="d-flex flex-column m-3 p-3 justify-content-center align-items-center form-card-back">
        <div style={{ width: "100%" }}>
          <FormBody fields={form.fields} formId={form.id} />
        </div>
      </div>
    </div>
  );
}
