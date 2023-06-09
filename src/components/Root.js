import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Row ,Col, Container} from "reactstrap";
import DropDown from "./DropDown";
import { allData } from "../data/index";
import Table from "./Table";
import ImageCard from "./ImageCard";
import ButtonCard from "./ButtonCard";
import axios from "axios";
import VideoTable from "./VideoTable";
import LogoTable from "./LogoTable";
const Root = () => {
  const [languageData, setLanguageData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [sertifications, setSertifications] = useState([]);
  const [logos, setLogos] = useState([]);

  const handleLanguageClick = (item) => {
    clearItems();
    const filteredData = allData.languageTableData.filter(
      (x) => x.type === item.type
    );
    setLanguageData(filteredData);
  };
  const handleImageClick = (item) => {
    clearItems();
    const filteredData = allData.imageTableData.filter(
      (x) => x.type === item.type
    );
    setImageData(filteredData);
  };
  const handleVideoClick = async () => {
    clearItems();
    await getVideos();
  };

  const getVideos = async () => {
    const apiKey = "ajeyuMM2BOobRstaPt2AJ03NEBydnPmPtd0x44nVOuE9yWcHCjy6ZJQL";
    const apiUrl = "https://api.pexels.com/videos/search";
    const query = "nature"; // aramak istediğiniz anahtar kelime
    const params = { query, per_page: 10 };

    const headers = { Authorization: apiKey };
    await axios
      .get(apiUrl, { headers, params })
      .then((response) => {
        const newArr = response.data.videos.map((item) => {
          return {
            ...item,
            isChecked: false,
          };
        });
        setVideos(newArr);
      })
      .catch((error) => console.log(error));
  };
  const getLogos = async () => {
    const response = await axios.get(
      "https://api.pexels.com/v1/search?query=nature&per_page=10",
      {
        headers: {
          Authorization:
            "ajeyuMM2BOobRstaPt2AJ03NEBydnPmPtd0x44nVOuE9yWcHCjy6ZJQL",
        },
      }
    );
    const newArr = response.data.photos.map((item) => {
      return {
        ...item,
        isChecked: false,
      };
    });
    setLogos(newArr);
  };
  const clearItems = () => {
    setImageData([]);
    setLanguageData([]);
    setVideos([]);
    setSertifications([]);
    setLogos([]);
  };
  const handleSertificationClick = () => {
    clearItems();
    setSertifications(allData.sertificationsData);
  };
  const handleLogoClick = async () => {
    clearItems();
    await getLogos();
  };
  return (
<Container>
  <Row>
    <Col xs={12} md={8} className="mx-auto">
      <Card className="mx-3 my-5">
        <CardHeader>
          <h3>Otel Filtreleme Ekranı</h3>
        </CardHeader>
        <CardBody className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <DropDown
              text={"Bilgi Formu"}
              data={allData.languageDropdownData}
              handleClick={handleLanguageClick}
            />
            <DropDown
              text={"Resimler"}
              data={allData.imageDropdownData}
              handleClick={handleImageClick}
            />
            <ButtonCard text="Videolar" handleClick={handleVideoClick} />
            <ButtonCard
              text="Sertifikalar"
              handleClick={handleSertificationClick}
            />
            <ButtonCard text="Logolar" handleClick={handleLogoClick} />
          </div>
          <hr className="w-100" />
          <div
            className="overflow-auto"
            style={{ maxHeight: "400px", width: "100%" }}
          >
            {languageData.length > 0 && <Table data={languageData} />}
            {imageData.length > 0 && <ImageCard data={imageData} />}
            {videos.length > 0 && <VideoTable data={videos} />}
            {sertifications.length > 0 && <Table data={sertifications} />}
            {logos.length > 0 && <LogoTable data={logos} />}
          </div>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>

  );
};

export default Root;
//ajeyuMM2BOobRstaPt2AJ03NEBydnPmPtd0x44nVOuE9yWcHCjy6ZJQL
