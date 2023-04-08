import JSZip from "jszip";
import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
const GenericTable = ({ data }) => {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    debugger;
    setAllData(data);
  }, [data]);
  const downloadPdf = (urls) => {
    debugger;
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
        zip.file(`pdf${i}.pdf`, blob);
      });
      zip.generateAsync({ type: "blob" }).then((zipBlob) => {
        const url = window.URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "pdfs.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
      setIsLoading(false);
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
  const downloadSelectedItems = async () => {
    const newUrlList = [];
    debugger;
    selectedItems.map((item) => {
      newUrlList.push(require(`../assets/pdf/${item.url}`));
    });
    downloadPdf(newUrlList);
  };
  if (isLoading) {
    return (
      <div>
        <h3>Downloading...</h3>
      </div>
    );
  }
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
              <td>{item.text}</td>
              <td
                onClick={() =>
                  downloadPdf(require(`../assets/pdf/${item.url}`))
                }
              >
                {item.icon}
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
                <span>Name : {item.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenericTable;
