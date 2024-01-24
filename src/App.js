// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

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
      const imageBaseUrl = "https://arthurfrost.qflo.co.za/Images/";
      const mp3BaseUrl = "https://arthurfrost.qflo.co.za/MP3/";

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
            <p>Id: {item.Id}</p>
            <p>Title: {item.Title}</p>
            <p>Episode: {item.Episode}</p>
            <p>CreateDate: {item.CreateDate}</p>
            <p>Media Name : {item.MediaName}</p>
            

            {item.image && (
              <img src={`${imageBaseUrl}${item.image}`} alt="Timeline Image" />
            )}

            {item.audio && (
              <audio controls src={`${mp3BaseUrl}${item.audio}`} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
