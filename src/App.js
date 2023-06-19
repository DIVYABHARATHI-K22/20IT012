import React, { useState } from 'react';
import './App.css';
function App() {
  const [urls, setUrls] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const handleUrlChange = (e, index) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = e.target.value;
    setUrls(updatedUrls);
  };

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveUrl = (index) => {
    const updatedUrls = [...urls];
    updatedUrls.splice(index, 1);
    setUrls(updatedUrls);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/numbers?' + urls.map(url => `url=${encodeURIComponent(url)}`).join('&'));
      const data = await response.json();
      setNumbers(data.numbers);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <div>
        <h2>URLs</h2>
        {urls.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e, index)}
            />
            <button onClick={() => handleRemoveUrl(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddUrl}>Add URL</button>
      </div>
      <button onClick={fetchData}>Fetch Numbers</button>
      {numbers.length > 0 && (
        <div>
          <h2>Numbers</h2>
          <ul>
            {numbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
