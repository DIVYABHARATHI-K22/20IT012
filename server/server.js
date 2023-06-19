const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;

    if (!urls) {
        return res.status(400).json({ error: 'URLs not provided' });
    }

    const urlList = Array.isArray(urls) ? urls : [urls];
    const uniqueNumbers = new Set();

    try {
        const fetchPromises = urlList.map(async (url) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    const numbers = data.numbers;
                    numbers.forEach((number) => uniqueNumbers.add(number));
                } else {
                    console.log(`Error: ${response.status} for URL: ${url}`);
                }
            } catch (error) {
                console.log(`Error: ${error} for URL: ${url}`);
            }
        });

        await Promise.all(fetchPromises);

        const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
        return res.json({ numbers: sortedNumbers });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
