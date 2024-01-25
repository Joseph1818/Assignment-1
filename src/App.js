// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

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

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [mp3BaseUrl, setMp3BaseUrl] = useState("");

  useEffect(() => {
    const fetchApiData = async () => {
      const timelineUrl = "https://arthurfrost.qflo.co.za/php/getTimeline.php";
      const imageBaseUrl = "https://arthurfrost.qflo.co.za/";
      const mp3BaseUrl = "https://arthurfrost.qflo.co.za/";
      try {
        const apiData = await fetchData(timelineUrl);
        setApiData(apiData);
        setImageBaseUrl(imageBaseUrl);
        setMp3BaseUrl(mp3BaseUrl);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };
    fetchApiData();
  }, []);

  return (
    <div className="app-container">
      <h1>TimeLine Data</h1>
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
            <div className="category">
              {" "}
              <p>{item.Category}</p>
            </div>
            <p>Media: {item.Media}</p>
            <p>Episode: {item.Episode}</p>
            <p>CreateDate: {item.CreateDate}</p>
            <p>Media Name : {item.MediaName}</p>
            <p>Status {item.Status}</p>
            <p>IsActive {item.isActive}</p>
            <p>Epoch: {item.Epoch}</p>
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
  );
};

export default App;
