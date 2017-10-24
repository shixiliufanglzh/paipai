/**
 * Created by 是昔流芳 on 2017/10/23.
 */
$(function(){

    $.ajax({
        url: JSSDKCONFIG,
        type: 'post',
        dataType: 'json',
        data: {'url': window.location.href},
        // async: false,
        success:function(data){
            console.log(data);
            apiResponse(data.responseCode,data.responseDesc);
            if(data.responseCode == 2000) {
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
                        title: '咿呀咿呀宝宝海选报名开始啦！！', // 分享标题
                        desc: '想让您的宝宝上电视吗？快来参加吧！', // 分享描述
                        link: data.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://www.jianbid.com/app/public/imgs/logo.png', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {

                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {

                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareTimeline({
                        title: '咿呀咿呀宝宝海选报名开始啦！！', // 分享标题
                        link: data.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://www.jianbid.com/app/public/imgs/logo.png', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQQ({
                        title: '', // 分享标题
                        desc: '', // 分享描述
                        link: data.data.url, // 分享链接
                        imgUrl: 'http://www.jianbid.com/app/public/imgs/logo.png', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareWeibo({
                        title: '', // 分享标题
                        desc: '', // 分享描述
                        link: data.data.url, // 分享链接
                        imgUrl: 'http://www.jianbid.com/app/public/imgs/logo.png', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQZone({
                        title: '', // 分享标题
                        desc: '', // 分享描述
                        link: data.data.url, // 分享链接
                        imgUrl: 'http://www.jianbid.com/app/public/imgs/logo.png', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    //wx.hideMenuItems({
                    //    menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    //});

                });
            }
        },
        error: function(err){
            console.log(err);
        }
    })

})

