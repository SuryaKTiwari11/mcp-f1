// This file contains the implementation of F1 API endpoints based on the driver-rawdata.md documentation

import axios from "axios";

// Get all drivers
export async function getDrivers(req, res) {
  try {
    const limit = req.query.limit || 30;
    const offset = req.query.offset || 0;
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/drivers?limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch drivers", message: error.message });
  }
}

// Search drivers by name or surname
export async function searchDrivers(req, res) {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }
    const limit = req.query.limit || 30;
    const offset = req.query.offset || 0;
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/drivers/search?q=${encodeURIComponent(
        q
      )}&limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search drivers", message: error.message });
  }
}

// Get driver by ID
export async function getDriverById(req, res) {
  try {
    const { driverId } = req.params;
    if (!driverId) {
      return res.status(400).json({ error: "Driver ID is required" });
    }
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/drivers/${encodeURIComponent(driverId)}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch driver", message: error.message });
  }
}

// Get current drivers
export async function getCurrentDrivers(req, res) {
  try {
    const limit = req.query.limit || 30;
    const offset = req.query.offset || 0;
    const response = await axios.get(
      `https://f1connectapi.vercel.app/api/drivers/current?limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch current drivers",
      message: error.message,
    });
  }
}
