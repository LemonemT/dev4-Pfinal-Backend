export const validateRole = (role) => {
    return (req, res, next) => {
      if (req.user.role === role) {
        return next();
      }
      res.status(403).json({ message: 'Acceso denegado' });
    };
  };
  