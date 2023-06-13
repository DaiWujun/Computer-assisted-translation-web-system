# README.md

## 本文档提供了Web系统的API接口说明，用于前后端交互和数据传输。
下面为各个API接口的URL、请求方法、请求参数和响应示例。

### 用户相关API：

#### 注册用户

请求方法：POST 

URL：/api/users/register 

请求参数：
~~~

{ 
  "username": "string", 
  "password": "string" 
} 
~~~ 
响应：
~~~

{
  "success": "boolean",
  "message": "string"
}
~~~
#### 用户登录  

请求方法：POST   
URL: /api/users/login  
请求参数：   
~~~
{ 
  "username": "string", 
  "password": "string" 
} 
~~~ 
响应： 
~~~ 
{ 
  "success": "boolean", 
  "message": "string", 
  "token": "string" 
} 
~~~ 
### 主界面相关API： 
 
#### 上传文件   
请求方法：POST   
URL：/api/files/upload   
请求参数（使用multipart/form-data）：   
~~~ 
{ 
  "file": "file" 
} 
~~~ 
响应： 
~~~ 
{ 
  "success": "boolean", 
  "message": "string", 
  "fileId": "string" 
} 
~~~ 
### 翻译记忆库相关API：  

#### 获取用户项目列表  

请求方法：GET   
URL：/api/projects   
响应：   
~~~ 
{   
  "success": "boolean", 
  "message": "string", 
  "projects": [ 
    { 
      "projectId": "string", 
      "projectName": "string", 
      "createdAt": "string", 
      "updatedAt": "string" 
    } 
  ] 
} 

~~~ 
#### 按关键词搜索项目 
 
请求方法：GET  
URL：/api/projects/search?keyword={keyword}  
响应：  
~~~  
{  
  "success": "boolean",  
  "message": "string", 
  "projects": [ 
    { 
      "projectId": "string", 
      "projectName": "string", 
      "createdAt": "string", 
      "updatedAt": "string" 
    } 
  ] 
} 
~~~ 
#### 删除项目  
 
请求方法：DELETE  
URL：/api/projects/{projectId}  
响应：   
~~~ 
{ 
  "success": "boolean", 
  "message": "string" 
} 
~~~ 
###  术语库相关API： 

#### 获取用户术语列表 

请求方法：GET  
URL：/api/terms  
响应：  
~~~ 
{ 
  "success": "boolean", 
  "message": "string", 
  "terms": [ 
    { 
      "termId": "string", 
      "english": "string", 
      "chinese": "string" 
    } 
  ] 
} 
~~~ 
#### 按关键词搜索术语 

请求方法：GET  
URL：/api/terms/search?keyword={keyword}  
响应：  
~~~ 
{ 
  "success": "boolean", 
  "message": "string", 
  "terms": [ 
    { 
      "termId": "string", 
      "english": "string", 
      "chinese": "string" 
    } 
  ] 
} 
~~~ 
#### 删除术语 
 
请求方法：DELETE  
URL：/api/terms/{termId}  
响应：  
~~~ 
{ 
  "success": "boolean", 
  "message": "string" 
} 
~~~ 
#### 添加术语  

请求方法：POST  
URL：/api/terms  
请求参数：  
~~~  
{ 
  "english": "string", 
  "chinese": "string" 
} 
~~~ 
响应： 
~~~ 
{ 
  "success": "boolean", 
  "message": "string" 
} 
~~~ 
###  翻译界面相关API： 

#### 提取文件内容 

请求方法：GET  
URL：/api/files/{fileId}/content  
响应：  
~~~ 
{ 
  "success": "boolean", 
  "message": "string", 
  "content": "string" 
} 
~~~ 
#### 翻译内容  

请求方法：POST  
URL：/api/translate  
请求参数：  
~~~ 
{ 
  "content": "string", 
  "sourceLang": "string", 
  "targetLang": "string" 
} 
~~~ 
响应：   
~~~ 
{ 
  "success": "boolean", 
  "message": "string", 
  "translatedContent": "string" 
} 
~~~ 
#### 保存翻译项目到翻译记忆库  
 
请求方法：POST  
URL：/api/projects  
请求参数：  
~~~ 
{ 
  "projectName": "string", 
  "originalContent": "string",  
  "translatedContent": "string" 
} 
~~~ 
响应：  
~~~  
{ 
  "success": "boolean", 
  "message": "string" 
} 
~~~ 
