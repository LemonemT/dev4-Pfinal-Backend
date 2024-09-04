import { sendMail } from './mail.service.js'; 

export const notifyNewIncident = (incident) => {
  
  const admins = ['admin1@example.com', 'admin2@example.com']; 
  admins.forEach((admin) => {
    sendMail(admin, 'Nueva incidencia reportada', `Se ha reportado una nueva incidencia: ${incident.subject}`);
  });
};
