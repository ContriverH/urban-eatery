// user this form to create a register
// update register
import React from "react";
import { useForm } from "react-hook-form";
import "./productform.css";
import { useState } from "react";
import axios from "axios";

export default function UpdateRestaurant(props) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken_foodie"),
    },
  };

  const { register, handleSubmit, watch, errors } = useForm();
  const [submitted, setsubmitted] = useState(false);
  const { _id, name, address, phoneNumber } = props.restaurant;

  const onSubmit = async (register) => {
    console.log(register);
    const { name, address, phoneNumber } = register;
    if (register.name) register.name = name;
    if (register.address) register.address = address;
    if (register.phoneNumber) register.phoneNumber = phoneNumber;
    if (_id !== undefined) {
      const url = `http://localhost:3001/api/v1/restaurant/updateRestaurant/${_id}`;
      axios
        .patch(url, register, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            setsubmitted(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <form className="p-5 overflow-auto" onSubmit={handleSubmit(onSubmit)}>
      <div class="form-group">
        <label for="restaurant-name">Restaurant Name</label>
        <input
          type="text"
          class="form-control"
          id="restaurant-name"
          name="name"
          placeholder={name}
          ref={register}
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <textarea
          class="form-control"
          id="address"
          rows="2"
          name="address"
          placeholder={address}
          ref={register}
        ></textarea>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="phone"
          class="form-control"
          id="phoneNumber"
          name="phoneNumber"
          ref={register}
          placeholder={phoneNumber}
        />
      </div>
      <button type="button btn-lg" class="btn btn-outline-warning">
        Update Restaurant
      </button>
      {submitted == true ? <h2>Successfully Updated</h2> : <div />}
    </form>
  );
}
