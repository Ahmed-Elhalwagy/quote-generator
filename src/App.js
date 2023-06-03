/* eslint-disable react/jsx-no-target-blank */
import "./App.css";
import React, { useEffect, useState } from "react";

import { BsWhatsapp, BsTwitter } from "react-icons/bs";

const App = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const url = "https://api.quotable.io/random";
  const generateQuote = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuote(data);
      });
  };
  useEffect(() => {
    generateQuote();
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(
      quote.author + " once said: " + quote.content
    );
    alert("copied");
  };

  let link = encodeURI(
    `"${quote.content}"    -${quote.author}- \n\nShared via Quote Generator React App`
  );
  const shareOnWhatsapp = () => {
    const whatsappShareUrl = `https://wa.me/?text=${link}`;
    window.open(whatsappShareUrl, "_blank");
  };
  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${link}`;

    window.open(twitterShareUrl, "_blank");
  };

  return (
    <>
      <h1>Quote Generator React App</h1>
      <div className="container">
        <p>{quote.content}</p>
        <span>{quote.author}</span>
        <div className="btns">
          <button onClick={copy} className="copy-btn">
            Copy
          </button>
          <button className="create-btn" onClick={generateQuote}>
            Generate Another Quote
          </button>
        </div>
      </div>
      <h2>Share with your friends</h2>
      <div className="social-media container">
        <div onClick={() => shareOnWhatsapp()}>
          <BsWhatsapp />
        </div>{" "}
        <div onClick={() => shareOnTwitter()}>
          <BsTwitter />
        </div>
      </div>
    </>
  );
};

export default App;
