import { router } from "@/express.instance";
import { destroy, detail, list, store, update, updatePositions } from "@/services/banners";

router.get('/api/banners', list)
router.post('/api/banners', store)
router.get('/api/banners/:id', detail)
router.put('/api/banners/:id', update)
router.delete('/api/banners/:id', destroy)
router.put('/api/banners/all/update-posicoes', updatePositions)

export default router