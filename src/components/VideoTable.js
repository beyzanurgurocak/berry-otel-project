import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Table, Button } from "reactstrap";
import * as Icon from "react-feather";
import JSZip from "jszip";
const VideoTable = ({ data }) => {
  const [allData, setAllData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const toggleModal = (item) => {
    console.log(item);
    setSelectedVideo(item.video_files[0]);
    setIsOpenModal(!isOpenModal);
  };
  useEffect(() => {
    debugger;
    setAllData(data);
  }, [data]);
  const downloadVideos = (urls) => {
    if (!Array.isArray(urls)) {
      urls = [urls];
    }

    setIsLoading(true);
    const a = document.createElement("a");
    document.body.appendChild(a);

    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.blob()))
    ).then((blobs) => {
      const zip = new JSZip();
      blobs.forEach((blob, i) => {
        zip.file(`video${i}.mp4`, blob);
      });
      zip.generateAsync({ type: "blob" }).then((zipBlob) => {
        const url = window.URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "videos.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setIsLoading(false);
      });
    });
  };

  const handleAllChecked = (e) => {
    debugger;
    const checkedAllData = allData.map((item) => {
      return {
        ...item,
        isChecked: e.target.checked,
      };
    });
    setAllData(checkedAllData);
    if (e.target.checked) setSelectedItems(checkedAllData);
    else setSelectedItems([]);
  };
  const handleChecked = (e, id) => {
    debugger;
    const newArr = allData.filter((x) => {
      if (x.id === id) x.isChecked = e.target.checked;
      return x;
    });
    const findItem = allData.find((x) => x.id === id);
    setAllData(newArr);
    if (e.target.checked) {
      const newSelectedItems = [...selectedItems, findItem];
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems(
        selectedItems.filter((x) => {
          return x.id !== id;
        })
      );
    }
  };
  if (isLoading) {
    return (
      <div className="w-100 d-flex justify-content-center">
        <h3>Downloading...</h3>
      </div>
    );
  }
  const downloadSelectedItems = async () => {
    const newUrlList = [];
    selectedItems.map((item) => {
      newUrlList.push(item.video_files[0].link);
    });
    downloadVideos(newUrlList);
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onClick={(e) => handleAllChecked(e)} />
            </th>
            <th>Bilgiler</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={item.isChecked}
                  checked={item.isChecked}
                  onClick={(e) => handleChecked(e, item.id)}
                />
              </td>
              <td>{item.url}</td>
              <td className="d-flex gap-3">
                <Icon.Play size={15} onClick={() => toggleModal(item)} />
                <Icon.Download
                  size={15}
                  onClick={() => downloadVideos(item.video_files[0].link)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      {selectedItems.length > 0 && (
        <div className="w-100">
          <Button color="warning" onClick={downloadSelectedItems}>
            Seçilenleri İndir
          </Button>
          {selectedItems.map((item, index) => {
            return (
              <div key={index}>
                <span>Id : {item.id}</span>
                <span>Name : {item.url}</span>
              </div>
            );
          })}
        </div>
      )}
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          toggle={() => setIsOpenModal(!isOpenModal)}
          centered
          modalClassName="modal-lg"
          style={{ maxWidth: 600 }}
        >
          <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
            <strong>
              {selectedVideo.id} - {selectedVideo.quality}
            </strong>
          </ModalHeader>
          <ModalBody className="d-flex justify-content-center">
            <video
              controls
              width={"100%"}
              height={"auto"}
              style={{ maxHeight: 500 }}
            >
              <source src={selectedVideo.link} type={selectedVideo.file_type} />
            </video>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default VideoTable;
