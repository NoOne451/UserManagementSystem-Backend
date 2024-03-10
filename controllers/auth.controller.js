import { findUser } from '../utils/index.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/index.js';
export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await findUser(email);
    console.log(userExists);

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).send({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await findUser(email);

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    const validPassword = bcryptjs.compareSync(password, userExists.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: userExists.id,
        email: userExists.email,
      },
      process.env.JWT_SECRET
    );
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      data: {
        username: userExists.username,
        email: userExists.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie('jwt');
  res.send({ status: true });
};

export const checkAuthStatusController = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ status: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ status: false });
    }
    res.status(200).json({ status: true, data: decoded });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ status: false });
  }
};
