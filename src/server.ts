import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { WeiboCrawler } from './weibo';

// 初始化MCP服务器，名称为"Weibo"
const server = new McpServer({
  name: "Weibo",
  version: "1.0.0"
});

// 创建WeiboCrawler实例处理微博API操作
const crawler = new WeiboCrawler();

/**
 * 根据关键词搜索微博用户
 */
server.tool("search_users",
  "根据关键词搜索微博用户并返回匹配的用户列表",
  { 
    keyword: z.string().describe("查找用户的搜索词"),
    limit: z.number().describe("返回的最大用户数量")
  },
  async ({ keyword, limit }) => {
    const users = await crawler.searchWeiboUsers(keyword, limit);
    return {
      content: [{ type: "text", text: JSON.stringify(users) }]
    };
  }
);

/**
 * 获取微博用户的资料信息
 */
server.tool("get_profile",
  "获取指定微博用户的详细资料信息",
  { 
    uid: z.number().describe("微博用户的唯一标识符")
  },
  async ({ uid }) => {
    const profile = await crawler.extractWeiboProfile(uid);
    return {
      content: [{ type: "text", text: JSON.stringify(profile) }]
    };
  }
);

/**
 * 获取微博用户的动态(帖子)
 */
server.tool("get_feeds",
  "获取指定微博用户的最新动态和帖子",
  { 
    uid: z.number().describe("微博用户的唯一标识符"),
    limit: z.number().describe("返回的最大动态数量")
  },
  async ({ uid, limit }) => {
    const feeds = await crawler.extractWeiboFeeds(uid, limit);
    return {
      content: [{ type: "text", text: JSON.stringify(feeds) }]
    };
  }
);

/**
 * 获取微博热搜榜
 */
server.tool("get_hot_search",
  "获取当前微博热搜榜的热门话题列表",
  { 
    limit: z.number().describe("返回的最大热搜条目数量")
  },
  async ({ limit }) => {
    const hotSearchList = await crawler.getHotSearchList(limit);
    return {
      content: [{ type: "text", text: JSON.stringify(hotSearchList) }]
    };
  }
);

/**
 * 根据关键词搜索微博内容
 */
server.tool("search_content",
  "根据关键词搜索微博内容并返回相关的微博帖子",
  { 
    keyword: z.string().describe("搜索微博内容的关键词"),
    limit: z.number().describe("返回的最大微博条目数量"),
    page: z.number().optional().describe("起始页码，默认为1")
  },
  async ({ keyword, limit, page }) => {
    const contents = await crawler.searchWeiboContent(keyword, limit, page || 1);
    return {
      content: [{ type: "text", text: JSON.stringify(contents) }]
    };
  }
);

// 导出MCP服务器实例和连接函数
export const connectServer = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

export default server; 