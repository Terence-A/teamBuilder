const router = require("express").Router();

const teamRoutes = require("./team_routes");
const projectRoutes = require("./project_routes");

router.use("/teams", teamRoutes);
router.use("/projects", projectRoutes);

module.exports = router;
