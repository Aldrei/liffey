import { router } from "@/express.instance";
import { list, search } from "@/services/owners";

router.get('/api/owners/search/:search', search)
router.get('/api/owners', list)

export default router
