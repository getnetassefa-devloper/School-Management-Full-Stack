import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Gets the token after 'Bearer'

  if (!token) return res.status(401).json({ error: "Please log in first" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
    req.user = decoded; // This stores { fullName, role } inside the request
    next(); // Moves to the next step
  } catch (err) {
    return res.status(403).json({ error: "Session expired, login again" });
  }
};