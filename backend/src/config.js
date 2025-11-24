// Centralised configuration and magic values

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "super-secret-key",
  TOKEN_EXPIRY: "2h",
  DEFAULT_PAGE_LIMIT: 10
};
