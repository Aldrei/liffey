import { router } from "@/express.instance";
import { search } from "@/services/employees";

router.get('/api/employees/search/:search', search)

export default router