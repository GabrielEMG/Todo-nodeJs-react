const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      const msg = "No authentication token detected";
      return res.status(401).json({ msg });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      const msg = "Token verification has failed";
      return res.status(401).json({ msg });
    }
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
