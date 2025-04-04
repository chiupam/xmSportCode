const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// 中间件配置
app.use(bodyParser.urlencoded({ extended: true }));

// 健康检查端点
app.get('/', (req, res) => {
  res.send('API服务正常运行中');
});

// API代理端点
app.post('/', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    
    // 验证参数
    if (!phoneNumber || !password) {
      return res.status(400).json({ status: false, code: '手机号码和密码不能为空' });
    }
    
    // 构建请求URL和头部
    const url = `https://api-user.huami.com/registrations/+86${phoneNumber}/tokens`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'User-Agent': 'MiFit/4.6.0 (iPhone; iOS 14.0.1; Scale/2.00)'
    };
    
    // 构建请求数据
    const data = new URLSearchParams();
    data.append('client_id', 'HuaMi');
    data.append('password', password);
    data.append('redirect_uri', 'https://s3-us-west-2.amazonaws.com/hm-registration/successsignin.html');
    data.append('token', 'access');
    
    // 发送请求到华米API，禁止重定向
    const response = await axios({
      method: 'post',
      url: url,
      headers: headers,
      data: data.toString(),
      maxRedirects: 0, // 禁止重定向
      validateStatus: status => true // 允许所有状态码
    });
    
    // 从Location头部提取access token
    if (response.headers.location) {
      const match = /(?<=access=).*?(?=&)/.exec(response.headers.location);
      if (match) {
        return res.json({ status: true, code: match[0] });
      } else {
        return res.status(500).json({ status: false, code: '无法提取access token' });
      }
    } else {
      return res.status(500).json({ 
        status: false, 
        code: '响应中没有Location头部',
        response: response.data 
      });
    }
  } catch (error) {
    // 处理axios错误，区分重定向错误和其他错误
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      // 重定向错误，尝试从Location头部提取access token
      if (error.response.headers.location) {
        const match = /(?<=access=).*?(?=&)/.exec(error.response.headers.location);
        if (match) {
          return res.json({ status: true, code: match[0] });
        }
      }
    }
    
    // 其他错误
    return res.status(500).json({ 
      status: false,
      code: error.message || '请求处理失败',
      details: error.response ? error.response.data : null
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`API服务运行在端口 ${port}`);
});

// 导出Express应用供Vercel使用
module.exports = app; 