import React from "react";

const ImageDiv = ({ imageUrl }) => {
  const divStyle = {
    background: `url(${imageUrl}) center/cover no-repeat`,
    width: "100%",
    height: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return <div style={divStyle}></div>;
};

export default ImageDiv;
