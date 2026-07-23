const http = require("http");
const jwt = require("jsonwebtoken");

const token = jwt.sign({ username: "admin", role: "admin" }, "super_secret_jwt_key_change_me", { expiresIn: "1d" });

const options = {
  hostname: 'api.kunalconnects.com',
  port: 443,
  path: '/api/workspace/admin/workspaces',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = require("https").request(options, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    if (res.statusCode === 200) {
      const users = JSON.parse(data);
      console.log(`Users found: ${users.length}`);
      
      users.forEach((u, i) => {
        if (!u.services) console.log(`User ${i} missing services`);
        if (!u.payments) console.log(`User ${i} missing payments`);
        if (!u.brief) console.log(`User ${i} missing brief`);
        if (u.services && u.services.length === undefined) console.log(`User ${i} services is not array:`, u.services);
        if (u.payments && u.payments.length === undefined) console.log(`User ${i} payments is not array:`, u.payments);
      });
      
      // Log the oldest user to see what legacy data looks like
      if (users.length > 0) {
        console.log("Oldest user:", JSON.stringify(users[users.length - 1], null, 2));
      } else {
        console.log("Empty array returned!");
      }
    } else {
      console.log("Response:", data);
    }
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
