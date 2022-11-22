import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaTwitter, FaTumblr } from "react-icons/fa";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [author, setAuthor] = useState([]);
  const [color, setColor] = useState("purple");
  const [quote, setQuote] = useState([]);

  const fetchQuote = () => {
    const options = {
      method: "GET",
      url: "https://free-famous-quotes.p.rapidapi.com/",
      headers: {
        "X-RapidAPI-Key": "59037cf1fcmshba9ceea6063766cp196fcajsna2e6a26eb492",
        "X-RapidAPI-Host": "free-famous-quotes.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        let index = Math.floor(Math.random() * response.data.length + 1);
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

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container-fluid" style={{ background: color }}>
      <div className="big vh-100 d-flex align-items-center justify-content-center ">
        <div className="card  mx-5 ">
          <div className="card-body">
            <div
              className="card-text quote-text text-align-center "
              style={{ color: color }}
            >
              <FaQuoteLeft className="iconL" />

              <p>{quote}</p>

              <FaQuoteRight className="iconR" />
            </div>
            <div className="xl ">
              <p className="author" style={{ color: color }}>
                {author}
              </p>
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
