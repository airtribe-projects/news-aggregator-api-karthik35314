const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

exports.users = users;

exports.signup = async (req, res) => {
  const { name, email, password, preferences } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashed, preferences: preferences || [] });
  res.status(200).json({ message: 'User created' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

exports.getPreferences = (req, res) => {
  res.status(200).json({ preferences: req.user.preferences });
};

exports.updatePreferences = (req, res) => {
  req.user.preferences = req.body.preferences || [];
  res.status(200).json({ message: 'Preferences updated' });
};