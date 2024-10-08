import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';
import Usuario from '../models/user.model.js'; 

export const validateJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Se debe proveer un token válido' });
    }

    const token = authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await Usuario.findByPk(decoded.id);
    if (!user) return res.status(403).json({ message: 'El JWT no pertenece a ningún usuario' });

    req.user = { id: user.id, role: user.role }; // Asegúrate de incluir el rol
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return res.status(403).json({ message: 'El token ha expirado' });
    res.status(403).json({ message: error.message });
  }
};
