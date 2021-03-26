import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../Modal/BasicModal";

export default function OrderBuy({ order }) {
  const { game, totalPayment, createdAt, addressShipping } = order;

  const [showModal, setShowModal] = useState(false);

  const { title, poster, url } = game;

  return (
    <>
      <div className="orderBuy">
        <div className="orderBuy__info">
          <div className="orderBuy__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{totalPayment}$</p>
            </div>
          </div>
        </div>
        <div className="orderBuy__other">
          <p className="orderBuy__other-date">
            {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
          </p>
          <Icon
            name="eye"
            circular
            link
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title}
      />
    </>
  );
}

function AddressModal({ showModal, setShowModal, addressShipping, title }) {
  console.log(addressShipping);
  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente direccion</h3>
      <div>
        <p>{addressShipping.name}</p>
        <p>{addressShipping.address}</p>
        <p>{addressShipping.state}, {addressShipping.city}, {addressShipping.postalCode} </p>
        <p>{addressShipping.phone}</p>
      </div>
    </BasicModal>
  );
}
