/**
 * 分页微博动态数据模型
 */
export interface PagedFeeds {
  /**
   * 分页信息，上一页最后一条动态的ID
   */
  SinceId: string | number | null;
  
  /**
   * 微博动态条目列表
   */
  Feeds: Record<string, any>[];
}

/**
 * 微博用户搜索结果数据模型
 */
export interface SearchResult {
  /**
   * 用户的唯一标识符
   */
  id: number;
  
  /**
   * 用户的显示名称
   */
  nickName: string;
  
  /**
   * 用户高分辨率头像图片的URL
   */
  avatarHD: string;
  
  /**
   * 用户的个人简介
   */
  description: string;
}

/**
 * 微博热搜榜条目数据模型
 */
export interface HotSearchItem {
  /**
   * 热搜关键词
   */
  keyword: string;
  
  /**
   * 热搜排名
   */
  rank: number;
  
  /**
   * 热搜热度
   */
  hotValue: number;
  
  /**
   * 标签类型（如新、热、爆等）
   */
  tag?: string;
  
  /**
   * 搜索链接
   */
  url?: string;
}

/**
 * 微博内容搜索结果数据模型
 */
export interface ContentSearchResult {
  /**
   * 微博ID
   */
  id: string;
  
  /**
   * 微博文本内容
   */
  text: string;
  
  /**
   * 创建时间
   */
  created_at: string;
  
  /**
   * 转发数
   */
  reposts_count: number;
  
  /**
   * 评论数
   */
  comments_count: number;
  
  /**
   * 点赞数
   */
  attitudes_count: number;
  
  /**
   * 发布该微博的用户信息
   */
  user: {
    id: number;
    screen_name: string;
    profile_image_url: string;
    verified: boolean;
  };
  
  /**
   * 图片链接列表（如果有）
   */
  pics?: string[];
  
  /**
   * 视频链接（如果有）
   */
  video_url?: string;
} 