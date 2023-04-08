import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import * as Icon from "react-feather";
import "./style.css";
const ImageCard = ({ data }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const toggleModal = (item) => {
    debugger;
    setSelectedImage(item);
    setIsOpenModal(!isOpenModal);
  };
  const downloadImage = async (imageName) => {
    const response = await fetch(require(`../assets/${imageName}`));
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  function resizeImage(url) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.5); // Kaliteyi buradan ayarlayabilirsiniz.
      link.click();
    };
    img.src = url;
  }
  return (
    <>
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              className="d-flex justify-content-center align-items-center"
            >
              <CardHeader>
                <h6>{item.name}</h6>
              </CardHeader>
              <CardBody>
                <img
                  id="image-local"
                  src={require(`../assets/${item.image}`)}
                  width="100%"
                  height={100}
                  onClick={() => toggleModal(item)}
                />
              </CardBody>
              <CardFooter className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  style={{ fontSize: 12 }}
                  onClick={() => downloadImage(item.image)}
                >
                  <Icon.Download size={15} />
                  <span>Yüksek Çözünürlük</span>
                </button>
                <button
                  className="btn btn-dark"
                  style={{ fontSize: 12 }}
                  onClick={() =>
                    resizeImage(require(`../assets/${item.image}`))
                  }
                >
                  <Icon.Download size={15} />
                  <span>Düşük Çözünürlük</span>
                </button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          toggle={() => setIsOpenModal(!isOpenModal)}
          centered
          modalClassName="modal-xl"
          style={{ maxWidth: 800 }}
        >
          <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
            {selectedImage.name}
          </ModalHeader>
          <ModalBody className="d-flex justify-content-center">
            <img
              src={require(`../assets/${selectedImage.image}`)}
              width={"100%"}
              height={"auto"}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default ImageCard;
