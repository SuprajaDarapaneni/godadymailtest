const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mailRoutes = require('./routes/mail');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', mailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
