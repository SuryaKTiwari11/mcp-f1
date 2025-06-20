# F1 API MCP Server

A Model Context Protocol (MCP) server that provides access to Formula 1 driver and team data.

## Description

This project implements an MCP server that exposes Formula 1 driver and team data through the Model Context Protocol (MCP). The server provides access to information about F1 drivers and teams, including both current and historical data.

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mcp-f1

# Install dependencies
npm install
```

## Usage

### Running the Server

```bash
# Start the server
npm start
```

### Configuring Claude to Use This MCP Server

To use this MCP server with Claude, you need to configure Claude to recognize and connect to it:

1. Locate your Claude configuration file (usually at `%APPDATA%\Claude\claude_desktop_config.json`)

2. Add the following configuration to enable the F1 MCP server:

```json
{
  "mcpServers": {
    "f1": {
      "command": "node",
      "args": ["C:/Users/SURYA/Desktop/mcp-f1/index.js"]
    }
  }
}
```

3. Adjust the path in the `args` field to match where you've installed the project.

4. Restart Claude for the changes to take effect.

### Troubleshooting

If the F1 server shows as "Disabled" in Claude:

1. Make sure you are running the server with `npm start` and that it is not crashing.
2. Check that the path in your Claude configuration points to the correct location of `index.js`.
3. Ensure there are no errors in your Node.js installation (Node.js 18+ recommended).
4. Make sure you are not outputting anything to stdout except valid JSON (do not use `console.log`, only `console.error` for debugging).
5. Check Claude's logs for any error messages.
6. Ensure your `index.js` and all function files use ESM (import/export) syntax, not CommonJS (require/module.exports).
7. If you make changes to the code, simply restart the server—no build step is needed for JavaScript.

### Available Tools

This MCP server provides the following tools:

- get_all_drivers
- search_drivers
- get_driver_by_id
- get_current_drivers
- get_all_teams
- search_teams
- get_team_by_id
- get_current_teams

## API Endpoints

The F1 API MCP server exposes the following tools:

### get_all_drivers

Get all Formula 1 drivers, including both active and retired drivers.

**Parameters:**

- `limit` (optional): Number of records to return per request (default: 30)
- `offset` (optional): Number of records to skip before starting to fetch (default: 0)

### search_drivers

Search for Formula 1 drivers by name or surname.

**Parameters:**

- `q`: Search query for driver name or surname
- `limit` (optional): Number of records to return per request (default: 30)
- `offset` (optional): Number of records to skip before starting to fetch (default: 0)

### get_driver_by_id

Get a Formula 1 driver by their ID.

**Parameters:**

- `driverId`: The unique identifier for the driver

### get_current_drivers

Get all Formula 1 drivers from the current season.

**Parameters:**

- `limit` (optional): Number of records to return per request (default: 30)
- `offset` (optional): Number of records to skip before starting to fetch (default: 0)

### get_all_teams

Get all Formula 1 teams, including both active and historical teams.

**Parameters:**

- `limit` (optional): Number of records to return per request (default: 30)
- `offset` (optional): Number of records to skip before starting to fetch (default: 0)

### search_teams

Search for Formula 1 teams by name.

**Parameters:**

- `q`: Search query for team name
- `limit` (optional): Number of records to return per request (default: 30)
- `offset` (optional): Number of records to skip before starting to fetch (default: 0)

### get_team_by_id

Get a Formula 1 team by their ID.

**Parameters:**

- `teamId`: The unique identifier for the team

### get_current_teams

Get all Formula 1 teams from the current season.

**Parameters:**

- `limit` (optional): Number of records to return per request (default: 30)
- `offset` (optional): Number of records to skip before starting to fetch (default: 0)

## Response Format

Each endpoint returns data in a standardized format with metadata such as:

- API base URL
- Full request URL
- Pagination information (limit, offset, total)
- Season information (where applicable)
- Driver data including ID, name, nationality, racing number, etc.
- Team data including ID, name, nationality, championships, etc.

## Development

This project is built on Node.js and uses:

- Model Context Protocol SDK
- Zod for schema validation
- Axios for HTTP requests

## License

ISC
