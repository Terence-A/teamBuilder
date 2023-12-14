const router = require("express").Router();
const db = require("../../db/index");

//ROUTES

//CREATE A PROJECT
router.post("/", async (req, res) => {
  const { name, description, points, due_date } = req.body;
  try {
    const createProject = await db.query(
      "INSERT INTO projects(name, description, points, due_date) VALUES($1,$2,$3,$4) RETURNING * ",
      [name, description, points, due_date]
    );
    res.status(200).json({
      status: "success",
      project: createProject.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const allProjects = await db.query("SELECT * FROM projects");
    res.status(200).json({
      status: "success",
      projects: allProjects.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

//GET SINGLE PROJECT
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.query(
      "SELECT * FROM projects WHERE project_id = $1",
      [id]
    );
    res.status(200).json({
      status: "success",
      project: project.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE A PROJECT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, points, due_date } = req.body;
  try {
    const updateProject = await db.query(
      "UPDATE projects SET name= $1, description = $2, points = $3, due_date = $4 WHERE project_id = $5 RETURNING *",
      [name, description, points, due_date, id]
    );
    res.status(202).json({
      status: "success",
      project: updateProject.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE A PROJECT
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProject = await db.query(
      "DELETE FROM projects WHERE project_id = $1",
      [id]
    );
    res.status(200).json({
      status: "success",
      deleted: deleteProject.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
