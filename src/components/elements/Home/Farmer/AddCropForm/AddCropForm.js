import React, { useState } from "react";
import firebase from "firebase";
import { nanoid } from "nanoid";

import useInput from "hooks/use-input";
import styles from "./AddCropForm.module.css";

const AddCropForm = (props) => {
  const [isFormSubmitted, setFormIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let formIsValid = false;

  const {
    inputValue: cropName,
    isValid: cropNameIsValid,
    hasError: cropNameHasError,
    onChange: onCropNameChange,
    onBlur: onCropNameBlur,
    onReset: onCropNameReset,
  } = useInput((value) => value.length > 0);
  const {
    inputValue: quantity,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    onChange: onQuantityChange,
    onBlur: onQuantityBlur,
    onReset: onQuantityReset,
  } = useInput((value) => parseFloat(value) > 0);
  const {
    inputValue: price,
    isValid: priceIsValid,
    hasError: priceHasError,
    onChange: onPriceChange,
    onBlur: onPriceBlur,
    onReset: onPriceReset,
  } = useInput((value) => parseFloat(value) > 0);

  formIsValid = !cropNameHasError && !quantityHasError && !priceHasError;

  const addCrop = (cropID) => {
    setIsLoading(true);
    firebase
      .database()
      .ref(`products/${cropID}/`)
      .set({
        crop_name: cropName,
        quantity: quantity,
        price: price,
        farmer_name: props.farmer.displayName,
        farmer_email: props.farmer.email,
      })
      .then(() => {
        setIsLoading(false);
        onCropNameReset();
        onQuantityReset();
        onPriceReset();
        props.onClose();
        props.onSuccess();
      })
      .catch((error) => {
        setIsLoading(false);
        alert(`An error occurred: ${error.code}\n${error.message}`);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFormIsSubmitted(true);

    onCropNameBlur();
    onQuantityBlur();
    onPriceBlur();

    if (!formIsValid || !cropNameIsValid || !quantityIsValid || !priceIsValid) {
      return;
    }

    const cropID = nanoid();
    addCrop(cropID);
  };

  return (
    <section className="p-2">
      <h3>Add crop</h3>
      <form
        onSubmit={submitHandler}
        className={
          "needs-validation" + formIsValid && isFormSubmitted
            ? "was-validated"
            : ""
        }
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="crop_name" className="form-label">
            Crop name
          </label>
          <input
            type="text"
            className="form-control"
            id="crop_name"
            value={cropName}
            onChange={onCropNameChange}
            onBlur={onCropNameBlur}
            required
          />
          {cropNameHasError && (
            <div className="invalid-feedback">Kindly provide a crop name.</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity (kg)
          </label>
          <input
            type="number"
            min="0"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={onQuantityChange}
            onBlur={onQuantityBlur}
            required
          />
          {quantityHasError && (
            <div className="invalid-feedback">
              Kindly provide a valid quantity (in kg).
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price (&#8377;/kg)
          </label>
          <input
            type="number"
            min="0"
            className="form-control"
            id="price"
            value={price}
            onChange={onPriceChange}
            onBlur={onPriceBlur}
            required
          />
          {priceHasError && (
            <div className="invalid-feedback">
              Kindly provide a valid price.
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={props.onClose}
          >
            Close
          </button>
          <button type="submit" className="btn btn-success">
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Add crop
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCropForm;
