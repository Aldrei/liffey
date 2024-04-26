import { router } from "@/express.instance";
import { detail, list, search, store } from "@/services/neighborhoods";

router.get('/api/cities/:city_id/neighborhoods/search/:search', search)
router.get('/api/neighborhoods', list)
router.post('/api/cities/:id/neighborhoods', store)
router.get('/api/neighborhoods/:id', detail)

export default router
