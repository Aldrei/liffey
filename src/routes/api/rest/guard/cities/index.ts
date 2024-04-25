import { router } from "@/express.instance";
import { list, search, store } from "@/services/cities";

router.get('/api/cities/search/:search', search)
router.get('/api/cities', list)
router.post('/api/cities', store)

export default router
