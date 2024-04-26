import { router } from "@/express.instance";
import { search, store } from "@/services/neighborhoods";

router.get('/api/cities/:city_id/neighborhoods/search/:search', search)
router.post('/api/cities/:id/neighborhoods', store)

export default router
