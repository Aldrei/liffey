import { router } from "@/express.instance";
import { detail, list, search, store, update } from "@/services/employees";

router.get('/api/employees/search/:search', search)
router.get('/api/employees', list)
router.get('/api/employees/:id', detail)
router.post('/api/employees', store)
router.put('/api/employees/:id', update)

export default router