import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import * as Icon from "react-feather";
import JSZip from "jszip";
const LogoTable = ({ data }) => {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    debugger;
    setAllData(data);
  }, [data]);
  const downloadLogos = (urls) => {
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
        zip.file(`image${i}.jpg`, blob);
      });
      zip.generateAsync({ type: "blob" }).then((zipBlob) => {
        const url = window.URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "images.zip";
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
      <div className="w-100 d-flex justify-content-center ">
        <h3>Downloading...</h3>
      </div>
    );
  }
  const downloadSelectedItems = async () => {
    const newUrlList = [];
    selectedItems.map((item) => {
      newUrlList.push(item.src.large);
    });
    downloadLogos(newUrlList);
  };
  return (
    <div className="w-100">
      <Table className="">
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
              <td>{item.photographer}</td>
              <td onClick={() => downloadLogos(item.src.large)}>
                <Icon.Download size={15} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedItems.length > 0 && (
        <div className="w-100">
          <Button color="warning" onClick={downloadSelectedItems}>
            Seçilenleri İndir
          </Button>
          {selectedItems.map((item, index) => {
            return (
              <div key={index}>
                <span>Id : {item.id}</span>
                <span>Name : {item.photographer}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LogoTable;
