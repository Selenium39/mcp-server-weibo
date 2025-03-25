# Weibo MCP Server (TypeScript Version)

This is a server based on the [Model Context Protocol](https://modelcontextprotocol.io) for scraping Weibo user information, feeds, and search functionality. This server can help retrieve detailed information about Weibo users, feed content, and perform user searches.

## Installation

Install from source code:

```json
{
    "mcpServers": {
        "weibo": {
            "command": "npx",
            "args": [
                "--from",
                "git+https://github.com/Selenium39/mcp-server-weibo.git",
                "mcp-server-weibo"
            ]
        }
    }
}
```

Install from package manager:

```json
{
    "mcpServers": {
        "weibo": {
            "command": "npx",
            "args": ["mcp-server-weibo"],
        }
    }
}
```

## Components

### Tools

- `search_users(keyword, limit)`: For searching Weibo users
- `get_profile(uid)`: Get detailed user information
- `get_feeds(uid, limit)`: Get user feeds

### Resources

None

### Prompts

None

## Requirements

- Node.js >= 18.0.0

## License

MIT License

## Disclaimer

This project is not affiliated with Weibo and is for learning and research purposes only. 