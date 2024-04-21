import { router } from "@/express.instance";
import { search } from "@/services/cities";

router.get('/api/cities/search/:search', search)

export default router
