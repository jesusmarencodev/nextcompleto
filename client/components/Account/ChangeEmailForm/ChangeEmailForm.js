import React, { useState } from 'react';
import { useAuth } from "../../../hooks/useAuth";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from '../../../api/user';

export default function ChangeEmailForm({ user, setReloadUser }) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData);
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if(!response){
        toast.error("Error al actualizar el nombre y apellido")
      }else{
        setLoading(false);
        setReloadUser(true);
        toast.success("Email actualizado correctamente");
        formik.handleReset();
      } 
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambia tu email
        <span>(Tu e-mail actual: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Tu numero e-mail"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>Actualizar</Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], "El email no es el mismo"),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], "El email no es el mismo"),
  };
}
