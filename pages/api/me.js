// pages/api/me.js
import { requireUser } from "../../lib/auth";

export default async function handler(req, res) {
  await requireUser(req, res, () => {
    // return basic user info to frontend
    const { username, role, subscription } = req.user;
    res.status(200).json({ username, role, subscription });
  });
}
