import { router } from "@/express.instance";
import { store } from "@/services/properties";

router.post('/api/properties', store)

export default router