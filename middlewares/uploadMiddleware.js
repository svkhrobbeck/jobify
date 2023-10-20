import multer from "multer";
import { extname } from "path";
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, { originalname }, cb) => cb(null, originalname),
});

const checkImageTypes = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const fileExtname = fileTypes.test(extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (fileExtname && mimetype) {
    return cb(null, true);
  } else {
    cb("you can upload only image files");
  }
};

export const uploadAvatarMiddleware = fileSize => {
  const upload = multer({
    storage,
    limits: { fileSize },
    fileFilter: (req, file, cb) => checkImageTypes(file, cb),
  });

  return [
    upload.single("avatar"),
  ];
};
