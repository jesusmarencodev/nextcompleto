import React, { useState, useEffect } from 'react';
import { deleteAddressesApi, getAddressesApi } from '../../../api/address';
import { Grid, Button} from 'semantic-ui-react';
import { useAuth } from '../../../hooks/useAuth';
import { map, size} from "lodash";

export default function ListAddress({reloadAddresses, setReloadAddresses, openModal}) {
  const [addresses, setAddresses] = useState(null);

  const { logout, auth } = useAuth();


  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if(!addresses) return null;


  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay direcciones creadas</h3>
      ):(
        <Grid>
          {map(addresses, (address)=>(
            <Grid.Column
              key={address.id}
              mobile={16}
              tablet={8}
              computer={4}
            >
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  )
}

function Address({address, logout, setReloadAddresses, openModal}){

  const [loadingDelete, setloaDingDelete] = useState(false)

  const deleteAddresses = async ()  => {
    setloaDingDelete(true);
    const response = await deleteAddressesApi(address.id, logout);
    if(response) setReloadAddresses(true);
    setloaDingDelete(false);
  }

  return(
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <div className="actions">
        <Button primary onClick={()=>openModal(`Editar: ${address.title}`, address)}>Editar</Button>
        <Button onClick={deleteAddresses} loading={loadingDelete}>Eliminar</Button>
      </div>
    </div>
  )
}
