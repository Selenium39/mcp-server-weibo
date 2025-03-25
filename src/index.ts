#!/usr/bin/env node

import { connectServer } from './server';

// 启动MCP服务器，使用标准输入/输出作为通信通道
connectServer().catch(console.error); 