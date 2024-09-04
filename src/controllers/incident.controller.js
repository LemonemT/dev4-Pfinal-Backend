import Incident from '../models/incident.model.js';
import path from 'path';
import fs from 'fs';


const __dirname = path.resolve();

class IncidentController {
  static async create(req, res) {
    try {
      const { subject, type, description, status } = req.body;
      const images = req.files ? req.files.map(file => file.path) : [];


      const newIncident = await Incident.create({ subject, type, description, images, status });
      res.status(201).json(newIncident);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {

      const incidents = await Incident.findAll();
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const incident = await Incident.findByPk(id);
      if (!incident) return res.status(404).json({ message: 'Incidencia no encontrada' });
      res.json(incident);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { subject, type, description, status } = req.body;
      const images = req.files ? req.files.map(file => file.path) : [];


      const [updated] = await Incident.update({ subject, type, description, images, status }, { where: { id } });
      if (!updated) return res.status(404).json({ message: 'Incidencia no encontrada' });


      const updatedIncident = await Incident.findByPk(id);
      res.json(updatedIncident);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Incident.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: 'Incidencia no encontrada' });


      const incident = await Incident.findByPk(id);
      if (incident && incident.images) {
        incident.images.forEach(imagePath => {
          const fullPath = path.join(__dirname, 'uploads', path.basename(imagePath));
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default IncidentController;
