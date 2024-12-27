import jwt from 'jsonwebtoken';
const secret = 'ilikecake';
const token = jwt.sign({ username: 'testuser' }, secret, { expiresIn: '1h' });
console.log('Generated Token:', token);