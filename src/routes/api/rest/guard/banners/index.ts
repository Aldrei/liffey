import { router } from "@/express.instance";
import { destroy, detail, list, update } from "@/services/banners";

router.get('/api/banners', list)
router.get('/api/banners/:id', detail)
router.put('/api/banners/:id', update)
router.delete('/api/banners/:id', destroy)

export default router