import multer, { diskStorage } from 'multer';


const imageStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads');
  },
  filename: function (req, file, cb) {
    const newName = `${Date.now()}-${file.originalname}`;
    cb(null, newName);
  }
});

const imageFilter = (req, file, cb) => {
  const { mimetype } = file;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (allowedTypes.includes(mimetype)) {
    return cb(null, true);
  }

  cb(new Error('Solo se permiten archivos de imagen'));
};

export const imageUpload = multer({ storage: imageStorage, fileFilter: imageFilter });
