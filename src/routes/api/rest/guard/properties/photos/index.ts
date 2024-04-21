import { router } from '@/express.instance';
import { destroy, list, store, update, updatePositions } from '@/services/properties/photos';

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { UPLOAD_IMAGE_STORAGE_PATH } from '@/helpers/config';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_IMAGE_STORAGE_PATH)
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

router.post('/api/properties/:code/photos', upload.single('file'), store)
router.put('/api/properties/:code/photos/:photo_id', update)
router.post('/api/properties/:property_id/photos/all/update-posicoes', updatePositions)
router.delete('/api/properties/:property_id/photos/:photo_id', destroy)
router.get('/api/properties/:code/photos', list)

export default router
