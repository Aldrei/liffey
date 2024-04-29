import { router } from "@/express.instance";
import { detail, list } from "@/services/banners";

router.get('/api/banners', list)
router.get('/api/banners/:id', detail)

export default router