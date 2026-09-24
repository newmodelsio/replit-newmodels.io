import { Router, type IRouter } from "express";
import healthRouter from "./health";
import discordRouter from "./discord";
import siteContentRouter from "./site-content";

const router: IRouter = Router();

router.use(healthRouter);
router.use(discordRouter);
router.use(siteContentRouter);

export default router;
