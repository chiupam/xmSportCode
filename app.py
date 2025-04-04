from flask import Flask, request, jsonify
import requests
import os
import re

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def api_proxy():
    try:
        # 获取请求参数
        phone_number = request.form.get('phoneNumber')
        password = request.form.get('password')
        
        if not phone_number or not password:
            return jsonify({"error": "手机号码和密码不能为空"}), 400
            
        # 构建请求URL和头部
        url = f"https://api-user.huami.com/registrations/+86{phone_number}/tokens"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "User-Agent": "MiFit/4.6.0 (iPhone; iOS 14.0.1; Scale/2.00)"
        }
        
        # 构建请求数据
        data = {
            "client_id": "HuaMi",
            "password": password,
            "redirect_uri": "https://s3-us-west-2.amazonaws.com/hm-registration/successsignin.html",
            "token": "access"
        }
        
        # 发送请求到华米API，禁止重定向
        response = requests.post(url, headers=headers, data=data, allow_redirects=False)
        
        # 从Location头部提取access token
        if 'Location' in response.headers:
            match = re.search("(?<=access=).*?(?=&)", response.headers["Location"])
            if match:
                return match.group()
            else:
                return jsonify({"error": "无法提取access token"}), 500
        else:
            return jsonify({"error": "响应中没有Location头部", "response": response.text}), 500
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 添加健康检查端点
@app.route('/', methods=['GET'])
def health_check():
    return "API服务正常运行中"

# Vercel需要这个入口点
app.debug = False

# Vercel部署不需要这个__main__块，但保留它用于本地测试
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 