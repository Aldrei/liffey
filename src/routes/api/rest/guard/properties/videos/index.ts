import { router } from '@/express.instance';
import { destroy, list, store } from '@/services/properties/videos';

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { UPLOAD_VIDEO_STORAGE_PATH } from '@/helpers/config';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_VIDEO_STORAGE_PATH)
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
    fileSize: 200 * 1024 * 1024
  }
})

router.post('/api/properties/:code/videos', upload.single('file'), store)
router.delete('/api/properties/:property_id/videos/:video_id', destroy)
router.get('/api/properties/:code/videos', list)

export default router
