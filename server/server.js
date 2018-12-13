const express = require('express');
const Alpine = require('alpine');

const {createReadStream} = require('fs');
const app = express();

const alpine = new Alpine();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.get('/api/dates', (req, res) => {
  let dates = [];
  alpine.parseReadStream(
    createReadStream('./access.log', {encoding: 'utf8'}).on('end', () => {
      res.json({dates});
    }),
    data => {
      if (data.request === 'POST /service/meter/ HTTP/1.1') {
        dates.push(data.time);
      }
    }
  );
});

app.listen(3000, () => console.log('server has started!'));
