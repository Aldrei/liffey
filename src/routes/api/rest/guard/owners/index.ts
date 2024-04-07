import { router } from "@/express.instance";
import { search } from "@/services/owners";

router.get('/api/owners/search/:search', search)

export default router