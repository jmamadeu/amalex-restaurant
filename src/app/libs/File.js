const fs = require('fs');
const path = require('path');

module.exports = {
  deleteFile(file, paste) {
    fs.unlinkSync(
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        `${paste}`,
        `${file}`
      )
    );
  },
};
