const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no provisto" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { gymId: payload.gymId, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

function requireSuperAdmin(req, res, next) {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Acceso restringido a super-admin" });
  }
  next();
}

module.exports = { auth, requireSuperAdmin };
