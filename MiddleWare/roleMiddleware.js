
/**
 * @param  {...string} allowedRoles 
 */
export default function restrictTo(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: { message: "Access not allowed" } });
    }
    next();
  };
}
