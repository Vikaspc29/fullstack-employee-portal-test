const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, TOKEN_EXPIRY } = require("../config");

// Demo users for authentication and role-based access
const users = [
  {
    id: "u1",
    email: "admin@demo.com",
    passwordHash: bcrypt.hashSync("admin123", 8),
    role: "ADMIN"
  },
  {
    id: "u2",
    email: "employee@demo.com",
    passwordHash: bcrypt.hashSync("employee123", 8),
    role: "EMPLOYEE"
  }
];

// Verify incoming token (if present) and attach user info to context
function authenticate(token) {
  if (!token) return null;
  try {
    const cleaned = token.replace("Bearer ", "");
    const decoded = jwt.verify(cleaned, JWT_SECRET);
    return decoded; // { userId, role, email }
  } catch (e) {
    return null;
  }
}

// Validate credentials and return signed JWT
function login(email, password) {
  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    throw new Error("Invalid credentials");
  }

  const payload = { userId: user.id, role: user.role, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  return { token, user: payload };
}

module.exports = { authenticate, login };
