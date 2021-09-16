const fs = require('fs');

const max = 200;
const data = [];
for (let index = 1; index <= max; index += 1) {
  const user = {
    model: 'users',
    data: {
      id: index,
      firstName: `user${index}`,
      lastName: `last${index}`,
      email: `userlast${index}@domain.com`,
    },
  };
  data.push(user);
}

fs.writeFileSync('autoGeneratedUsers.json', JSON.stringify(data));
