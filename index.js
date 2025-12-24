import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const app = express();
const port = process.env.PORT || 3000;

// 创建 MCP Server
const mcpServer = new McpServer({
  name: "Simple Weather MCP",
  version: "1.0.0"
});

// 定义一个最简单的工具：假天气
mcpServer.tool(
  "get_weather",
  {
    city: "string"
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `${city} 今天是晴天，气温 25°C（示例数据）`
        }
      ]
    };
  }
);

// MCP 的 SSE 入口
app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/sse", res);
  await mcpServer.connect(transport);
});

app.listen(port, () => {
  console.log(`MCP Server running on port ${port}`);
});
