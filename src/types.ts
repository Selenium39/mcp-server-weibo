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