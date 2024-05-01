import { router } from "@/express.instance";
import { list } from "@/services/messages";

router.get('/api/messages', list)

export default router
