import multer from "multer";
import { extname } from "path";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import User from "../models/userModel.js";

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
    async (req, res, next) => {
      const filePath = req.file.path;
      const user = await User.findById(req.user.userId).lean();

      if (req.file && user.avatarPublicId) {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      }

      if (req.file) {
        const response = await cloudinary.uploader.upload(filePath);
        await fs.unlink(filePath);
        req.body.avatar = response.secure_url;
        req.body.avatarPublicId = response.public_id;
      }

      next();
    },
  ];
};
