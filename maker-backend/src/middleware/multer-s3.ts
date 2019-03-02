import { Request } from 'express';
import { s3 } from 'aws';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'gfm-v1-profile-image',
    key(req: Request, file: Express.Multer.File, cb) {
      return cb(null, Date.now().toString() + file.originalname);
    },
    acl: 'public-read-write'
  })
});

export { upload };
