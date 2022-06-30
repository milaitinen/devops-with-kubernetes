const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

let currentCount = 0;

app.get('/pingpong', (req, res) => {
  currentCount += 1;
  res.send("pong " + currentCount);
});

app.listen(PORT);
console.log(`Server started in port ${PORT}`);
console.log("------------");
console.log(`pong ${currentCount}`);