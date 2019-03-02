import * as path from 'path';
import { Request } from 'express';
import { s3 } from 'aws';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'gfm-v1-profile-image',
    metadata(req: Request, file: Express.Multer.File, cb) {
      cb(null, { fieldName: file.fieldname, uploadTime: Date.now().toString() });
    },
    key(req: Request, file: Express.Multer.File, cb) {
      const extension = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extension);
      cb(null, 'profile-images/' + basename + '-' + Date.now().toString() + extension);
    },
    acl: 'public-read-write'
  })
});

export { upload };
