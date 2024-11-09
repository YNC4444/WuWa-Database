const fs = require('fs');
const path = require('path');

const directory = './public/images'; // Adjust the path to your images directory

fs.readdir(directory, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  files.forEach((file) => {
    const oldPath = path.join(directory, file);
    const tempPath = path.join(directory, `temp_${file}`);
    const newPath = path.join(directory, file.toLowerCase());

    // Rename to a temporary name
    fs.rename(oldPath, tempPath, (err) => {
      if (err) {
        console.error('Error renaming file to temp: ' + err);
      } else {
        // Rename to the final lowercase name
        fs.rename(tempPath, newPath, (err) => {
          if (err) {
            console.error('Error renaming file to lowercase: ' + err);
          } else {
            console.log(`Renamed: ${file} -> ${file.toLowerCase()}`);
          }
        });
      }
    });
  });
});