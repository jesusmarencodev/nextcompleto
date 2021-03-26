import React, { useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import { getAddressesApi } from "../../../api/address";
import { useAuth } from "../../../hooks/useAuth";
import classNames from "classnames";

export default function AddressShipping({ setAddress }) {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  const [addressActive, setAddressActive] = useState(null);


  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Direccion de envio</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna direccion creada
            <Link href="/account">
              <a>Añade tu primera direccion </a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (item) => (
              <Grid.Column key={item.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={item}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address({ address, addressActive, setAddressActive, setAddress }) {
  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
