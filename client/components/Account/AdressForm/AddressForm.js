import React, { useState } from 'react';
import { Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import { createAddressApi, updateAddressesApi } from '../../../api/address';

export default function AddressForm({setShowModal, setReloadAddresses, address, newAddress}) {
  const [loading, setLoading] = useState(false);

  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues : initialValues(address),
    validationSchema : Yup.object(validationSchema()),
    onSubmit : async (formData) => {
      const formDataTemp = {
        ...formData,
        user : auth.idUser
      }
      newAddress 
        ? createAddress(formDataTemp) 
        : updateAddress(formDataTemp);

    }
  });

  const createAddress = async(formDataTemp) => {
    setLoading(true);
    const response = await createAddressApi(formDataTemp, logout);

    if(!response){
      toast.warning("Error al crear la direccion")
    }else{
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
      toast.success("Direccion Creada correctamente")
    } 
    setLoading(false);
  }

  const updateAddress = async(formDataTemp) => {
    setLoading(true);
    console.log(formDataTemp);
    const response = await updateAddressesApi(address.id, formDataTemp, logout);

    console.log(response);
    
    if(!response){
      toast.warning("Error al actualizar la direccion")
    }else{
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
      toast.success("Direccion Creada correctamente")
    } 
    setLoading(false);
  }



  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Titulo de la direccion"
        placeholder="Titulo de la direccion"
        onChange={formik.handleChange} value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellidos"
          placeholder="Nombre y apellidos"
          onChange={formik.handleChange} value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Direccion"
          placeholder="Direccion"
          onChange={formik.handleChange} value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange} value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado/provincia/Region"
          placeholder="Estado/provincia/Region"
          onChange={formik.handleChange} value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Cogigo Postal"
          placeholder="Cogigo Postal"
          onChange={formik.handleChange} value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Numero de telefono"
          placeholder="Numero de telefono"
          onChange={formik.handleChange} value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear direccion" : "Actualizar direccion"}
        </Button>
      </div>
    </Form>
  )
}



function initialValues(address){
  return {
    title : address?.title || "",
    name : address?.name || "",
    address : address?.address || "",
    city : address?.city || "",
    state : address?.state || "",
    postalCode : address?.postalCode || "",
    phone : address?.phone || "",
  }
}

function validationSchema() {
  return {
    title : Yup.string().required(true),
    name : Yup.string().required(true),
    address : Yup.string().required(true),
    city : Yup.string().required(true),
    state : Yup.string().required(true),
    postalCode : Yup.string().required(true),
    phone : Yup.string().required(true),
  }
}