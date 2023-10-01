
import './App.css';
import React from 'react';
import { FaCopy, FaRegCopy } from 'react-icons/fa6';
const BACKEND_URL = 'http://localhost:8080/tiny-url';

function ShortUrlComponent({ shortUrl }) {
  const [copied, setCopied] = React.useState(false);
  function copyToClipboard() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  }

  if (shortUrl) {
    return <div className="short-url">
      <a href={shortUrl} target='_blank' rel="noreferrer">{shortUrl}</a>

      <span className="tooltip" onClick={copyToClipboard} >
        <span className="tooltiptext">{copied===true ? "Copied ✔️" : "Copy"}</span>
        {copied === true ? <FaCopy /> : <FaRegCopy />}
      </span>
    </div>
  }
  return <div style={{ textAlign: "center", fontSize: "3rem", margin: "2rem" }}>make url shorter 👆</div>
}


function App() {
  const [urlInput, setUrlInput] = React.useState('');
  const [shortUrl, setShortUrl] = React.useState('');
  function handleInput(event) {
    event.preventDefault();
    setUrlInput(event.target.value);
  }

  function reset(){
    setUrlInput('');
    setShortUrl('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(BACKEND_URL, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ "longUrl": urlInput })
      })
      const json = await response.json();
      setShortUrl(json['shortUrl']);  
    } catch(error) {
      setShortUrl("OOps! We are down.... will come back fast.. 🚀")
    }
  }

  return (
    <div className="app">
      <h1 id="main-header">🧑‍💻my-tiny-url</h1>
      <div className="flex search-box">
        <input type='text' value={urlInput} placeholder='Enter your URL here' onChange={handleInput} />
        <button onClick={handleSubmit}>
          <p>👈 Make Tiny</p>
        </button>
      </div>
      <ShortUrlComponent key={shortUrl} shortUrl={shortUrl} />
      <button onClick={reset} id="reset-button">Reset</button>
    </div>
  );
}

export default App;
