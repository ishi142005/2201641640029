import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js';
import logger from './middleware/logger.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.send('Welcome to the URL_SHORTNER. Use /shorturls to create short URLs.');
});

app.use('/', urlRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
