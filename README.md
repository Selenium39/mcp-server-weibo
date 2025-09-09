# Weibo MCP Server (TypeScript 版本)

## 安装

从源码安装：

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

从包管理器安装：

```json
{
    "mcpServers": {
        "weibo": {
            "command": "npx",
            "args": ["mcp-server-weibo"]
        }
    }
}
```

## 组件

### Tools

- `search_users(keyword, limit)`：根据关键词搜索微博用户
- `get_profile(uid)`：获取用户详细资料信息
- `get_feeds(uid, limit)`：获取用户微博动态
- `get_hot_search(limit)`：获取微博热搜榜
- `search_content(keyword, limit, page?)`：根据关键词搜索微博内容

### Resources

无

### Prompts

无

## 系统要求

- Node.js >= 18.0.0

## 许可证

MIT License

## 免责声明

本项目与微博无关，仅用于学习和研究目的。

## MCP Server推荐

[mcp-server-tempmail](https://chat-tempmail.com/zh/mcp-server)
