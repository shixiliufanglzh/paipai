window.WeiboJS.init({ 
    appkey: $CONFIG.appkey, 
    debug: false, 
    timestamp: $CONFIG.timestamp, 
    noncestr: $CONFIG.noncestr, 
    signature: $CONFIG.signature, 
    scope: [
        "getNetworkType", 
        "networkTypeChanged", 
        "getBrowserInfo", 
        "checkAvailability", 
        "setBrowserTitle", 
        "openMenu", "setMenuItems",
        "menuItemSelected", 
        "setSharingContent", 
        "openImage", 
        "scanQRCode", 
        "pickImage", 
        "openVideoCamera", 
        "uploadVideo", 
        "getWM", 
        "getLocation", 
        "pickContact", 
        "apiFromTheFuture", 
        "menuItemAvailable", 
        "invokeMenuItem", 
        "audioMetersChange"
    ] 
}, function (a) { 
    safeAlert(JSON.stringify(a)) 
}); 
var networkChangedEventOn = false; 
var menuItemSelectedEventOn = false; 
var orientationChangeEventOn = false; 
var _localVideoPath = ""; 
$("a").live("click", function () {
    var d = $(this).attr("id"); 
    switch (d) {
        case "getNetworkType": WeiboJS.invoke("getNetworkType", null, function (e) { 
            safeAlert("当前网络状态：" + JSON.stringify(e)) }); 
            break; 
        case "networkTypeChanged": 
            if (!networkChangedEventOn) { 
                networkChangedEventOn = true; 
                WeiboJS.on("networkTypeChanged", function (e) { 
                    safeAlert("网络状态有变化：" + JSON.stringify(e)) 
                }); 
                safeAlert("事件已经绑定完成，请直接测试") 
            } break; 
        case "getBrowserInfo": 
            WeiboJS.invoke("getBrowserInfo", null, function (e) { 
                safeAlert("浏览器信息：\n" + JSON.stringify(e)) 
            }); 
            break; 
        case "checkAvailability": 
            WeiboJS.invoke("checkAvailability", { 
                api_list: [
                    "openImage", 
                    "getNetworkType", 
                    "scanQRCode", 
                    "pickImage", 
                    "getLocation", 
                    "queryPreloadCache", 
                    "deletePreloadCache", 
                    "setBrowserTitle", 
                    "getBrowserInfo", 
                    "openMenu", 
                    "setMenuItems", 
                    "loginWeiboAccount", 
                    "setSharingContent", 
                    "checkAvailability", 
                    "networkTypeChanged", 
                    "menuItemSelected"
                ] 
            }, function (e) { 
                safeAlert("API可用性结果：\n" + JSON.stringify(e)) 
            }); 
            break; 
        case "setBrowserTitle": 
            WeiboJS.invoke("setBrowserTitle", { 
                title: "标题" + Math.round(Math.random() * 100) 
            }, function () { }); 
            break; 
        case "openMenu": 
            WeiboJS.invoke("openMenu", null, function (e) { 
                safeAlert("openMenu  返回数据：" + JSON.stringify(e)) 
            }); 
            break; 
        case "setMenuItems": 
            WeiboJS.invoke("setMenuItems", { 
                menus: [
                    "shareToWeibo", "follow", "shareToMessage", "shareToWeixin", "shareToPYQ", "shareToQQ", "shareToQzone", "openInBrowser", "copyURL"
                ], 
                content: "默认的分享分案，你可以随便写点啥", 
                title: "JSBridge微博官方Demo", 
                icon: "http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg" 
            }, function (e) { 
                safeAlert("setMenuItems  返回数据：" + JSON.stringify(e)) 
            }); 
            break; 
        case "menuItemSelected": 
            if (!menuItemSelectedEventOn) { 
                menuItemSelectedEventOn = true;
                WeiboJS.on("menuItemSelected", function (e) { 
                    safeAlert("菜单选择结果：" + JSON.stringify(e))
                }); 
                safeAlert("事件已经绑定完成，请直接测试") 
            } 
            break; 
        case "setSharingContent": 
            WeiboJS.invoke("setSharingContent", {}, function (e) { 
                safeAlert("设置分享内容成功：" + JSON.stringify(e))
            }); 
            break; 
        case "openImageSingle":
            WeiboJS.invoke("openImage", {
                url: $(this).children("img").attr("src") || "http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg" 
            }); 
            break; 
        case "openImageMulti": 
            WeiboJS.invoke("openImage", {
                url: $(this).children("img").attr("src") || "http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg", urls: ["http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg", "http://ww3.sinaimg.cn/large/005BBEsRjw1eorrq5fjqrj30qo4zs1kx.jpg", "http://ww1.sinaimg.cn/large/005Fvt1Ejw1eigxv14q0pj30