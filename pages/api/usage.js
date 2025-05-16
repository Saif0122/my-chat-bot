import { getSession } from "../../lib/auth"; // your JWT/session check
import User from "../../models/User";
export default async (req, res) => {
  const user = await getSession(req);
  const doc = await User.findById(user.id, "usage").lean();
  res.json(doc.usage);
};
