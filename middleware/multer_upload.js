const multer = require('multer');

// Configure multer to store files in memory as Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
