import express from 'express';
import cors from 'cors';
import { PORT, ALLOWED_ORIGINS } from './config/config.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import incidentRoutes from './routes/incidents.routes.js';
import userRoutes from './routes/users.routes.js';
import { videosUpload } from './config/multer.js';

const app = express();

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/incidents', videosUpload.single('image'), incidentRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    connectDB();
});
