import React, { useState } from 'react';
import { useAuth } from "../../../hooks/useAuth";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from '../../../api/user';

export default function ChangePasswordForm({user}) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData);
      setLoading(true);
      const response = await updatePasswordApi(user.id, formData.password, logout);
      if(!response){
        toast.error("Error al actualizar el password")
      }else{
        logout();
      } 
    },
  });

  return (
    <div className="change-password-form">
      <h4>
        Cambia tu Contraseña
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            placeholder="Escribe tu nueva contraseña"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            placeholder="Confirma tu contraseña"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>Actualizar</Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], "El password no es el mismo"),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], "El password no es el mismo"),
  };
}
