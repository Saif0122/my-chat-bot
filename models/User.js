usage: [{
  timestamp: Date,
  model:     String,
  tokens:    Number,
  costUSD:   Number
}]

user.usage.push({
  timestamp: new Date(),
  model:     selectedModel,
  tokens:    chunkUsage.total_tokens,
  costUSD:   chunkUsage.total_tokens * modelCostPerToken[selectedModel]
});
await user.save();

// models/User.js
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username:      { type: String, unique: true },
  passwordHash:  String,
  role:          { type: String, enum: ["free","subscriber","admin"], default: "free" },
  subscription:  {
    status:    { type: String, enum: ["active","canceled","none"], default: "none" },
    expiresAt: Date
  },
  chats:   [{ role: String, content: String, timestamp: Date }],
  usage:   [{ timestamp: Date, model: String, tokens: Number, costUSD: Number }]
});
module.exports = mongoose.model("User", UserSchema);
