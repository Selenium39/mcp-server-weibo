import axios from 'axios';
import { DEFAULT_HEADERS, PROFILE_URL, FEEDS_URL } from './consts';
import { PagedFeeds, SearchResult } from './types';

/**
 * 微博爬虫类，用于从微博提取数据
 * 提供获取用户资料、动态和搜索用户的功能
 */
export class WeiboCrawler {
  /**
   * 从微博提取用户资料信息
   * 
   * @param uid 微博用户的唯一标识符
   * @returns 用户资料信息，如果提取失败则返回空对象
   */
  async extractWeiboProfile(uid: number): Promise<Record<string, any>> {
    try {
      const response = await axios.get(PROFILE_URL.replace('{userId}', uid.toString()), {
        headers: DEFAULT_HEADERS
      });
      return response.data.data.userInfo;
    } catch (error) {
      console.error(`无法获取UID为'${uid}'的用户资料`, error);
      return {};
    }
  }

  /**
   * 提取用户的微博动态，支持分页
   * 
   * @param uid 微博用户的唯一标识符
   * @param limit 最大提取的动态数量
   * @returns 用户微博动态列表
   */
  async extractWeiboFeeds(uid: number, limit: number): Promise<Record<string, any>[]> {
    const feeds: Record<string, any>[] = [];
    let sinceId = '';
    
    try {
      const containerId = await this.getContainerId(uid);
      if (!containerId) return feeds;

      while (feeds.length < limit) {
        const pagedFeeds = await this.extractFeeds(uid, containerId, sinceId);
        if (!pagedFeeds.Feeds || pagedFeeds.Feeds.length === 0) {
          break;
        }

        feeds.push(...pagedFeeds.Feeds);
        sinceId = pagedFeeds.SinceId as string;
        if (!sinceId) {
          break;
        }
      }
    } catch (error) {
      console.error(`无法获取UID为'${uid}'的动态`, error);
    }
    
    return feeds.slice(0, limit);
  }

  /**
   * 根据关键词搜索微博用户
   * 
   * @param keyword 查找用户的搜索词
   * @param limit 返回的最大用户数量
   * @returns 包含用户信息的SearchResult对象列表
   */
  async searchWeiboUsers(keyword: string, limit: number): Promise<SearchResult[]> {
    try {
      const params = { 'containerid': `100103type=3&q=${keyword}&t=`, 'page_type': 'searchall' };
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value);
      }
      const queryString = searchParams.toString();
      
      const response = await axios.get(`https://m.weibo.cn/api/container/getIndex?${queryString}`, {
        headers: DEFAULT_HEADERS
      });
      
      const result = response.data;
      const cards = result.data.cards;
      
      if (cards.length < 2) {
        return [];
      } else {
        const cardGroup = cards[1]['card_group'];
        return cardGroup.map((item: any) => this.toSearchResult(item.user)).slice(0, limit);
      }
    } catch (error) {
      console.error(`无法搜索关键词为'${keyword}'的用户`, error);
      return [];
    }
  }

  /**
   * 将原始用户数据转换为SearchResult对象
   * 
   * @param user 来自微博API的原始用户数据
   * @returns 格式化的用户信息
   */
  private toSearchResult(user: any): SearchResult {
    return {
      id: user.id,
      nickName: user.screen_name,
      avatarHD: user.avatar_hd,
      description: user.description
    };
  }

  /**
   * 获取用户微博动态的容器ID
   * 
   * @param uid 微博用户的唯一标识符
   * @returns 用户动态的容器ID，如果提取失败则返回null
   */
  private async getContainerId(uid: number): Promise<string | null> {
    try {
      const response = await axios.get(PROFILE_URL.replace('{userId}', uid.toString()), {
        headers: DEFAULT_HEADERS
      });
      
      const data = response.data;
      const tabsInfo = data?.data?.tabsInfo?.tabs || [];
      
      for (const tab of tabsInfo) {
        if (tab.tabKey === 'weibo') {
          return tab.containerid;
        }
      }
      return null;
    } catch (error) {
      console.error(`无法获取UID为'${uid}'的containerId`, error);
      return null;
    }
  }

  /**
   * 提取用户的单页微博动态
   * 
   * @param uid 微博用户的唯一标识符
   * @param containerId 用户动态的容器ID
   * @param sinceId 分页信息，上一页最后一条动态的ID
   * @returns 包含动态和下一页since_id的PagedFeeds对象
   */
  private async extractFeeds(uid: number, containerId: string, sinceId: string): Promise<PagedFeeds> {
    try {
      const url = FEEDS_URL
        .replace('{userId}', uid.toString())
        .replace('{containerId}', containerId)
        .replace('{sinceId}', sinceId);
      
      const response = await axios.get(url, { headers: DEFAULT_HEADERS });
      const data = response.data;
      
      const newSinceId = data?.data?.cardlistInfo?.since_id || '';
      const cards = data?.data?.cards || [];
      
      if (cards.length > 0) {
        return { SinceId: newSinceId, Feeds: cards };
      } else {
        return { SinceId: newSinceId, Feeds: [] };
      }
    } catch (error) {
      console.error(`无法获取UID为'${uid}'的动态`, error);
      return { SinceId: null, Feeds: [] };
    }
  }
} 