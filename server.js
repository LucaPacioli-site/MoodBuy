const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/recommend', (req, res) => {
    const { section, mood } = req.body;
    let recommendations = [];

    if(section==='cravings'){
        recommendations=[
            {name:'Adobo Rice', brand:'Filipino Delights', price:'₱150', img:'https://source.unsplash.com/200x150/?adobo,food'},
            {name:'Halo-Halo', brand:'Dessert Paradise', price:'₱120', img:'https://source.unsplash.com/200x150/?halo-halo'},
            {name:'Cheese Sticks', brand:'SnackLab', price:'₱80', img:'https://source.unsplash.com/200x150/?cheese,food'}
        ];
    } else if(section==='ootd'){
        recommendations=[
            {name:'Elegant Gown', brand:'Trendy Styles', price:'₱2,500', img:'https://source.unsplash.com/200x150/?gown,fashion'},
            {name:'Leather Shoes', brand:'Footwork', price:'₱1,200', img:'https://source.unsplash.com/200x150/?shoes,fashion'},
            {name:'Floral Perfume', brand:'Scentify', price:'₱850', img:'https://source.unsplash.com/200x150/?perfume'}
        ];
    }

    res.json({ recommendations });
});

app.listen(process.env.PORT || 3000, () => console.log("Backend running"));
