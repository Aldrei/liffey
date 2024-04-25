import { router } from "@/express.instance";
import { detail, list, search, store } from "@/services/cities";

router.get('/api/cities/search/:search', search)
router.get('/api/cities', list)
router.post('/api/cities', store)
router.get('/api/cities/:id', detail)

export default router
