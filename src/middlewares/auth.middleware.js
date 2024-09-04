import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';
import Usuario from '../models/user.model.js'; 

export const validateJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(403).json({ message: 'Se debe proveer un token' });

    const decoded = jwt.verify(authorization, SECRET_KEY);
    const user = await Usuario.findByPk(decoded.id);
    if (!user) return res.status(403).json({ message: 'El JWT no pertenece a ningún usuario' });

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return res.status(403).json({ message: 'El token ha expirado' });
    res.status(403).json({ message: error.message });
  }
};
