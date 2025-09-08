import db from '../db.js';
import generateCode from '../utils/generateCode.js';

export const createShortURL = (req, res) => {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) return res.status(400).json({ message: "URL is required." });

    const code = shortcode || generateCode();

    if (db[code]) return res.status(409).json({ message: "Shortcode already exists." });

    const now = new Date();
    const expiry = new Date(now.getTime() + validity * 60 * 1000);

    db[code] = {
        originalURL: url,
        createdAt: now,
        expiresAt: expiry,
        clicks: 0,
        clickData: []
    };

    res.status(201).json({
        shortURL: `http://localhost:3000/${code}`,
        expiresAt: expiry
    });
};

export const redirectURL = (req, res) => {
    const { code } = req.params;
    const entry = db[code];

    if (!entry) return res.status(404).json({ message: "URL not found." });

    if (new Date() > new Date(entry.expiresAt)) {
        return res.status(410).json({ message: "Link has expired." });
    }

    entry.clicks += 1;
    entry.clickData.push({
        timestamp: new Date(),
        referrer: req.get('Referrer') || 'Direct',
        location: 'India' 
    });

    res.redirect(entry.originalURL);
};

export const getStats = (req, res) => {
    const { code } = req.params;
    const entry = db[code];

    if (!entry) return res.status(404).json({ message: "No such short URL." });

    res.json({
        originalURL: entry.originalURL,
        createdAt: entry.createdAt,
        expiresAt: entry.expiresAt,
        clicks: entry.clicks,
        clickData: entry.clickData
    });
};
