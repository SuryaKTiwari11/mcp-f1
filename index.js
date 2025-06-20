import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  getDrivers,
  searchDrivers,
  getDriverById,
  getCurrentDrivers,
} from "./functions/driver-function.js";
import {
  getTeams,
  searchTeams,
  getTeamById,
  getCurrentTeams,
} from "./functions/team-function.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "F1 API",
  description: "An API for Formula 1 data",
  version: "1.0.0",
  baseUrl: "https://f1connectapi.vercel.app",
  tools: [
    {
      name: "ping",
      description: "Simple ping test tool",
      parameters: z.object({}),
      handler: async () => {
        return { message: "pong" };
      },
    },
    {
      name: "get_all_drivers",
      description:
        "Get all Formula 1 drivers, including active and retired drivers",
      parameters: z.object({
        limit: z
          .number()
          .optional()
          .describe("Number of records to return per request (default: 30)"),
        offset: z
          .number()
          .optional()
          .describe(
            "Number of records to skip before starting to fetch (default: 0)"
          ),
      }),
      handler: async ({ limit = 30, offset = 0 }) => {
        const req = { query: { limit, offset }, params: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await getDrivers(req, res);
        return responseData;
      },
    },
    {
      name: "search_drivers",
      description: "Search for Formula 1 drivers by name or surname",
      parameters: z.object({
        q: z.string().describe("Search query for driver name or surname"),
        limit: z
          .number()
          .optional()
          .describe("Number of records to return per request (default: 30)"),
        offset: z
          .number()
          .optional()
          .describe(
            "Number of records to skip before starting to fetch (default: 0)"
          ),
      }),
      handler: async ({ q, limit = 30, offset = 0 }) => {
        const req = { query: { q, limit, offset }, params: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await searchDrivers(req, res);
        return responseData;
      },
    },
    {
      name: "get_driver_by_id",
      description: "Get a Formula 1 driver by their ID",
      parameters: z.object({
        driverId: z.string().describe("The unique identifier for the driver"),
      }),
      handler: async ({ driverId }) => {
        const req = { params: { driverId }, query: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await getDriverById(req, res);
        return responseData;
      },
    },
    {
      name: "get_current_drivers",
      description: "Get all current Formula 1 drivers for the current season",
      parameters: z.object({
        limit: z
          .number()
          .optional()
          .describe("Number of records to return per request (default: 30)"),
        offset: z
          .number()
          .optional()
          .describe(
            "Number of records to skip before starting to fetch (default: 0)"
          ),
      }),
      handler: async ({ limit = 30, offset = 0 }) => {
        const req = { query: { limit, offset }, params: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await getCurrentDrivers(req, res);
        return responseData;
      },
    },
    {
      name: "get_all_teams",
      description: "Get all Formula 1 teams, including active and past teams",
      parameters: z.object({
        limit: z
          .number()
          .optional()
          .describe("Number of records to return per request (default: 30)"),
        offset: z
          .number()
          .optional()
          .describe(
            "Number of records to skip before starting to fetch (default: 0)"
          ),
      }),
      handler: async ({ limit = 30, offset = 0 }) => {
        const req = { query: { limit, offset }, params: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await getTeams(req, res);
        return responseData;
      },
    },
    {
      name: "search_teams",
      description: "Search for Formula 1 teams by team name",
      parameters: z.object({
        q: z.string().describe("Search query for team name"),
        limit: z
          .number()
          .optional()
          .describe("Number of records to return per request (default: 30)"),
        offset: z
          .number()
          .optional()
          .describe(
            "Number of records to skip before starting to fetch (default: 0)"
          ),
      }),
      handler: async ({ q, limit = 30, offset = 0 }) => {
        const req = { query: { q, limit, offset }, params: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await searchTeams(req, res);
        return responseData;
      },
    },
    {
      name: "get_team_by_id",
      description: "Get a Formula 1 team by its ID",
      parameters: z.object({
        teamId: z.string().describe("The unique identifier for the team"),
      }),
      handler: async ({ teamId }) => {
        const req = { params: { teamId }, query: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await getTeamById(req, res);
        return responseData;
      },
    },
    {
      name: "get_current_teams",
      description: "Get all current Formula 1 teams for the current season",
      parameters: z.object({
        limit: z
          .number()
          .optional()
          .describe("Number of records to return per request (default: 30)"),
        offset: z
          .number()
          .optional()
          .describe(
            "Number of records to skip before starting to fetch (default: 0)"
          ),
      }),
      handler: async ({ limit = 30, offset = 0 }) => {
        const req = { query: { limit, offset }, params: {} };
        let responseData = null;
        const res = {
          json: (data) => {
            responseData = data;
          },
          status: () => res,
        };
        await getCurrentTeams(req, res);
        return responseData;
      },
    },
  ],
});

function init() {
  try {
    const transport = new StdioServerTransport();
    server.connect(transport);
    // Use console.error for status/debug messages
    console.error("F1 MCP server initialized successfully");
  } catch (error) {
    console.error("Error initializing F1 MCP server:", error);
  }
}

init();
