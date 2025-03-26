/**
 * 微博API请求的默认HTTP头
 */
export const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

/**
 * 获取用户资料的URL模板
 * {userId}将被替换为实际的用户ID
 */
export const PROFILE_URL = 'https://m.weibo.cn/api/container/getIndex?type=uid&value={userId}';

/**
 * 获取用户微博动态的URL模板
 * {userId}: 用户的唯一标识符
 * {containerId}: 用户动态的容器ID
 * {sinceId}: 分页信息，上一页最后一条动态的ID
 */
export const FEEDS_URL = 'https://m.weibo.cn/api/container/getIndex?type=uid&value={userId}&containerid={containerId}&since_id={sinceId}';

/**
 * 获取微博热搜榜的URL
 */
export const HOT_SEARCH_URL = 'https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot'; 