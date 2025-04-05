# xmSportCode

<div align="center">

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-brightgreen?style=flat-square)](https://xmsportcode.vercel.app)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)](https://github.com/chiupam/xmSportCode)
[![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg?style=flat-square)](https://github.com/chiupam/xmSportCode/commits/main)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

这是一个运动相关的项目仓库，提供华米运动API访问代理服务。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchiupam%2FxmSportCode)

## 📝 简介
该项目包含一个简单的API代理服务，用于与华米运动API进行交互，部署到Vercel云平台。使用Node.js实现。

## ✨ 功能特点
- 📡 提供POST接口代理请求到华米API
- 🔑 自动提取access token并返回
- 💻 使用Node.js + Express框架开发
- 🚀 专为Vercel云平台设计
- 🔄 享受Vercel的每月可重置免费请求次数

## 🤖 自动化选项

如果不想手动部署和调用API，可以访问 [github.com/chiupam/xmSport](https://github.com/chiupam/xmSport) 仓库，该仓库使用GitHub Actions自动执行完整流程。

## 🚀 Vercel部署教程

### 快速部署
点击上方的 "Deploy with Vercel" 按钮，一键部署到您的Vercel账户。

### 方法一：通过网页界面部署
1. 创建Vercel账号
   - 访问 [Vercel官网](https://vercel.com/) 
   - 使用GitHub账号直接登录

2. 从GitHub仓库导入项目
   - 首先确保您的代码已推送到GitHub仓库
   ```
   git add .
   git commit -m "配置Vercel部署"
   git push origin main
   ```
   - 在Vercel控制台中点击"Add New Project"
   - 选择"Import Git Repository"并选择您的xmSportCode仓库
   - Vercel会自动识别Node.js项目并使用适当的构建设置

3. 部署设置
   - 在部署设置页面，保持默认设置即可
   - 点击"Deploy"按钮开始部署

4. 获取公共URL
   - 部署完成后，Vercel会自动为您的应用生成一个公共URL
   - 通常格式为：https://your-project-name.vercel.app

### 方法二：通过CLI命令行部署
1. 安装Vercel CLI
   ```
   npm i -g vercel
   ```

2. 登录到Vercel
   ```
   vercel login
   ```

3. 部署项目
   ```
   cd xmSportCode
   vercel
   ```
   按照命令行提示进行配置

4. 如需更新部署
   ```
   vercel --prod
   ```

## 💻 本地开发
1. 安装依赖
   ```
   npm install
   ```

2. 启动开发服务器
   ```
   npm run dev
   ```
   或
   ```
   npm start
   ```

3. 本地测试
   ```
   curl -X POST -d "phoneNumber=123456789&password=yourpassword" http://localhost:3000/api
   ```
   
## 📋 使用方法
向API发送POST请求：

```
POST https://your-project-name.vercel.app/api
Content-Type: application/x-www-form-urlencoded

phoneNumber=123456789&password=yourpassword
```

请求参数:
- phoneNumber: 手机号码（不需要+86前缀）
- password: 密码

响应:
- 成功: 返回JSON格式 `{"status": true, "code": "access_token"}`
- 失败: 返回JSON格式 `{"status": false, "code": "错误信息"}`

## 🔧 故障排除
- 如果部署失败，检查Vercel控制台中的构建日志
- 如果需要查看应用日志，可以在Vercel控制台中的"Logs"标签查看
- 确保您的GitHub仓库包含了所有必要的文件，包括vercel.json和package.json

## 📜 许可证
本项目采用MIT许可证

