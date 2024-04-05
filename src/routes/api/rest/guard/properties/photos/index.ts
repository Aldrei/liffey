import { router } from '@/express.instance';
import { store } from '@/services/properties/photos';

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { UPLOAD_STORAGE_PATH } from '@/helpers/config';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_STORAGE_PATH)
  },
  filename: function (_req, file, cb) {
    const extension = path.extname(file.originalname)
    const randomName = `${uuidv4()}${extension}`

    cb(null, randomName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
})

router.post('/api/properties/:property_id/photos', upload.single('file'), store)

export default router