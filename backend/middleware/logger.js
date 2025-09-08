import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, '../log.txt');

export default (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
    fs.appendFileSync(logPath, log);
    next();
};
