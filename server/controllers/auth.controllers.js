import transporter from "../utils/nodemailer.js";
import bcrypt from "bcrypt";
import prisma from "../config/prismaConfig.js";
import WelcomePage from "../utils/mail.js";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/cookie.js";

// ---------- REGISTER ----------

export const register = async (req, res) => {
    try {
  const { name, email, password } = req.body;
  if (!name || name.length < 5) {
    return res.json({
      success: false,
      message: "name is undefined",
    });
  }
  if (!email || email.length < 8) {
    return res.json({
      success: false,
      message: "name is undefined",
    });
  }
  if (!password || password.length < 8) {
    return res.json({
      success: false,
      message: "name is undefined",
    });
  }
  const checkUser = await prisma.user.findFirst({ where: { email } });
  if (checkUser && checkUser.isVerified) {
    return res
      .status(404)
      .json({ message: "user already exists", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET);
  if(checkUser && !checkUser.isVerified){
      const updatedUser = await prisma.user.update({
        where : {email : checkUser.email},
        data : {
          password : hashedPassword,
          verificationToken,
          bio: req.body.bio || checkUser.bio,
        avatar:
          req.body?.avatar ||
          checkUser.avatar,
        countryId: req.body.countryId || checkUser.countryId,
        }
      },
      
  )
  }
    

    

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
        bio: req.body.bio || null,
        avatar:
          req.body?.avatar ||
          "https://i.pinimg.com/736x/9d/47/5a/9d475a44af4d774a980c658739b64e6a.jpg",
        countryId: req.body.countryId || null,
      },
    });

    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify your email",
      html: WelcomePage(name, email, verifyLink),
    });

    res.json({
      message: "User registered! Please check your email to verify.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "User registration failed." });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log("token :", token);
  
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  if (!decoded)
    return res.status(404).json({ message: "user not found", success: false });
  try {
    const user = await prisma.user.findFirst({
      where: { email: decoded.email },
    });
    if (!user) return res
        .status(404)
        .json({ message: "user not found", success: false });
    if (user.isVerified){
        sendCookie(res, token);
        return res
        .status(200)
        .json({ message: "user already verified", success: true });
    }
 
        const dbToken = user.verificationToken;
    if (dbToken !== token)
      return res
        .status(404)
        .json({ message: "token  not matching", success: false });
    const updatedUser = await prisma.user.update({
      where: { email: decoded.email },
      data: { isVerified: true, verificationToken: null },
    });
    const newToken = jwt.sign({ id :updatedUser.id,email : updatedUser.email,role: updatedUser.role }, process.env.JWT_SECRET);
    sendCookie(res, newToken);
    res.json({
      message: "email verified successfully",
      success: true,
    });

    // res.redirect(`${process.env.CLIENT_URL}/email-verified?status=success`);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error.");
  }
};

// ---------- LOGIN ----------
export const login =  async (req, res) => {
  const { email, password } = req.body;
    if (!email || email.length < 8) {
    return res.json({
      success: false,
      message: "email is undefined",
    });
  }
  if (!password || password.length < 8) {
    return res.json({
      success: false,
      message: "password is undefined",
    });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'email address not found' });
    if (!user.isVerified) return res.status(400).json({ error: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}


export const refreshAuth = async (req, res) => {
  const token = req.cookies.token || '';
  if (!token) return res.status(401).json({ message: 'No token provided' });  
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: 'Invalid token' });
    const user = await prisma.user.findUnique({ where: { email: decoded.email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ data: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, bio: user.bio, countryId: user.countryId, isVerified:user.isVerified } });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } 
};
// // ---------- PROTECTED ROUTE ----------

// app.get('/profile', authMiddleware, async (req, res) => {
//   const user = await prisma.user.findUnique({ where: { id: req.userId } });
//   res.json(user);
// });

// app.listen(5000, () => console.log('Server running on port 5000'));
