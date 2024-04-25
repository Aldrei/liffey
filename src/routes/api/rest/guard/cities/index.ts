import { router } from "@/express.instance";
import { detail, list, search, store, update } from "@/services/cities";

router.get('/api/cities/search/:search', search)
router.get('/api/cities', list)
router.post('/api/cities', store)
router.get('/api/cities/:id', detail)
router.put('/api/cities/:id', update)

export default router
