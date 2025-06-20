import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
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

const server = new McpServer({
  name: "F1 API",
  description: "An API for Formula 1 data",
  version: "1.0.0",
  baseUrl: "https://f1connectapi.vercel.app"
});

server.registerTool(
  "get_all_drivers",
  {
    title: "Get All Drivers",
    description:
      "Get all Formula 1 drivers, including active and retired drivers",
    inputSchema: z.object({
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
  },
  async ({ limit = 30, offset = 0 }) => {
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
  }
);

server.registerTool(
  "search_drivers",
  {
    title: "Search Drivers",
    description: "Search for Formula 1 drivers by name or surname",
    inputSchema: z.object({
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
  },
  async ({ q, limit = 30, offset = 0 }) => {
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
  }
);

server.registerTool(
  "get_driver_by_id",
  {
    title: "Get Driver By ID",
    description: "Get a Formula 1 driver by their ID",
    inputSchema: z.object({
      driverId: z.string().describe("The unique identifier for the driver"),
    }),
  },
  async ({ driverId }) => {
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
  }
);

server.registerTool(
  "get_current_drivers",
  {
    title: "Get Current Drivers",
    description: "Get all current Formula 1 drivers for the current season",
    inputSchema: z.object({
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
  },
  async ({ limit = 30, offset = 0 }) => {
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
  }
);

server.registerTool(
  "get_all_teams",
  {
    title: "Get All Teams",
    description: "Get all Formula 1 teams, including active and past teams",
    inputSchema: z.object({
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
  },
  async ({ limit = 30, offset = 0 }) => {
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
  }
);

server.registerTool(
  "search_teams",
  {
    title: "Search Teams",
    description: "Search for Formula 1 teams by team name",
    inputSchema: z.object({
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
  },
  async ({ q, limit = 30, offset = 0 }) => {
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
  }
);

server.registerTool(
  "get_team_by_id",
  {
    title: "Get Team By ID",
    description: "Get a Formula 1 team by its ID",
    inputSchema: z.object({
      teamId: z.string().describe("The unique identifier for the team"),
    }),
  },
  async ({ teamId }) => {
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
  }
);

server.registerTool(
  "get_current_teams",
  {
    title: "Get Current Teams",
    description: "Get all current Formula 1 teams for the current season",
    inputSchema: z.object({
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
  },
  async ({ limit = 30, offset = 0 }) => {
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
  }
);
function init() {
  try {
    const transport = new StdioServerTransport();
    server.connect(transport);
    console.error("F1 MCP server initialized successfully");
  } catch (error) {
    console.error("Error initializing F1 MCP server:", error);
  }
}
init();