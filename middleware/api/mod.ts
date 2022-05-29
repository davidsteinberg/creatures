import get, { path } from "./get.ts";
import { Router } from "../../deps.ts";

const router = new Router();
router.get(path, (context) => {
  return get(context);
});

export default router;
