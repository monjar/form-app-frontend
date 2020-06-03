import React, { useState, useEffect } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import FormBodyItem from "./FormBodyItem";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "./FormBody.css";
import Axios from "axios";

function FormBody(props) {
  const fields = props.fields ? props.fields : [];
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [initiLocation, setInitiLocation] = useState({
    lat: 35.80209937653889,
    lng: 51.3935485060881,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInitiLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err)
    );
  }, []);

  const mapOnClick = (index, required) => {
    return (t, map, coord) => {
      const lat = coord.latLng.lat();
      const lng = coord.latLng.lng();
      let obj = { ...values };
      obj[index] = { lat, lng };
      setValues(obj);
    };
  };
  const updateValue = (index, required) => {
    return (e) => {
      checkforError(index, required)(e);
      const v = e.target ? e.target.value : e;

      let obj = { ...values };
      obj[index] = v;
      setValues(obj);
    };
  };
  const checkforError = (index, required) => {
    return (e) => {
      const v = e.target ? e.target.value : e;
      let errObj = { ...errors };
      errObj[index] = required && (!v || v === "");
      setErrors(errObj);
      return errObj[index];
    };
  };
  const handleSubmit = () => {
    let isOk = true;
    let errObj = { ...errors };
    fields.forEach((key, index) => {
      errObj[index] =
        fields[index].required && (!values[index] || values[index] === "");

      isOk = isOk ? !errObj[index] : isOk;
    });
    setErrors(errObj);
    if (isOk) {
      const dataList = Object.keys(values).map((key, index) => {
        return { name: fields[key].name, value: values[key] };
      });
      const data = {};
      data["FormId"] = props.formId;
      data["Fields"] = dataList;
      console.log(JSON.stringify(data));
      Axios.post("http://localhost:8080/api/post_form", data).then(() => {
        alert("SENT!");
      });
    } else alert("ERROR");
  };
  return (
    <div className="d-flex flex-column  p-5 m-3 form-container">
      {fields.map((field, index) => {
        return (
          <FormBodyItem
            index={index}
            value={values[index]}
            error={errors[index]}
            field={field}
            updateValue={updateValue}
            checkforError={checkforError}
            mapOnClick={mapOnClick}
            initiLocation={initiLocation}
            google={props.google}
          />
        );
      })}

      <div className="d-flex justify-content-center">
        <button className="submit-button" onClick={handleSubmit}>
          ثبت
        </button>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28",
})(FormBody);
