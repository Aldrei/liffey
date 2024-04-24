import { router } from "@/express.instance";
import { list, search, store } from "@/services/owners";

router.get('/api/owners/search/:search', search)
router.get('/api/owners', list)
router.post('/api/owners', store)

export default router
