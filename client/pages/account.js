import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layout/BasicLayout/BasicLayout";
import { useAuth } from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import { Icon } from "semantic-ui-react";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AdressForm";
import ListAddress from "../components/Account/ListAddress/ListAddress";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
  <BasicLayout className="account">
    <Configuration user={user} setReloadUser={setReloadUser} />
    <Addresses/>
  </BasicLayout>
  ) 
}

function Configuration({user, setReloadUser}) {
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm user={user} setReloadUser={setReloadUser} />
        <ChangeEmailForm user={user} setReloadUser={setReloadUser}  />
        <ChangePasswordForm user={user} />
      </div>
    </div>
  );
}
function Addresses(){
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(<AddressForm
                    setShowModal={setShowModal}
                    setReloadAddresses={setReloadAddresses}
                    newAddress={address ? false : true}
                    address={address || null}
                />)
    setShowModal(true);
  }

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={()=>openModal("Nueva dirección")} />
      </div>
      <div className="data">
        <ListAddress
          setReloadAddresses={setReloadAddresses}
          reloadAddresses={reloadAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
      >
      { formModal }
      </BasicModal>
 
    </div>
  )
}