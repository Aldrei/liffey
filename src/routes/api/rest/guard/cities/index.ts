import { router } from "@/express.instance";
import { list, search } from "@/services/cities";

router.get('/api/cities/search/:search', search)
router.get('/api/cities', list)

export default router
