import axios from "axios";
export async function getTeams(req, res) {
  try {
    const limit = req.query.limit || 30;
    const offset = req.query.offset || 0;
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/teams?limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch teams", message: error.message });
  }
}
export async function searchTeams(req, res) {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }
    const limit = req.query.limit || 30;
    const offset = req.query.offset || 0;
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/teams/search?q=${encodeURIComponent(
        q
      )}&limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search teams", message: error.message });
  }
}

export async function getTeamById(req, res) {
  try {
    const { teamId } = req.params;
    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required" });
    }
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/teams/${encodeURIComponent(teamId)}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch team", message: error.message });
  }
}
export async function getCurrentTeams(req, res) {
  try {
    const limit = req.query.limit || 30;
    const offset = req.query.offset || 0;
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/teams/current?limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch current teams", message: error.message });
  }
}

