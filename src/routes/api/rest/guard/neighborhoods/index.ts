import { router } from "@/express.instance";
import { search } from "@/services/neighborhoods";

router.get('/api/cities/:city_id/neighborhoods/search/:search', search)

export default router
