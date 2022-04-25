import { useState } from "react";

const UpdateProfileForm = ({
  setFormTouched,
  formik,
  formTouched,
  isSubmitting,
  setIsSubmitting
}) => {
  const [submitTouched, setSubmitTouched] = useState(false);
  return (
    <form
        onFocus={() => {
          setFormTouched(true);
        }}
        onSubmit={formik.handleSubmit}
        noValidate
        className={
          "needs-validation" +
          (formTouched && isSubmitting ? " was-validated" : "")
        }
      >
        <div className="row mb-3">
          <label htmlFor="name-input" className="col-sm-2 col-form-label">
            <strong>Name</strong>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name-input"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
            <div className="invalid-feedback">{formik.errors.name}</div>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="email-input" className="col-sm-2 col-form-label">
            <strong>E-mail</strong>
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email-input"
              name="email"
              value={formik.values.email}
              disabled
              readOnly={true}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="phone-input" className="col-sm-2 col-form-label">
            <strong>Phone number</strong>
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="phone-input"
              name="phone"
              minLength={10}
              maxLength={10}
              value={formik.values.phone}
              onChange={formik.handleChange}
              required
            />
            <div className="invalid-feedback">{formik.errors.phone}</div>
          </div>
        </div>
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">
            <strong>Category</strong>
          </legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="radio-farmer"
                value="farmer"
                checked={formik.values.category === "farmer"}
                onChange={formik.handleChange}
                required
              />
              <label className="form-check-label" htmlFor="radio-farmer">
                Farmer
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="radio-consumer"
                value="consumer"
                checked={formik.values.category === "consumer"}
                onChange={formik.handleChange}
              />
              <label className="form-check-label" htmlFor="radio-consumer">
                Consumer
              </label>
              <div className="invalid-feedback">{formik.errors.category}</div>
            </div>
          </div>
        </fieldset>
        <div className="row mb-3">
          <label htmlFor="address-input" className="col-sm-2 col-form-label">
            <strong>Address</strong>
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              row="3"
              id="address-input"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              required
            ></textarea>
            <div className="invalid-feedback">{formik.errors.address}</div>
          </div>
        </div>
        <button
          onClick={() => {
            setIsSubmitting(true);
            if (formik.isValid) {
              setSubmitTouched(true);
            }
          }}
          type="submit"
          className="btn btn-success"
        >
          {submitTouched && isSubmitting && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {submitTouched && isSubmitting ? " Saving" : "Save Changes"}
        </button>
      </form>
  )
}

export default UpdateProfileForm;