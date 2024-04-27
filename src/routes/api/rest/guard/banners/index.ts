import { router } from "@/express.instance";
import { list } from "@/services/banners";

router.get('/api/banners', list)

export default router