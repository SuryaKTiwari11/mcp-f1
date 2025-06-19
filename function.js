import { F1Api } from "@f1api/sdk";

const f1api = new F1Api();

async function getDrivers(req, res) {
  try {
    const drivers = await f1api.drivers.getAll();
    console.log(drivers)
    res.json(drivers);

  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}




async function searchDrivers(req, res) {
    const { q, limit = 30, offset = 0 } = req.query;
    try {
        const drivers = await f1api.drivers.search(q, { limit, offset });
        res.json(drivers);
    } catch (error) {
        console.error("Error searching drivers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export { getDrivers, searchDrivers };