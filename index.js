import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {z} from "zod";

const server =  new McpServer(
    {
        name: "F1 API",
        description: "An API for Formula 1 data",
        version: "1.0.0",
        baseUrl: "https://api.f1api.com",


    }
)