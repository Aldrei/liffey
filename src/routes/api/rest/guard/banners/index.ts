import { router } from "@/express.instance";
import { detail, list, update } from "@/services/banners";

router.get('/api/banners', list)
router.get('/api/banners/:id', detail)
router.put('/api/banners/:id', update)

export default router