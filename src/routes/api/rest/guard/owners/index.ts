import { router } from "@/express.instance";
import { destroy, detail, list, search, store, update } from "@/services/owners";

router.get('/api/owners/search/:search', search)
router.get('/api/owners', list)
router.post('/api/owners', store)
router.put('/api/owners/:id', update)
router.get('/api/owners/:id', detail)
router.delete('/api/owners/:id', destroy)

export default router
