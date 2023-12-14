const router = require("express").Router();
const db = require("../../db/index");

//ROUTES

//CREATE A TEAM
router.post("/", async (req, res) => {
  const { name, team_leader, members, points } = req.body;
  try {
    const createTeam = await db.query(
      "INSERT INTO teams(name, team_leader, members, points) VALUES($1,$2,$3,$4) RETURNING * ",
      [name, team_leader, members, points]
    );
    res.status(200).json({
      status: "success",
      team: createTeam.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL TEAMS
router.get("/", async (req, res) => {
  try {
    const allTeams = await db.query("SELECT * FROM teams");
    res.status(200).json({
      status: "success",
      teams: allTeams.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

// GET A SINGLE TEAM
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleTeam = await db.query(
      "SELECT * FROM teams WHERE team_id = $1",
      [id]
    );
    res.status(200).json({
      status: "success",
      team: singleTeam.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE A TEAM
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, team_leader, members, points } = req.body;
  try {
    const updateTeam = await db.query(
      "UPDATE teams SET name = $1, team_leader = $2, members = $3, points = $4 WHERE team_id = $5 RETURNING *",
      [name, team_leader, members, points, id]
    );
    res.status(202).json({
      status: "success",
      team: updateTeam.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE A TEAM
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTeam = await db.query("DELETE FROM teams WHERE team_id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "success",
      deleted: deleteTeam.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
