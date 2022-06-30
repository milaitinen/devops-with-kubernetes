const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

var currentStr = "";

const printTimeAndHash = () => {
  currentStr = new Date().toISOString() + ": " + Math.random().toString(36).substring(2, 24) ;
  console.log(currentStr);
  setTimeout(printTimeAndHash, 5000);
}

app.get('/', (req, res) => {
  res.send(currentStr);
});

app.listen(PORT);
console.log(`Server started in port ${PORT}`);

printTimeAndHash();