const axios = require('axios'); // For API requests

app.post('/api/recommend', async (req, res) => {
    const { section, mood } = req.body;
    let recommendations = [];

    if(section === 'cravings'){
        // Example using a public API like Pexels for demo
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(mood)} food&per_page=5`, {
            headers: { Authorization: 'YOUR_PEXELS_API_KEY' }
        });
        recommendations = response.data.photos.map(photo => ({
            name: photo.alt || "Delicious Food",
            brand: "Trending Vendor",
            price: "₱" + Math.floor(Math.random() * 300 + 50),
            img: photo.src.medium
        }));
    } else if(section === 'ootd'){
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(mood)} fashion&per_page=5`, {
            headers: { Authorization: 'YOUR_PEXELS_API_KEY' }
        });
        recommendations = response.data.photos.map(photo => ({
            name: photo.alt || "Stylish Outfit",
            brand: "Trending Brand",
            price: "₱" + Math.floor(Math.random() * 3000 + 500),
            img: photo.src.medium
        }));
    }

    res.json({ recommendations });
});
