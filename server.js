const express = require('express');
const apiRoutes = require('./routes/api')
const htmlRoutes = require('./routes/html')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);




app.listen(PORT, () => console.log(`API server is now on port ${PORT}`))