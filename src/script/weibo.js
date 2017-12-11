window.WeiboJS.init({
	appkey : $CONFIG.appkey,
	debug : false,
	timestamp : $CONFIG.timestamp,
	noncestr : $CONFIG.noncestr,
	signature : $CONFIG.signature,
	scope : [ "getNetworkType", "networkTypeChanged", "getBrowserInfo",
			"checkAvailability", "setBrowserTitle", "openMenu", "setMenuItems",
			"menuItemSelected", "setSharingContent", "openImage", "scanQRCode",
			"pickImage", "openVideoCamera", "uploadVideo", "getWM",
			"getLocation", "pickContact", "apiFromTheFuture",
			"menuItemAvailable", "invokeMenuItem", "audioMetersChange" ]
}, function(a) {
	safeAlert(JSON.stringify(a))
});
var networkChangedEventOn = false;
var menuItemSelectedEventOn = false;
var orientationChangeEventOn = false;
var _localVideoPath = "";
$("a").live(
    "click",
    function () {
        var d = $(this).attr("id");
        switch (d) {
            case "getNetworkType":
                WeiboJS.invoke("getNetworkType", null, function (e) {
                    safeAlert("当前网络状态：" + JSON.stringify(e))
                });
                break;
            case "networkTypeChanged":
                if (!networkChangedEventOn) {
                    networkChangedEventOn = true;
                    WeiboJS.on("networkTypeChanged", function (e) {
                        safeAlert("网络状态有变化：" + JSON.stringify(e))
                    });
                    safeAlert("事件已经绑定完成，请直接测试")
                }
                break;
            case "getBrowserInfo":
                WeiboJS.invoke("getBrowserInfo", null, function (e) {
                    safeAlert("浏览器信息：\n" + JSON.stringify(e))
                });
                break;
            case "checkAvailability":
                WeiboJS.invoke("checkAvailability", {
                    api_list: ["openImage", "getNetworkType",
                        "scanQRCode", "pickImage", "getLocation",
                        "queryPreloadCache", "deletePreloadCache",
                        "setBrowserTitle", "getBrowserInfo",
                        "openMenu", "setMenuItems",
                        "loginWeiboAccount", "setSharingContent",
                        "checkAvailability", "networkTypeChanged",
                        "menuItemSelected"]
                }, function (e) {
                    safeAlert("API可用性结果：\n" + JSON.stringify(e))
                });
                break;
            case "setBrowserTitle":
                WeiboJS.invoke("setBrowserTitle", {
                    title: "标题" + Math.round(Math.random() * 100)
                }, function () {
                });
                break;
            case "openMenu":
                WeiboJS.invoke("openMenu", null, function (e) {
                    safeAlert("openMenu 返回数据：" + JSON.stringify(e))
                });
                break;
            case "setMenuItems":
                WeiboJS
                    .invoke(
                    "setMenuItems",
                    {
                        menus: ["shareToWeibo", "follow",
                            "shareToMessage",
                            "shareToWeixin",
                            "shareToPYQ", "shareToQQ",
                            "shareToQzone",
                            "openInBrowser", "copyURL"],
                        content: "默认的分享分案，你可以随便写点啥",
                        title: "JSBridge微博官方Demo",
                        icon: "http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg"
                    }, function (e) {
                        safeAlert("setMenuItems 返回数据："
                            + JSON.stringify(e))
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
                WeiboJS
                    .invoke(
                    "openImage",
                    {
                        url: $(this).children("img").attr(
                            "src")
                            || "http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg"
                    });
                break;
            case "openImageMulti":
                WeiboJS
                    .invoke(
                    "openImage",
                    {
                        url: $(this).children("img").attr(
                            "src")
                            || "http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg",
                        urls: [
                            "http://ww1.sinaimg.cn/large/a9ebe653jw1ek6afarfwcj20go1064ad.jpg",
                            "http://ww3.sinaimg.cn/large/005BBEsRjw1eorrq5fjqrj30qo4zs1kx.jpg",
                            "http://ww1.sinaimg.cn/large/005Fvt1Ejw1eigxv14q0pj30c81mgk1a.jpg"]
                    });
                break;
            case "scanQRCode":
                WeiboJS.invoke("scanQRCode", null, function (e) {
                    safeAlert("scanQRCode：" + JSON.stringify(e))
                });
                break;
            case "pickImage":
                WeiboJS.invoke("pickImage", null, function (e) {
                    console.log(e.resource_ids);
                    showImages("pickImage", e)
                });
                break;
            case "pickImageCamera":
                WeiboJS.invoke("pickImage", {
                    source: "camera"
                }, function (e) {
                    showImages("pickImage-sourceCamera", e)
                });
                break;
            case "getWM":
                WeiboJS.invoke("getWM", null, function (f, e) {
                    if (!f) {
                        safeAlert(e);
                        return
                    }
                    safeAlert("渠道号：" + f.wm)
                });
                break;
            case "openVideoCamera":
                WeiboJS.invoke("openVideoCamera", null, function (e) {
                    if (!e) {
                        return
                    }
                    _localVideoPath = e.localPath || "";
                    safeAlert("视频本地地址：" + e.localPath)
                });
                break;
            case "uploadVideo":
                if (_localVideoPath == "") {
                    safeAlert("视频地址不能为空");
                    return
                }
                WeiboJS.invoke("uploadVideo", {
                    localPath: _localVideoPath
                }, function (e) {
                    if (!e) {
                        return
                    }
                    safeAlert("视频上传成功！")
                });
                break;
            case "pickContactSingle":
                WeiboJS.invoke("pickContact", null, function (e) {
                    console.log(e.contacts);
                    safeAlert("选择联系人结果：" + JSON.stringify(e))
                });
                break;
            case "pickContactMulti":
                WeiboJS.invoke("pickContact", {
                    count: 10
                }, function (e) {
                    console.log(e.contacts);
                    safeAlert("选择联系人结果：" + JSON.stringify(e))
                });
                break;
            case "getLocation":
                WeiboJS.invoke("getLocation", null, function (e) {
                    safeAlert("getLocation：" + JSON.stringify(e))
                });
                break;
            case "queryPreloadCache":
                safeAlert("暂未实现");
                break;
            case "deletePreloadCache":
                safeAlert("暂未实现");
                break;
            case "loginWeiboAccount":
                safeAlert("暂未实现");
                break;
            case "jumpToInfoPage":
                var a = location.href;
                var b = "sinaweibo://infopage?containerid=1001593700433561468872&showurl="
                    + encodeURIComponent(a) + "&url_open_direct=1";
                location.href = b;
                break;
            case "jumpToBrowser":
                var a = location.href;
                var b = "sinaweibo://browser?url="
                    + encodeURIComponent(a) + "&disable_sinaurl=1";
                location.href = b;
                break;
            case "invaildCommand":
                WeiboJS.invoke("invaildCommand", null, function (e) {
                    safeAlert("无效命令调用结果：" + JSON.stringify(e))
                });
                break;
            case "weiboRun":
                WeiboJS.invoke("weiboRun", null, function (e) {
                    safeAlert("微博运动数据：" + JSON.stringify(e))
                });
                break;
            case "deliverAddressDefault":
                WeiboJS.invoke("deliverAddress:default", null,
                    function (e) {
                        safeAlert("默认收货地址：" + JSON.stringify(e))
                    });
                break;
            case "deliverAddressChange":
                WeiboJS.invoke("deliverAddress:change", null, function (
                    e) {
                    safeAlert("其他的收货地址：" + JSON.stringify(e))
                });
                break;
            case "bottomNavigationInfo":
                WeiboJS.invoke("bottomNavigation:info", null, function (
                    e) {
                    safeAlert("修改分享的文案：" + JSON.stringify(e))
                });
                break;
            case "bottomNavigationChange":
                WeiboJS.invoke("bottomNavigation:change", null,
                    function (e) {
                        safeAlert("H5底导相应变化：" + JSON.stringify(e))
                    });
                break;
            case "bottomNavigationHide":
                WeiboJS.invoke("bottomNavigation:hide", null, function (
                    e) {
                    safeAlert("隐藏H5底导：" + JSON.stringify(e))
                });
                break;
            case "getSignedRequest":
                WeiboJS.invoke("getSignedRequest", null, function (e) {
                    safeAlert("轻应用框架传递过来的参数：" + JSON.stringify(e))
                });
                break;
            case "orientationChange":
                if (!orientationChangeEventOn) {
                    orientationChangeEventOn = true;
                    WeiboJS.on("orientationChange", function (e) {
                        safeAlert("当前屏幕的方向信息：" + JSON.stringify(e))
                    });
                    safeAlert("事件已经绑定完成，请直接测试")
                }
                break;
            case "login":
                WeiboJS
                    .invoke(
                    "login",
                    {
                        redirect_uri: "http://apps.weibo.com/test/1406758883/2I8KtA/demo/lightapph5/"
                    }, function (e) {
                    });
                break;
            case "menuItemAvailable":
                WeiboJS.invoke("menuItemAvailable", {}, function (e) {
                    safeAlert("获取的菜单项："
                        + JSON.stringify(e.available_codes))
                });
                break;
            case "invokeMenuItem":
                WeiboJS.invoke("invokeMenuItem", {
                    code: 1005
                }, function (e) {
                });
                break;
            case "audioMetersChange":
                WeiboJS.on("audioMetersChange", function (e) {
                    safeAlert("麦克风音量变化：" + JSON.stringify(e))
                });
                break;
            case "cashier":
                var c = Date.parse(new Date()).toString();
                WeiboJS
                    .invoke(
                    "cashier",
                    {
                        sign_type: "RSA",
                        sign: "s93kXeMeZpUgeTTTmaTm7qy50uu83TLGX6mfoS9MK6YqUKEgoyl5lW+17CVzXb66i0l46RvFeumxcWe4CCynCAxyBbnA+91yDFHtVXLyMdNEJRxQpjVPWfSYZfUzkFPdOhyLXRUSaU3uRvKOCSGN2CtUiQGBLQx1HE59mq6qSsU=",
                        appkey: "1527220810",
                        seller_id: 3292349193,
                        out_pay_id: c,
                        notify_url: encodeURIComponent("http://2.link.sinaapp.com/demo/lightapph5v2/"),
                        return_url: encodeURIComponent("http://2.link.sinaapp.com/demo/lightapph5v2/"),
                        subject: "jsBridge测试",
                        total_amount: 1,
                        body: "jsBridge测试"
                    }, function (e) {
                        safeAlert(JSON.stringify(e))
                    });
                break
        }
    });
function getImageTag(c) {
    var b = document.querySelector("#item-" + c + " img");
	if (!b) {
		b = document.createElement("img");
		var a = document.querySelector("#item-" + c);
		a.appendChild(b)
	}
	return b
}
function showImages(g, j) {
	try {
		console.log("showImages");
		if (j == null || (j.base64 == null && j.resource_ids == null)) {
			return
		}
		console.log("show Start");
		var b = document.querySelector("#item-" + g + " div");
		if (!b) {
			b = document.createElement("div");
			b.className = "showImages";
			var a = document.querySelector("#item-" + g);
			a.appendChild(b)
		}
		b.innerHTML = "";
		if (j.base64 != null) {
			var c = document.createElement("img");
			c.src = "data:image/jpeg;base64," + j.base64;
			b.appendChild(c)
		}
		if (j.resource_ids != null) {
			for (var d = 0, f = j.resource_ids.length; d < f; d++) {
				var c = document.createElement("img");
				c.src = j.resource_ids[d];
				b.appendChild(c)
			}
		}
	} catch (h) {
		console.log(h)
	}
}
function safeAlert(a) {
	setTimeout(function() {
		alert(a)
	}, 500)
};