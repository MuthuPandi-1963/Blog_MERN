import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
  const token =req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log(decoded);
    
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};