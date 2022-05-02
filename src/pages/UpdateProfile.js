import withAuth from "../guards/with-auth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "firebase/app";
import "firebase/database";
import Modal from "../components/UI/Modal/Modal";
import UpdateProfileForm from "../components/forms/UpdateProfileForm";

const UpdateProfile = () => {
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ status: "", message: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user.data);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      category: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      category: Yup.string().required("Please select a category"),
      address: Yup.string().required(
        "Address can't be empty. Kindly provide your address."
      ),
      phone: Yup.string()
        .length(10, "Enter a valid phone number (consisting of 10 digits.)")
        .required("Phone number is required."),
    }),
    onSubmit: (values) => {
      firebase
        .database()
        .ref("users/" + user.uid)
        .set(values)
        .then(() => {
          setFormTouched(false);
          setIsSubmitting(false);
          setStatus({
            status: "Success",
            message: "Changes saved successfully!"
          });
          setModalOpen(true);
        })
        .catch((error) => {
          setFormTouched(false);
          setIsSubmitting(false);
          setStatus({
            status: "Error",
            message: error.message
          });
          setModalOpen(true);
        });
    },
  });

  useEffect(() => {
    formik.setValues({
      name: user.name ? user.name : "",
      email: user.email ? user.email : "",
      category: user.category ? user.category : "",
      address: user.address ? user.address : "",
      phone: user.phone ? user.phone : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mt-4" id="info">
      <h1 id="highlight" className="mb-4">
        Edit profile
      </h1>
      <UpdateProfileForm 
        formTouched={formTouched}
        formik={formik}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        setFormTouched={setFormTouched}
      />
      {modalOpen && (
        <Modal onClose={closeModalHandler}>
          <div className="card text-center">
            <div className="card-header">{status.status}</div>
            <div className="card-body">
              <div className="card-text display-1 text-success">
                <i className="far fa-check-circle"></i>
              </div>
              <h5 className="card-title mb-4">{status.message}</h5>
              <button
                onClick={closeModalHandler}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default withAuth(UpdateProfile);
