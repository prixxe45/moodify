const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../model/blacklist.model');
const redis = require('../config/cache');

async function registerUser(req, res) {
const {username, email, password} = req.body;

const isAlreadyRegistered = await userModel.findOne({
  $or: [{username}, {email}]
});

if (isAlreadyRegistered) {
  return res.status(400).json({ message: 'User already registered' });
}

const hash = bcrypt.hashSync(password,10);

const user = await userModel.create({
  username,
  email,
  password: hash
});

const token = jwt.sign({
  id: user._id,
  username: user.username,
},process.env.JWT_SECRET_KEY,{
  expiresIn: '3d'
}
)

res.cookie('token', token{
  httpOnly: true,
    secure: time,
    sameStie: "None"
})

return res.status(201).json({ message: 'User registered successfully',
  user:{
    id: user._id,
    username: user.username,
    email: user.email
   }
  })
};


async function loginUser(req, res) {
  const {email, username, password} = req.body;

  const user = await userModel.findOne({
    $or: [{email}, {username}]
  }).select('+password');

  if(!user){
    return res.status(400).json({message: 'Invalid credentials'});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({message: 'Invalid credentials'});
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  },process.env.JWT_SECRET_KEY,{
    expiresIn: '3d'
  })

  res.cookie('token', token)

  return res.status(200).json({message: 'Login successful', 
    user: {
      id: user._id,
      username: user.username,
      email: user.email
     }
    });

  }

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({message: 'User details fetched successfully',
  user
  });
}

async function logoutUser(req, res) {

const token = req.cookies.token;

if(!token){
  return res.status(400).json({message: 'Token not found'});

}
res.clearCookie("token");

redis.set(token, Date.now().toString(), 'EX', 24*60*60);

return res.status(200).json({message: 'Logout successful'});

}


module.exports = {
registerUser,
loginUser,
getMe,
logoutUser
}
