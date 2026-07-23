const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

async function check() {
  const token = jwt.sign({ username: "admin", role: "admin" }, "super_secret_jwt_key_change_me", { expiresIn: "1d" });
  
  const res = await fetch("http://localhost:4000/api/workspace/admin/workspaces", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  
  if (!res.ok) {
    console.log("Error:", res.status, await res.text());
    return;
  }
  
  const data = await res.json();
  console.log("Count:", data.length);
  if (data.length > 0) {
    console.log("First client:", JSON.stringify(data[0], null, 2));
  }
}

check();
