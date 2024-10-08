const roles = {
  RESIDENTE: 'residente',
  ADMINISTRADOR: 'administrador',
};

export const validateRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== roles[role]) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
};
