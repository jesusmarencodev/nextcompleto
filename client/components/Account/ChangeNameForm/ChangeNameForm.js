import React, { useState } from 'react';
import { Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateNameApi } from '../../../api/user';
import { useAuth } from '../../../hooks/useAuth';

export default function ChangeNameForm({user, setReloadUser}) {

  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();



  const formik = useFormik({
    initialValues : initialValues(user.name, user.lastname),
    validationSchema : Yup.object(validationSchema()),
    onSubmit : async (formData) => {
      setLoading(true);
      const response = await updateNameApi(user.id, formData, logout);
      if(!response){
        toast.error("Error al actualizar el nombre y apellido")
      }else{
        setLoading(false);
        setReloadUser(true);
        toast.success("Nombre y apellido actualizados")
      }
    }
  });

  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre y apellido</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input name="name"  placeholder="Tu nuevo nombre" 
                      onChange={formik.handleChange} value={formik.values.name}
                      error={formik.errors.name}
          />
          <Form.Input name="lastname" placeholder="Tus nuevos apellidos"
                      onChange={formik.handleChange} value={formik.values.lastname}
                      error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  )
}


function initialValues(name, lastname){
  return {
    name : name || "",
    lastname : lastname || ""
  }
}

function validationSchema() {
  return {
    name : Yup.string().required(true),
    lastname : Yup.string().required(true),
  }
}