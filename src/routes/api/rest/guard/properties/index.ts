import { router } from "@/express.instance";
import { detail, store, update } from "@/services/properties";

router.post('/api/properties', store)
router.put('/api/properties/:id', update)
router.get('/api/properties/:id', detail)

export default router