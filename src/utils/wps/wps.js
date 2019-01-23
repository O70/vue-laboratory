import { launchwps } from '@/utils/wps/launchwps'
import { checkWPSProtocol, scb, fcb } from '@/utils/wps/checkwps'
import base64 from '@/utils/wps/base64'

/**
 * 启动参数
 */
const startData = {
  name: 'oaassist',
  function: 'dispatcher', // wps插件包方法入口
  info: {
    fucns: []
  }
}

/**
 * 检测WPS，需传入成功和失败的回调函数
 *
 * @param {*} scb
 * @param {*} fcb
 */
function _checkWPS(scb, fcb) {
  // 协议检测
  checkWPSProtocol(scb, fcb)
}

/**
 * 启动WPS
 *
 * @param {*} startData
 */
function _runParams(params) {
  _checkWPS(scb, fcb)
  startData.info.fucns = params
  var data = JSON.stringify(startData)
  var result = base64.encode(data)
  launchwps(getWpsComponentBySuffix('doc'), result)
}

function _inArray(suffix, array) {
  for (let i = 0; i < array.length; i++) {
    if (suffix.indexOf(array[i]) !== -1) {
      return true
    }
  }
  return false
}

// 通过后缀返回组件名
function getWpsComponentBySuffix(suffix) {
  var wpsSuffix = ['doc', 'docx', 'wps', 'wpsx']
  var etSuffix = ['xls', 'xlsx', 'et', 'etx']
  var wppSuffix = ['ppt', 'pptx', 'dps', 'dpsx']
  suffix = suffix.toLowerCase()
  if (_inArray(suffix, wpsSuffix)) {
    return 'wps' // 文字
  } else if (_inArray(suffix, etSuffix)) {
    return 'et' // 表格
  } else if (_inArray(suffix, wppSuffix)) {
    return 'wpp' // 演示
  } else {
    alert('无效后缀')
  }
}

// 打开新文档
/**
 * 打开文档
 * @param params
 ```js
 _wps.newDoc({
       uploadPath: url + this.getPath('file/uploadFromWps'), //保存文档接口
       strBookmarkDataPath: url + this.getPath('bookmark/getAllBookmark'),//书签列表接口
       templatePath: url + this.getPath('template/paging'),//正文模板列表接口
       buttonGroups: 'btnSaveAsFile,btnImportDoc,btnPageSetup,btnInsertDate,btnSelectBookmark,btnImportTemplate'
   })
 ```
 */
function newDoc(params) {
  _runParams([{ 'NewDoc': params }])
}

/**
 * 打开指定文档
 * @param {JSON} params
 * @example
 ```js
 {
'docId': '文档ID',
'uploadPath': '保存文档接口',
'fileName': '获取服务器文档接口',
'uploadNewPath': '上传清稿后路径',
'saveOriginFile':3,   //清稿保存类型， 1，保存清稿前，保存路径为uploadNewPath，2, 保存清稿后,uploadPath，3, 都保存,uploadPath,uploadNewPath，saveOriginFile不传，保存清稿后的uploadPath
'userName':'只保存，拒绝用户自己的修改',
'revisionCtrl':{  //痕迹控制 ，不传正常打开
    'bOpenRevision':true, //true(打开)false(关闭)修订
    'bShowRevision':true  //true(显示)/false(关闭)痕迹
}
openType: {       //文档打开方式 ，不传正常打开
    //文档保护类型，-1：不启用保护模式，0：只允许对现有内容进行修订，1：只允许添加批注，2：只允许修改窗体域，3：只读
    'protectType': 3,
    'password': '123456'
}
}
 ```
 */
const openDoc = function openDoc(params, funcs) {
  var data = []
  data.push({ 'OpenDoc': params })
  if (funcs) {
    var funArr = funcs.split(',')
    for (let i = 0; i < funArr.length; i++) {
      var fun = {}
      fun[funArr[i]] = {}
      data.push(fun)
    }
  }
  _runParams(data)
}

/**
 * 在线编辑文档（文档不落地）
 * @param params
 * @example
 ```js
 _wps.onlineEditDoc({
      docId: docId, //文档ID
      uploadPath: url + this.getPath('file/upload?id=' + docId), //保存文档接口
      fileName: url + this.getPath('file/download/' + docId), //根据文档id获取服务器文档接口
      strBookmarkDataPath: url + this.getPath('bookmark/getAllBookmark'),//书签列表接口
      templatePath: url + this.getPath('template/paging'),//正文模板列表接口
      buttonGroups: 'btnSaveAsFile,btnImportDoc,btnPageSetup,btnInsertDate,btnSelectBookmark,btnImportTemplate',
      userName: '王五'//用户名
  })
 ```
 */
const onlineEditDoc = function onlineEditDoc(params) {
  _runParams([{ 'onlineEditDoc': params }])
}

/**
 * 套红头的方法
 * @param params 打开文档传递的参数
 * @param templateURL 红头文件的获取路径
 * @param replaceBookMark 被替换的书签名
 * @example
 ```js
 _wps.insertRedHeadDocFromWeb({
       docId: fileId, //文档ID
       uploadPath: url + dispatch.getPath('file/upload?id=' + fileId), //保存文档接口
       fileName: url + dispatch.getPath('file/download/' + fileId), //根据文档id获取服务器文档接口
       buttonGroups: 'btnInsertRedHeader',
       openType: {
          'protectType': -1,
          'password': '123456'
       }
   },url + dispatch.getPath('file/download/' + templateId),'Content')//红头模板中填充正文的位置书签名
 ```
 */
const insertRedHeadDocFromWeb = function insertRedHeadDocFromWeb(params, templateURL, replaceBookMark) {
  var data = []
  data.push({ 'OpenDoc': params })
  if (templateURL && replaceBookMark) {
    data.push({ 'insertRedHeadDocFromWeb': { 'templateURL': templateURL, 'replaceBookMark': replaceBookMark }})
  }
  _runParams(data)
}

/**
 * 填充模板
 * @param params
 * @example
 ```js
 _wps.fillTemplate({
        docId: docId, //文档ID
        templateURL: 'http://dev.wpseco.cn/wps-oa/template/getFileData/73', //访问服务器模板接口
        dataFromWeb: [{'name': 'FirstTitle', 'text': 'web'}, {
            'name': 'TopTitle1',
            'text': '军参谋-web'
        }, {'name': 'TopTitle2', 'text': '通信-web'}, {
            'name': 'ContentTitle',
            'text': '空军内部使用办文助手-web'
        }, {'name': 'Company', 'text': '空军参谋部-web'}, {
            'name': 'Contactor',
            'text': '李四-web'
        }, {'name': 'Telephone', 'text': '26874'}, {
            'name': 'Content',
            'text': 'http://dev.wpseco.cn/wps-oa/document/getFileData/1',
             type': 'link'
        }], //后台获取数据的接口,
        dataFromServer: 'http://dev.wpseco.cn/wps-oa/document/getData'
        uploadPath: url + _this.getPath('file/upload?id=' + docId), //保存文档接口
   })

 _wps.fillTemplate({
      docId: '文档ID',
      templateURL: '模板的下载路径',
      dataFromWeb: '从页面传递数据'， // 返回的数据格式参考下面说明
      dataFromServer: '从服务器获取填充的数据', // 返回的数据格式参考下面说明
      uploadPath: '保存文档接口',
   })
 ```
 说明：dataFromWeb 和 dataFromServer 都传的话，dataFromServer中数据会覆盖dataFromWeb中的数据
 填充的数据格式：name: 书签的名称 ， text：填充的内容， type: 填充内容的格式，（link : 从链接获取内容，比如说直接下载文档，text 或者不填都为文本，pic: 图片地址 ）
 [
 {'name': 'FirstTitle', 'text': '秘'},
 {'name': 'TopTitle1', 'text': '军参谋'},
 {'name': 'TopTitle2','text': '通信'},
 {'name': 'ContentTitle', 'text': '空军内部使用办文助手'}, {'name': 'Company', 'text': '空军参谋部'},
 {'name': 'Contactor','text': '李四'},
 {'name': 'Pic', 'text': 'http://dev.wpseco.cn/wps-oa/document/getPic/xxxx','type': 'pic'},
 {'name': 'Content','text': 'http://dev.wpseco.cn/wps-oa/document/getFileData/xxx','type': 'link'}
 ]
 */
const fillTemplate = function fillTemplate(params) {
  _runParams([{ 'UseTemplate': params }])
}

const _WPS = { newDoc, openDoc, onlineEditDoc, insertRedHeadDocFromWeb, fillTemplate }
export default _WPS

// (function(global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (factory((global._wps = {})))
// }(this, function(exports) {
//   'use strict'
//
//   /**
//    * 启动参数
//    */
//   const startData = {
//     name: 'oaassist',
//     function: 'dispatcher', // wps插件包方法入口
//     info: {
//       fucns: []
//     }
//   }
//
//   /**
//    * 检测WPS，需传入成功和失败的回调函数
//    *
//    * @param {*} scb
//    * @param {*} fcb
//    */
//   function _checkWPS(scb, fcb) {
//     // 协议检测
//     checkWPSProtocol(scb, fcb)
//   }
//
//   /**
//    * 启动WPS
//    *
//    * @param {*} startData
//    */
//   function _runParams(params) {
//     _checkWPS(scb, fcb)
//     startData.info.fucns = params
//     var data = JSON.stringify(startData)
//     var result = base64.encode(data)
//     launchwps(getWpsComponentBySuffix('doc'), result)
//   }
//
//   function _inArray(suffix, array) {
//     for (let i = 0; i < array.length; i++) {
//       if (suffix.indexOf(array[i]) !== -1) {
//         return true
//       }
//     }
//     return false
//   }
//
//   // 通过后缀返回组件名
//   function getWpsComponentBySuffix(suffix) {
//     var wpsSuffix = ['doc', 'docx', 'wps', 'wpsx']
//     var etSuffix = ['xls', 'xlsx', 'et', 'etx']
//     var wppSuffix = ['ppt', 'pptx', 'dps', 'dpsx']
//     suffix = suffix.toLowerCase()
//     if (_inArray(suffix, wpsSuffix)) {
//       return 'wps' // 文字
//     } else if (_inArray(suffix, etSuffix)) {
//       return 'et' // 表格
//     } else if (_inArray(suffix, wppSuffix)) {
//       return 'wpp' // 演示
//     } else {
//       alert('无效后缀')
//     }
//   }
//
//   // 打开新文档
//   /**
//    * 打开文档
//    * @param params
//    ```js
//    _wps.newDoc({
//        uploadPath: url + this.getPath('file/uploadFromWps'), //保存文档接口
//        strBookmarkDataPath: url + this.getPath('bookmark/getAllBookmark'),//书签列表接口
//        templatePath: url + this.getPath('template/paging'),//正文模板列表接口
//        buttonGroups: 'btnSaveAsFile,btnImportDoc,btnPageSetup,btnInsertDate,btnSelectBookmark,btnImportTemplate'
//    })
//    ```
//    */
//   function newDoc(params) {
//     _runParams([{ 'NewDoc': params }])
//   }
//
//   /**
//    * 打开指定文档
//    * @param {JSON} params
//    * @example
//    ```js
//    {
//   'docId': '文档ID',
//   'uploadPath': '保存文档接口',
//   'fileName': '获取服务器文档接口',
//   'uploadNewPath': '上传清稿后路径',
//   'saveOriginFile':3,   //清稿保存类型， 1，保存清稿前，保存路径为uploadNewPath，2, 保存清稿后,uploadPath，3, 都保存,uploadPath,uploadNewPath，saveOriginFile不传，保存清稿后的uploadPath
//   'userName':'只保存，拒绝用户自己的修改',
//   'revisionCtrl':{  //痕迹控制 ，不传正常打开
//       'bOpenRevision':true, //true(打开)false(关闭)修订
//       'bShowRevision':true  //true(显示)/false(关闭)痕迹
//   }
//   openType: {       //文档打开方式 ，不传正常打开
//       //文档保护类型，-1：不启用保护模式，0：只允许对现有内容进行修订，1：只允许添加批注，2：只允许修改窗体域，3：只读
//       'protectType': 3,
//       'password': '123456'
//   }
//   }
//    ```
//    */
//   var openDoc = function openDoc(params, funcs) {
//     var data = []
//     data.push({ 'OpenDoc': params })
//     if (funcs) {
//       var funArr = funcs.split(',')
//       for (let i = 0; i < funArr.length; i++) {
//         var fun = {}
//         fun[funArr[i]] = {}
//         data.push(fun)
//       }
//     }
//     _runParams(data)
//   }
//
//   /**
//    * 在线编辑文档（文档不落地）
//    * @param params
//    * @example
//    ```js
//    _wps.onlineEditDoc({
//       docId: docId, //文档ID
//       uploadPath: url + this.getPath('file/upload?id=' + docId), //保存文档接口
//       fileName: url + this.getPath('file/download/' + docId), //根据文档id获取服务器文档接口
//       strBookmarkDataPath: url + this.getPath('bookmark/getAllBookmark'),//书签列表接口
//       templatePath: url + this.getPath('template/paging'),//正文模板列表接口
//       buttonGroups: 'btnSaveAsFile,btnImportDoc,btnPageSetup,btnInsertDate,btnSelectBookmark,btnImportTemplate',
//       userName: '王五'//用户名
//   })
//    ```
//    */
//   var onlineEditDoc = function onlineEditDoc(params) {
//     _runParams([{ 'onlineEditDoc': params }])
//   }
//
//   /**
//    * 套红头的方法
//    * @param params 打开文档传递的参数
//    * @param templateURL 红头文件的获取路径
//    * @param replaceBookMark 被替换的书签名
//    * @example
//    ```js
//    _wps.insertRedHeadDocFromWeb({
//        docId: fileId, //文档ID
//        uploadPath: url + dispatch.getPath('file/upload?id=' + fileId), //保存文档接口
//        fileName: url + dispatch.getPath('file/download/' + fileId), //根据文档id获取服务器文档接口
//        buttonGroups: 'btnInsertRedHeader',
//        openType: {
//           'protectType': -1,
//           'password': '123456'
//        }
//    },url + dispatch.getPath('file/download/' + templateId),'Content')//红头模板中填充正文的位置书签名
//    ```
//    */
//   var insertRedHeadDocFromWeb = function insertRedHeadDocFromWeb(params, templateURL, replaceBookMark) {
//     var data = []
//     data.push({ 'OpenDoc': params })
//     if (templateURL && replaceBookMark) {
//       data.push({ 'insertRedHeadDocFromWeb': { 'templateURL': templateURL, 'replaceBookMark': replaceBookMark }})
//     }
//     _runParams(data)
//   }
//
//   /**
//    * 填充模板
//    * @param params
//    * @example
//    ```js
//    _wps.fillTemplate({
//         docId: docId, //文档ID
//         templateURL: 'http://dev.wpseco.cn/wps-oa/template/getFileData/73', //访问服务器模板接口
//         dataFromWeb: [{'name': 'FirstTitle', 'text': 'web'}, {
//             'name': 'TopTitle1',
//             'text': '军参谋-web'
//         }, {'name': 'TopTitle2', 'text': '通信-web'}, {
//             'name': 'ContentTitle',
//             'text': '空军内部使用办文助手-web'
//         }, {'name': 'Company', 'text': '空军参谋部-web'}, {
//             'name': 'Contactor',
//             'text': '李四-web'
//         }, {'name': 'Telephone', 'text': '26874'}, {
//             'name': 'Content',
//             'text': 'http://dev.wpseco.cn/wps-oa/document/getFileData/1',
//              type': 'link'
//         }], //后台获取数据的接口,
//         dataFromServer: 'http://dev.wpseco.cn/wps-oa/document/getData'
//         uploadPath: url + _this.getPath('file/upload?id=' + docId), //保存文档接口
//    })
//
//    _wps.fillTemplate({
//       docId: '文档ID',
//       templateURL: '模板的下载路径',
//       dataFromWeb: '从页面传递数据'， // 返回的数据格式参考下面说明
//       dataFromServer: '从服务器获取填充的数据', // 返回的数据格式参考下面说明
//       uploadPath: '保存文档接口',
//    })
//    ```
//    说明：dataFromWeb 和 dataFromServer 都传的话，dataFromServer中数据会覆盖dataFromWeb中的数据
//    填充的数据格式：name: 书签的名称 ， text：填充的内容， type: 填充内容的格式，（link : 从链接获取内容，比如说直接下载文档，text 或者不填都为文本，pic: 图片地址 ）
//    [
//        {'name': 'FirstTitle', 'text': '秘'},
//        {'name': 'TopTitle1', 'text': '军参谋'},
//        {'name': 'TopTitle2','text': '通信'},
//        {'name': 'ContentTitle', 'text': '空军内部使用办文助手'}, {'name': 'Company', 'text': '空军参谋部'},
//        {'name': 'Contactor','text': '李四'},
//        {'name': 'Pic', 'text': 'http://dev.wpseco.cn/wps-oa/document/getPic/xxxx','type': 'pic'},
//        {'name': 'Content','text': 'http://dev.wpseco.cn/wps-oa/document/getFileData/xxx','type': 'link'}
//    ]
//    */
//   var fillTemplate = function fillTemplate(params) {
//     _runParams([{ 'UseTemplate': params }])
//   }
//
//   exports.openDoc = openDoc
//   exports.newDoc = newDoc
//   exports.onlineEditDoc = onlineEditDoc
//   exports.insertRedHeadDocFromWeb = insertRedHeadDocFromWeb
//   exports.fillTemplate = fillTemplate
//   Object.defineProperty(exports, '__esModule', { value: true })
//
//   // 签章使用
//   // 选择书签
//   // 转pdf
//   // 定制按钮组合
//   // 打开关闭修订
//   // 打印
//   // 文档校对
//   /**
//    * 'picturesPath':'展示所有图片路径',
//    'redHeadsPath':'展示所有红头路径',
//    'getPicturePath':'获得某张图片路径，插件会在后面拼接上图片id', // json数据格式    [{tempId:1,tempName:图片名称1},{tempId:2,tempName:图片名称2}]
//
//    'originWidthHeight':1,//1 为采用原始宽高,不需要传递picHeight，picWidth  ，0为不采用原始宽高，为0可以设置picHeight，picWidth
//    'picHeight':200,  //图片高度
//    'picWidth':200, //图片宽度
//
//    //是否有图片权限认证 validatePath有值是， 如果不需要，则不传这个数据
//    //拼接用户名密码，盖章的时候   validatePath+'?userName='+userName+'password='+password
//    'validatePath':'http://dev.wpseco.cn/wps-oa/redHead/paging',//验证盖章权限url  通过，返回字符串'auth'，不通过，返回空
//    'getRedHeadPath':'http://dev.wpseco.cn/wps-oa/redHead/getFileData/' ,    //获得某个红头路径，红头模板里面有zhengwen书签 // json数据格式    [{tempId:1,tempName:红头名称1},{tempId:2,tempName:红头名称2}]
//
//    //searchPath + '?content=' + document.getElementById('content').value
//    'searchPicturePath':'http://dev.wpseco.cn/wps-oa/redHead/paging' , //图片用查询条件搜索过滤的路径,如果不需要，则不传这个数据
//    // searchPath + '?content=' + document.getElementById('content').value
//    'searchRedHeadPath':'http://dev.wpseco.cn/wps-oa/redHead/paging'  //红头用查询条件搜索过滤的路径,如果不需要，则不传这个数据
//    */
// }))
