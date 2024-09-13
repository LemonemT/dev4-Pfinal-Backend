import Usuario from '../models/user.model.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SECRET_KEY } from '../config/config.js';

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await Usuario.create({
        email,
        password: hashedPassword,
        role
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Error de validación', details: error.errors });
      }
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Usuario.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default AuthController;