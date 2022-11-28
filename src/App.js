import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaTwitter, FaTumblr } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [author, setAuthor] = useState([]);
  const [color, setColor] = useState("purple");
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuote = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "free-famous-quotes.p.rapidapi.com",
        "X-RapidAPI-Key": "59037cf1fcmshba9ceea6063766cp196fcajsna2e6a26eb492",
      },
    };

    fetch("https://free-famous-quotes.p.rapidapi.com/", options)
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setAuthor(data.author);
        console.log(data);
        setLoading(false);
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
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
            {loading ? (
              <BiLoaderCircle
                className="Bi w-100 align-items-center justify-content-center  "
                style={{ color: color }}
              />
            ) : (
              <>
                <div
                  className="
                card-text quote-text text-align-center "
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
              </>
            )}

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
                    setLoading(true);
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
