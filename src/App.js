import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ImageDiv from "./imageDiv";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const items = data.Timeline;
    return items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const fetchBodyData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const itemsBody = data.Body;
    console.log(itemsBody);
    return itemsBody;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const App = () => {
  const imageUrl = "https://arthurfrost.qflo.co.za/Images/communion.jpg";

  const [apiData, setApiData] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [mp3BaseUrl, setMp3BaseUrl] = useState("");

  useEffect(() => {
    const fetchApiData = async () => {
      const timelineUrl = "https://arthurfrost.qflo.co.za/php/getTimeline.php";
      const imageBaseUrl = "https://arthurfrost.qflo.co.za/";
      const mp3BaseUrl = "https://arthurfrost.qflo.co.za/";
      try {
        const apiData = await fetchData(timelineUrl);
        const bodyData = await fetchBodyData(timelineUrl);
        setApiData(apiData);
        setBodyData(bodyData);
        setImageBaseUrl(imageBaseUrl);
        setMp3BaseUrl(mp3BaseUrl);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };
    fetchApiData();
  }, []);

  return (
    <div className="main-Container">
      <ImageDiv imageUrl={imageUrl} />
      <div className="app-container">
        <h1>WELCOME</h1>
        <div className="about"> </div>
        <ul className="timeline-list">
          {apiData.map((item) => (
            <li key={item.id} className="timeline-item">
              <div className="id">
                <div className="title1">
                  <p className="ttile">{item.Title}</p>
                </div>
                <div className="id2">
                  <p>{item.Id}</p>
                </div>
              </div>
              <div className="icon">
                {" "}
                {item.Icon && (
                  <img
                    src={`${imageBaseUrl}${item.Icon}`}
                    alt="Timeline Image"
                  />
                )}
              </div>
              <div className="info-container">
    
                <p className="second-title">{item.Category}</p>

                <p className="info-label">Media</p>
                <p className="info-value">{item.Media}</p>

                <p className="info-label">Episode:</p>
                <p className="info-value">{item.Episode}</p>

                <p className="info-label">Media Name</p>
                <p className="info-value">{item.MediaName}</p>

                <p className="info-label">Status</p>
                <p className="info-value">{item.Status}</p>

                <p className="info-label">IsActive</p>
                <p className="info-value">{item.isActive}</p>

                <p className="info-label">Epoch</p>
                <p className="info-value">{item.Epoch}</p>

                <p className="info-label">Date created</p>
                <p className="info-value">{item.CreateDate}</p>
              </div>
              <div className="image">
                {item.Image && (
                  <img
                    src={`${imageBaseUrl}${item.Image}`}
                    alt="Timeline Image"
                  />
                )}
              </div>
              <div className="audio__MainDiv">
                {item.Audio && (
                  <audio controls src={`${mp3BaseUrl}${item.Audio}`} />
                )}
                <div className="audio__size">
                  <p>Size:{item.AudioSize}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
