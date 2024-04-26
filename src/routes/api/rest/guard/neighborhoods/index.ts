import { router } from "@/express.instance";
import { destroy, detail, list, search, store, update } from "@/services/neighborhoods";

router.get('/api/cities/:city_id/neighborhoods/search/:search', search)
router.get('/api/neighborhoods', list)
router.post('/api/cities/:id/neighborhoods', store)
router.get('/api/neighborhoods/:id', detail)
router.put('/api/neighborhoods/:id', update)
router.delete('/api/neighborhoods/:id', destroy)

export default router
