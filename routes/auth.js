// lib/auth.js
const jwt  = require("jsonwebtoken");
const User = require("../models/User");

async function requireUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    if (!req.user) throw new Error("No user");
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

function requireSubscription(req, res, next) {
  const u = req.user;
  if (u.role === "admin" || u.subscription.status === "active") {
    return next();
  }
  return res.status(403).json({ error: "Subscription required" });
}

module.exports = { requireUser, requireSubscription };
