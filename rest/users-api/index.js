const express = require('express');

const app = express();
const port = 3000;
function main() {
  app.get('/users/:offset:limit', async (req, res) => {
    // const result = await new Promise((resolve, reject) => {
    //   client.sayHello({ name: req.params.name }, (err, response) => {
    //     if (err) reject(err);
    //     else (resolve(response));
    //   });
    // });
    res.send([{ id: 1, name: 'Martín' }]);
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
main();

