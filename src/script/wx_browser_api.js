/**
 * Created by 是昔流芳 on 2017/10/23.
 */
var shareUrl = window.location.href;

if((shareUrl.indexOf('index') == -1) 
    && (shareUrl.indexOf('/detail.html') == -1)){
    $.ajax({
        url: GET_SHARE_URL,
        type:'GET',
        dataType:'json',
        async:false,
        cache: false,
        success: function(data){
            shareUrl = data.data;
            if(isWeiBo()){
                $('.weibo_share_text').append('<wb:share-button class="weibo_share_btn" appkey="1490666142" addition="simple" type="button" default_text="【减价拍】30元手机充值卡，29.8元起拍，每秒减0.1元，低至0元，先拍先得,循环反复，即充即到，快来抢话费！" url="'+ shareUrl +'&shareMethod=weibo" pic="http%3A%2F%2Fwww.jianbid.com%2Fpublic%2Fimgs%2Flogo.png"></wb:share-button>');
            }
        }
    })
}
// alert(shareUrl);



$(function(){

    // $('.weibo_share').attr('pic','http%3A%2F%2Fwww.jianbid.com%2Fpublic%2Fimgs%2Flogo.png');
    // $('body').append('<wb:share-button appkey="1490666142" addition="full" type="button" default_text="【减价拍】30元手机充值卡，29.8元起拍，每秒减0.1元，低至0元，先拍先得,循环反复，即充即到，快来抢话费！" url="'+ shareUrl +'" pic="http%3A%2F%2Fwww.jianbid.com%2Fpublic%2Fimgs%2Flogo.png"></wb:share-button>')

    if(isWeiXin()){
        $.ajax({
            url: JSSDKCONFIG,
            type: 'post',
            dataType: 'json',
            data: {'url': window.location.href,signType: 1},
            async: false,
            success:function(data){
                apiResponse(data.responseCode,data.responseDesc);
                // alert(JSON.stringify(data));
                if(data.responseCode == 2000) {
                    // shareUrl = data.data.url;
                
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.data.appId, // 必填，公众号的唯一标识
                        timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                        signature: data.data.signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        wx.onMenuShareAppMessage({
                            title: '【减价拍】售价减拍 先拍先得 ', // 分享标题
                            desc: '30元手机充值卡，29.8元起拍，每秒减0.1元，低至0元，先拍先得,循环反复，即充即到，快来抢话费！', // 分享描述
                            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://www.jianbid.com/public/imgs/logo.png', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
    
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
    
                                // 用户取消分享后执行的回调函数
                            },
                        });
    
                        wx.onMenuShareTimeline({
                            title: '【减价拍】售价减拍,先拍先得,30元手机话费，每秒减0.1元，低至0元，抢！', // 分享标题
                            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://www.jianbid.com/public/imgs/logo.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            },
                        });
    
                        wx.onMenuShareQQ({
                            title: '【减价拍】售价减拍 先拍先得 ', // 分享标题
                            desc: '30元手机充值卡，29.8元起拍，每秒减0.1元，低至0元，先拍先得,循环反复，即充即到，快来抢话费！', // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: 'http://www.jianbid.com/public/imgs/logo.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            },
                        });
    
                        wx.onMenuShareWeibo({
                            title: '【减价拍】售价减拍 先拍先得 ', // 分享标题
                            desc: '30元手机充值卡，29.8元起拍，每秒减0.1元，低至0元，先拍先得,循环反复，即充即到，快来抢话费！', // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: 'http://www.jianbid.com/public/imgs/logo.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            },
                        });
    
                        wx.onMenuShareQZone({
                            title: '【减价拍】售价减拍 先拍先得 ', // 分享标题
                            desc: '30元手机充值卡，29.8元起拍，每秒减0.1元，低至0元，先拍先得,循环反复，即充即到，快来抢话费！', // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: 'http://www.jianbid.com/public/imgs/logo.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            },
                        });
    
                    });
                }
            },
            error: function(err){
                // alert(err);
                console.log(err);
            }
        })
    }
    // else if(isWeiBo()){
    //     $.ajax({
    //         url: JSSDKCONFIG,
    //         type: 'post',
    //         dataType: 'json',
    //         data: {'url': window.location.href, signType: 2},
    //         async: false,
    //         success:function(data){
    //             apiResponse(data.responseCode,data.responseDesc);
    //             // alert(JSON.stringify(data));
    //             if(data.responseCode == 2000) {
    //                 window.WeiboJS.init({
    //                     'appkey' : data.data.appId,
    //                     'debug': true,
    //                     'timestamp': data.data.timestamp,
    //                     'noncestr': data.data.nonceStr,
    //                     'signature': data.data.signature,
    //                     'scope': [
    //                         'getNetworkType',
    //                         'networkTypeChanged',
    //                         'getBrowserInfo',
    //                         'checkAvailability',
    //                         'setBrowserTitle',
    //                         'openMenu',
    //                         'setMenuItems',
    //                         'menuItemSelected',
    //                         'setSharingContent',
    //                         'openImage',
    //                         'scanQRCode',
    //                         'pickImage',
    //                         'getLocation',
    //                         'pickContact',
    //                         'apiFromTheFuture'
    //                     ]
    //                 }, function(ret){
    //                     alert('init done\n' + JSON.stringify(ret));
    //                     WeiboJS.invoke("setMenuItems", {
    //                         // menus : ["shareToWeibo","follow","shareToMessage","shareToWeixin","shareToPYQ","shareToQQ","shareToQzone","openInBrowser","copyURL"],
    //                         menus : ["shareToWeibo","follow"],
    //                         content : shareUrl,
    //                         title: "【减价拍】售价减拍 先拍先得", 
    //                         icon: "http://www.jianbid.com/public/imgs/logo.png"
    //                     }, function(params){
    //                         // alert("setMenuItems 返回数据：" + JSON.stringify(params));
    //                     });
    //                 });
    //             }  
    //         },
    //         error: function(err){
    //             // alert(err);
    //             console.log(err);
    //         }
    //     })
    // }else {
        // alert('外部浏览器');
    // }
})



function getUserId(){
    var userId = '';
    $.ajax({
        url: GETUSERINFO,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data);
            apiResponse(data.responseCode,data.responseDesc,data.data);
            if(data.responseCode == 2000){
                if(data.data.id){
                    userId = data.data.id;
                    localStorage.setItem('userId', userId);
                    if(!data.data.userTel){
                        hasPhone = commonCompt.verifyPhone(60,"新用户注册",false,3,"注册成功",null);
                    }
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
    return userId;
}

