const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); 

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully!');
        
        sequelize.sync({ alter: true })  
            .then(() => {
                console.log('All models were synchronized successfully!');
            })
            .catch(err => console.log('Error syncing models:', err));
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });
    app.get('/', (req, res) => {
        res.send('Welcome to the API');
    });
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));