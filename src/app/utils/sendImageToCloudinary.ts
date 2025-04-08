import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: 'dvmdlh5ta',
  api_key: '698856157459617',
  api_secret: '8tsjuBpzRDSX5L3Qz9VZa7YoCyI', // Click 'View API Keys' above to copy your API secret
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
        //delete a file asynchronously , clearing file from uploads
        fs.unlink(path, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('File is deleted');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
