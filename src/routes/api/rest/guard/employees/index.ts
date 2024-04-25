import { router } from "@/express.instance";
import { list, search } from "@/services/employees";

router.get('/api/employees/search/:search', search)
router.get('/api/employees', list)

export default router