import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaTwitter, FaTumblr } from "react-icons/fa";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const yellow = { background: "yellow" };

function App() {
  const [author, setAuthor] = useState([]);
  const [color, setColor] = useState(yellow);
  const [quote, setQuote] = useState([]);

  const fetchQuote = () => {
    const options = {
      method: "GET",
      url: "https://inspiring-quotes.p.rapidapi.com/random",
      params: { author: "Albert" },
      headers: {
        "X-RapidAPI-Key": "59037cf1fcmshba9ceea6063766cp196fcajsna2e6a26eb492",
        "X-RapidAPI-Host": "inspiring-quotes.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setQuote(response.data.quote);
        setAuthor(response.data.author);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const changeColor = (color) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const finalColor = "#" + randomColor;
    document.body.style.backgroundColor = finalColor;
    setColor(finalColor);
  };

  const renderAll = () => {};
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container-fluid" style={{ background: color }}>
      <div className="big vh-100 d-flex align-items-center justify-content-center ">
        <div className="card  mx-5 ">
          <div className="card-body">
            <p className="card-text quote-text text-align-center ">
              <span>
                <FaQuoteLeft />
              </span>
              {quote}
              <FaQuoteRight />
            </p>
            <div className="xl ">
              <p className="author">{author}</p>
            </div>
            <div className="r ">
              <div className="a ">
                <a
                  href={`https://twitter.com/intent/tweet?text=${quote} by ${author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ background: color }}
                >
                  <FaTwitter />
                </a>
              </div>
              <div className=" b ">
                <a
                  href="#"
                  className="btn btn-primary btn-sm"
                  style={{ background: color }}
                >
                  <FaTumblr />
                </a>
              </div>
              <div className="c  ">
                <a
                  href="#"
                  className="btn btn-primary btn-sm h6"
                  style={{ background: color }}
                  onClick={() => {
                    changeColor();
                    fetchQuote();
                  }}
                >
                  New Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
