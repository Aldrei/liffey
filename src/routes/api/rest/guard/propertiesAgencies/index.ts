import { router } from "@/express.instance";
import { list } from "@/services/propertiesAgencies";

router.get('/api/properties/agency/list', list)

export default router
