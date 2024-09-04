import Usuario from '../models/user.model.js'; 
class UserController {
  static async getAll(req, res) {
    try {
      const users = await Usuario.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await Usuario.findByPk(id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { email, role } = req.body;
      const [updated] = await Usuario.update({ email, role }, { where: { id } });
      if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
      const updatedUser = await Usuario.findByPk(id);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Usuario.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
