// middleware/sanitize.js
import xss from "xss";

export const sanitizeInput = (req, res, next) => {
  const sanitize = (data) => {
    if (typeof data === "string") return xss(data);
    if (typeof data === "object" && data !== null) {
      for (const key in data) {
        data[key] = sanitize(data[key]);
      }
    }
    return data;
  };

  // Sanitize body, query, and params
  req.body = sanitize(req.body);
  req.query = sanitize({ ...req.query }); // clone to avoid read-only issue
  req.params = sanitize(req.params);

  next();
};
