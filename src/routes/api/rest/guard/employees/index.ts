import { router } from "@/express.instance";
import { detail, list, search } from "@/services/employees";

router.get('/api/employees/search/:search', search)
router.get('/api/employees', list)
router.get('/api/employees/:id', detail)

export default router