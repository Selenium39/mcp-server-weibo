# Weibo MCP Server (TypeScript Version)

This is a server based on the [Model Context Protocol](https://modelcontextprotocol.io) for scraping Weibo user information, feeds, and search functionality. This server can help retrieve detailed information about Weibo users, feed content, and perform user searches.

<a href="https://glama.ai/mcp/servers/@Selenium39/mcp-server-weibo">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Selenium39/mcp-server-weibo/badge" alt="Weibo Server MCP server" />
</a>

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

- `search_users(keyword, limit)`: 根据关键词搜索微博用户
- `get_profile(uid)`: 获取用户详细资料信息
- `get_feeds(uid, limit)`: 获取用户微博动态
- `get_hot_search(limit)`: 获取微博热搜榜
- `search_content(keyword, limit, page?)`: 根据关键词搜索微博内容

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