/**
 * Created by 是昔流芳 on 2017/9/19.
 */

//var apiHost = "http://116.62.116.5/app/";
var apiHost = "http://www.jianbid.com/app/";

var GETLABELS = apiHost + "goods/getLabelOne.jhtml";  //获取首页商品标签列表
var GETGOODS = apiHost + "goods/getGoods.jhtml";  //获取商品列表接口
var REFRESHGOODS = apiHost + "goods/refreshGoods.jhtml";  //刷新低于最低价或其他不和规则商品
var GETGODDSDETAIL = apiHost + "goods/getGoodsDetail.jhtml";  //获取商品详情
var GETGODDSSKU = apiHost + "goods/getGoodsSku.jhtml";  //获取商品规格参数列表
var GETGOODSMIXSKU = apiHost + "goods/getGoodsMixSku.jhtml";  //获取商品参数的价格库存
var GETBUYRECORD = apiHost + "goods/getBuyRecord.jhtml";  //获取商品交易记录
var GETGOODSCOMMENTS = apiHost + "goods/getGoodsComments.jhtml";  //获取商品评论列表
var ADDSTORE = apiHost + "goods/addStore.jhtml";  //商品添加收藏
var GETSTORE = apiHost + "goods/getStore.jhtml";  //获取商品收藏列表
var CANCELSTORE = apiHost + "goods/cancelStore.jhtml";  //取消商品收藏
var ADDUSERADDRESS = apiHost + "address/addUserAddress.jhtml";  //添加收货地址
var GETUSERADDRESS = apiHost + "address/getUserAddress.jhtml";  //获取用户地址列表
var DEFAULTADRESS = apiHost + "address/defaultAddress.jhtml";  //设置默认地址
var DELUSERADDRESS = apiHost + "address/delUserAddress.jhtml";  //删除用户地址列表
var UPDATEUSERADDRESS = apiHost + "address/updaUserAddress.jhtml";  //更新用户地址
var GETADDRESSBYID = apiHost + "address/getAddressById.jhtml";  //获取用户指定地址
var ADDCART = apiHost + "order/addCart.jhtml";  //加入购物车
var GETCART = apiHost + "order/getCart.jhtml";  //获取购物车
var DELCART = apiHost + "order/delCart.jhtml";  //删除购物车
var CREATEORDER = apiHost + "order/createOrder.jhtml";  //创建订单
var GETORDER = apiHost + "order/getOrder.jhtml";  //获取用户订单列表
var GETORDERDETAIL = apiHost + "order/getOrderDetail.jhtml";  //获取订单详情
var DELORDER = apiHost + "order/delOrder.jhtml";  //删除订单
var CANCELORDER = apiHost + "order/cancelOrder.jhtml";  //取消订单
var QUERYFORTRACKING = apiHost + "order/queryForTracking.jhtml";  //查询订单物流
var GETORDERGOODS = apiHost + "order/getOrderGoods.jhtml";  //获取订单指定商品信息
var ADDCOMMENT = apiHost + "order/addComment.jhtml";  //添加订单商品评论
var CONFIRMRECEIPT = apiHost + "order/confirmReceipt.jhtml";  //确认收货
var APPLYSERVER = apiHost + "order/applyServer.jhtml";  //申请售后
var UPDATEBASEINFO = apiHost + "user/updateBaseInfo.jhtml";  //修改用户基本信息
var SIGN = apiHost + "activity/sign.jhtml";  //每日签到
var GETCODE = apiHost + "login/getCode.jhtml";  //获取验证码
var UPDATEPHONE = apiHost + "user/updatePhone.jhtml";  //修改手机号
var ORDERPAY = apiHost + "pay/orderPay.jhtml";  //订单支付
var GETUSERINFO = apiHost + "user/getUserInfo.jhtml";  //获取用户信息
var GETUSERPOINTRECORD = apiHost + "activity/getUserPointRecord.jhtml";  //获取用户派币记录
var JSSDKCONFIG = apiHost + "util/jssdkConfig.jhtml";  //获取js-skd config接口注入权限验证配置

//接口返回状态响应
function apiResponse(responseCode,responseDesc,redirectUrl){
    switch(responseCode){
        case "2000":
            return true;
            break;
        case "4000":
            //commonCompt.popPrompt("请先登录");
            if(redirectUrl){
                window.location.href = redirectUrl;
            }
            break;
        case "4001":
            commonCompt.popPrompt(responseDesc);
            break;
        case "4002":
            commonCompt.popPrompt("微信授权登录失败");
            break;
        case "4003":
            commonCompt.popPrompt("用户已存在");
            break;
        case "4004":
            commonCompt.popPrompt("未找到资源");
            break;
        case "4005":
            commonCompt.popPrompt("未关注平台公众号");
            break;
        case "4006":
            commonCompt.Confirm({
                hasTitle: true,
                title: "提示",
                contentText: responseDesc,
                cancleText: "取消",
                certainText: "确认",
                rightBtnClick: function(){
                    location.reload(true);
                },
                leftBtnClick: function(){
                    location.reload(true);
                }
            });
            break;
        case "4007":
            commonCompt.popPrompt("拍币不足");
            break;
        case "5000":
            commonCompt.popPrompt("服务器出错");
            break;
        case "5001":
            commonCompt.popPrompt("找不到可使用的公众号");
            break;
        default:
            commonCompt.popPrompt("未知错误");
    }
}

var Paipai = function(){}
Paipai.prototype = {
    //待计时器列表创建
    addOrderTimer: function(timeLeft,domPosition,timerList){
        var timer = null;
        timer = setInterval(function(){
            timeLeft --;
            var timePrompt = "";
            var cal_time = timeLeft;
            if(cal_time >= 86400){
                timePrompt += Math.floor(cal_time/86400) + "天";
                cal_time = timeLeft % 86400;
            }
            if(cal_time >= 3600){
                timePrompt += Math.floor(cal_time/3600) + "小时";
                cal_time = timeLeft % 3600;
            }
            if(cal_time >= 60){
                timePrompt += Math.floor(cal_time/60) + "分";
                cal_time = timeLeft % 60;
            }
            timePrompt += cal_time + "秒";
            domPosition.html(timePrompt);
            if(timeLeft === 0){
                location.reload(true);
            }
        },1000)
        timerList.push(timer);
        //return timePrompt;
    },
}

//监听后台运行返回事件
document.addEventListener('visibilitychange',function() {
    if(document.visibilityState=='visible') {
        location.reload();
    }
})
document.addEventListener('webkitvisibilitychange',function() {
    if(document.webkitVisibilityState=='visible') {
        location.reload();
    }
})
document.addEventListener('mozvisibilitychange',function() {
    if(document.mozVisibilityState=='visible') {
        location.reload();
    }
})
document.addEventListener('msvisibilitychange',function() {
    if(document.msVisibilityState=='visible') {
        location.reload();
    }
})


var commonCompt = {

    //弹出对话框
    Confirm: function (objPara){
        var html =  '<div id="confirm" style="position:fixed;background-color:rgba(0,0,0,0.8);top:0;left:0;right:0;bottom:0;z-index:99;display:none">'+
                        '<div class="content" style="width:4.5rem;position:absolute;left:50%;margin-left:-2.25rem;margin-top:4rem;background-color:#fff;-webkit-border-radius:0.1rem;-moz-border-radius:0.1rem;border-radius:0.1rem;overflow:hidden;">'+
                            '<div class="title" style="color:#f95454;font-size:0.3rem;text-align: center;padding:0.24rem 0 0.14rem;border-bottom:1px solid #c5c5c5;display:none">'+objPara.title+'</div>'+
                            '<p class="text" style="font-size:0.28rem;color:#2f2f2f;line-height:0.4rem;padding:0.3rem 0.6rem;text-align: center;border-bottom:1px solid #c5c5c5;">'+objPara.contentText+'</p>'+
                            '<div class="input" style="display:none;font-size:0.28rem;color:#2f2f2f;line-height:0.4rem;padding:0.3rem 0.6rem;text-align: center;border-bottom:1px solid #c5c5c5;">'+
                                '<input type="text" placeholder="'+objPara.inputPlace+'" style="padding:0 0.1rem;width:100%;line-height:0.6rem;outline:none;border:1px solid #858585;border-radius:0.06rem">'+
                            '</div>'+
                            '<div class="action" style="font-size:0;">'+
                                '<button class="cancel" style="width:50%;background-color:#fff;border:none;outline:none;text-align:center;border-right:1px solid #c5c5c5;color:#858585;line-height:0.66rem;">'+objPara.cancleText+'</button>'+
                                '<button class="certain" style="width:50%;background-color:#fff;border:none;outline:none;text-align:center;color:#F95454;line-height:0.66rem;">'+objPara.certainText+'</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'

        $('body').append(html);
        if(objPara.hasTitle){
            $('#confirm .content .title').show();
        }
        if(objPara.showInput){
            $('#confirm .content .text').hide();
            $('#confirm .content .input').show();
        }
        $('#confirm').fadeIn();
        $('#confirm .action .cancel').click(function(){
            var inputVal = $('#confirm .input input').val();
            objPara.leftBtnClick(inputVal);
            $('#confirm').fadeOut(300,function(){
                $('#confirm').remove();
            });

        })
        $('#confirm .action .certain').click(function(){
            var inputVal = $('#confirm .input input').val();
            objPara.rightBtnClick(inputVal);
            $('#confirm').fadeOut(300,function(){
                $('#confirm').remove();
            });
        })
    },

    //弹出提示信息
    popPrompt: function (expression) {

        function setStyle(obj, css) {
            for (var atr in css) {
                obj.style[atr] = css[atr];
            }
        }

        var body = document.getElementsByTagName("body")[0];
        var container = document.createElement('div');
        body.appendChild(container);
        setStyle(container, {
            position: "fixed",
            width: "100%",
            top: "6rem",
            textAlign: "center",
            opacity: "0",
            zIndex: "9999"

        });
        var promptContent = document.createElement('div');
        promptContent.innerHTML = expression;
        container.appendChild(promptContent);
        setStyle(promptContent, {
            display: "inline-block",
            minWidth: "1.86rem",
            padding: "0 0.24rem",
            height: "0.8rem",
            backgroundColor: "rgba(0,0,0,0.8)",
            textAlign: "center",
            lineHeight: "0.8rem",
            color: "#fff",
            fontSize: "0.32rem",
            borderRadius: "0.1rem"
        });

        var num = 0;
        var st = setInterval(function() {
            num++;
            container.style.opacity = num / 10;
            if (num >= 10) {
                clearInterval(st);
                setTimeout(function() {
                    var st = setInterval(function() {
                        num--;
                        container.style.opacity = num / 10;
                        if (num <= 0) {
                            clearInterval(st);
                            body.removeChild(container);
                        }
                    }, 30);
                }, 3000)
            }
        }, 30);

    },

    //底部主导航
    mainNav: function(index){
        var html;
        html =  '<div id="mainNav">'+
                    '<div class="nav_wrap">'+
                        '<button class="home">'+
                            '<i></i><br><span>商城</span>'+
                        '</button>'+
                        '<button class="collection">'+
                            '<i></i><br><span>关注</span>'+
                        '</button>'+
                        '<button class="grab">'+
                            '<i></i><br><span>拍得</span>'+
                        '</button>'+
                        '<button class="order">'+
                            '<i></i><br><span>订单</span>'+
                        '</button>'+
                        '<button class="personal">'+
                            '<i></i><br><span>会员</span>'+
                        '</button>'+
                    '</div>'+
                '</div>'


        $('body').append(html);
        $('#mainNav button').eq(index-1).addClass('active');
        $('#mainNav').on('click','button',function(){
            //$('#mainNav button').removeClass('active');
            //$(this).addClass('active');

        })
    },

    //提示用户等待的遮罩
    addMask: function(str){
        var html = '<div id="mask" style="position:fixed;background-color:rgba(0,0,0,0.8);top:0;left:0;right:0;bottom:0;">'+
            '<p style="color:#fff;font-size:0.28rem;text-align:center;margin-top:5rem;">' + str + '</p>'+
            '</div>';

        $('body').append(html);
    },

    //图片压缩转base64，依赖EXIF，解决iphone拍照旋转问题
    readFile: function(obj,imgListBase64,position,addBtn) {

        //var windowURL = window.URL || window.webkitURL;

        var popPrompt = commonCompt.popPrompt;
        var files = obj.files;
        var imgCount = 0;
        if(files.length + imgListBase64.length > 4){
            addBtn.hide();
            imgCount = 4 - imgListBase64.length;
            popPrompt('最多只能上传4张！');
        }else if(files.length + imgListBase64.length == 4){
            addBtn.hide();
            imgCount = files.length;
        }else{
            //addBtn.hide();
            imgCount = files.length;
        }
        if(imgCount > 0){
            commonCompt.addMask("图片加载中...");
        }
        for(var i=0; i<imgCount; i++){
            //判断类型是不是图片
            if (!/image\/\w+/.test(files[i].type)) {
                popPrompt("请确保文件为图像类型");
                return false;
            }

            //var dataURL = windowURL.createObjectURL(files[i]);
            //imgListUrl.push(dataURL);
            //position.html('');
            //for(var j=0;j<imgListUrl.length;j++){
            //    position.append('<span class="picture" style="background: url('+ imgListUrl[j] +') center center no-repeat;-webkit-background-size: cover;background-size: cover"><i></i></span>');
            //}

            //获取照片的拍摄方向
            var orient;
            EXIF.getData(files[i], function () {
                orient = EXIF.getTag(this, 'Orientation');
            });

            var reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = function(e) {

                var canvas=document.createElement("canvas");
                var ctx=canvas.getContext("2d");
                var image=new Image();
                // var image = $('#photo')[0];
                image.src=this.result;
                //imgListUrl.push(this.result);
                //position.html('');
                //for(var j=0;j<imgListUrl.length;j++){
                //    position.append('<span class="picture" style="background: url('+ imgListUrl[j] +') center center no-repeat;-webkit-background-size: cover;background-size: cover"><i></i></span>');
                //}

                image.onload=function(){
                    //alert(orient);
                    var cw=image.width;
                    var ch=image.height;
                    var w=image.width;
                    var h=image.height;
                    canvas.width=w;
                    canvas.height=h;


                    if(cw>1920&&cw>ch){
                        w=1920;
                        h=(1920*ch)/cw;
                        canvas.width=w;
                        canvas.height=h;
                    }
                    if(ch>1920&&ch>cw){
                        h=1920;
                        w=(1920*cw)/ch;
                        canvas.width=w;
                        canvas.height=h;
                    }

                    if (orient == 6) {
                        canvas.width = h;
                        canvas.height = w;
                        ctx.rotate(90 * Math.PI / 180);
                        ctx.drawImage(image, 0, -h, w, h);
                    } else {
                        // 执行Canvas的drawImage语句
                        ctx.drawImage(image,0,0,w,h);
                    }

                    imgListBase64.push(canvas.toDataURL("image/jpeg"));
                    console.log(imgListBase64);
                    position.html('');
                    for(var j=0;j<imgListBase64.length;j++){
                        position.append('<span class="picture" style="background: url('+ imgListBase64[j] +') center center no-repeat;-webkit-background-size: cover;background-size: cover"><i></i></span>');
                    }

                    if($('#mask')){
                        $('#mask').remove();
                    }
                }

            }
        }
        //console.log("添加结束",imgListBase64);

    },

    //验证手机号
    checkPhone: function(phoneNum) {
        var pattern = /^1[0-9]{10}$/;
        var isPhone = 1;
        if (phoneNum != '' && !pattern.test(phoneNum)) {
            //this.popPrompt('错误的手机号码');
            isPhone = 0;
        } else {
            isPhone = 1;
        }
        return isPhone;
    },

    //姓名校验函数
    nameVerify: function(val) {
        //var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        //var reg_space = /(^\s+)|(\s+$)/g;
        var reg_space = /(^\s+)|(\s+$)/g;
        //var reg_num = /\d/g;
        //var regIcon = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (val !== "" && (reg_space.test(val))) {
            return false;
        } else {
            return true;
        }
    },

    //验证码倒计时
    timeCount: function(remainTime, sendBtn) {
        var timer = null;

        sendBtn.attr("disabled", true); //设置disabled属性
        sendBtn.html('重新发送(' + remainTime + ')');

        var remain = remainTime;
        timer = setInterval(function() {
            remain--;
            sendBtn.html('重新发送(' + remain + ')');
            if (remain <= 0) {
                sendBtn.removeAttr("disabled"); //移除disabled属性
                sendBtn.html('获取验证码');
                clearInterval(timer); //清除setInterval
            }
        }, 1000);
    },

    trim: function(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
        //alert($a.length);
        //   alert(str.length);
    },

    //验证手机号
    verifyPhone: function(remainTime,title,hasCloseBtn,type,submitPrompt,callBack){
        var bool_result = false;
        var html =  '<div id="registerWrap">'+
                        '<div class="register">'+
                            '<i class="verify_close"></i>'+
                            '<h3>' + title + '</h3>'+
                            '<input type="number" placeholder="请填写您的手机号码" id="phoneNum">'+
                            '<div class="verify">'+
                                '<input type="number" placeholder="请填写验证码" id="code">'+
                                '<button>获取验证码</button>'+
                            '</div>'+
                            '<button id="regSubmit">提交</button>'+
                        '</div>'+
                    '</div>';
        $('body').append(html);
        $('#registerWrap').fadeIn(300);

        if(hasCloseBtn){
            $('.verify_close').show();
        }

        var _that = this;
        $('.verify button').on('click', function(){
            var $phoneNum = $('#phoneNum').val();
            if(!$phoneNum){
                _that.popPrompt("手机号不能为空");
            }else if(!_that.checkPhone($phoneNum)){
                _that.popPrompt("错误的手机号码");
            }else {
                $.ajax({
                    url: GETCODE,
                    data: {
                        phone: $phoneNum,
                        type: 1
                    },
                    type:'POST',
                    dataType:'json',
                    //async:false,
                    success:function(data){
                        console.log(data);
                        console.log({
                            phone: $phoneNum,
                            type: 1
                        });
                        apiResponse(data.responseCode,data.responseDesc);
                        if(data.responseCode == 2000){
                            _that.timeCount(remainTime,$('.verify button'));
                            _that.popPrompt("验证码已发送");
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                })
            }
        })

        $('#regSubmit').on('click', function(){
            var $phoneNum = $('#phoneNum').val();
            if(!$phoneNum){
                _that.popPrompt("手机号不能为空");
            }else if(!_that.checkPhone($phoneNum)){
                _that.popPrompt("错误的手机号码");
            }else {
                $.ajax({
                    url: UPDATEPHONE,
                    data: {
                        phone: $phoneNum,
                        checkCode: $('#code').val()
                    },
                    type:'POST',
                    dataType:'json',
                    //async:false,
                    success:function(data){
                        console.log(data);
                        console.log({
                            phone: $phoneNum,
                            checkCode: $('#code').val()
                        });
                        apiResponse(data.responseCode,data.responseDesc);
                        if(data.responseCode == 2000){
                            _that.popPrompt(submitPrompt);
                            if(callBack){
                                callBack($phoneNum);
                            }
                            $('#registerWrap').fadeOut(300,function(){
                                $('#registerWrap').remove();
                            });

                            bool_result = true;
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                })
            }
        })

        $('.verify_close').on('click',function(){
            $('#registerWrap').fadeOut(300,function(){
                $('#registerWrap').remove();
            });
        })

        return bool_result;
    },

    //小数较精确的加法
    accAdd: function(arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0};
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0};
        m=Math.pow(10,Math.max(r1,r2));
        return (arg1*m+arg2*m)/m;
    },

    //小数较精确的减法运算
    accSub: function(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
    },

    //获取地址栏参数
    GetUrlPara: function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },

    //数组包含
    isContained: function(a,b){
        if(a.length < b.length) return false;
        for(var i = 0, len = b.length; i < len; i++){
            if(a.indexOf(b[i]) == -1) return false;
        }
        return true;
    },

    //区间随机数
    randomNum: function(num){
        var trueNum = parseFloat(num);
        if(trueNum < 100){
            trueNum *=  (1 + 0.1*Math.random());
        }else if(trueNum >= 100 && trueNum < 500){
            trueNum *=  (1 + 0.05*Math.random());
        }else if(trueNum >= 500 && trueNum < 1000){
            trueNum *=  (1 + 0.03*Math.random());
        }else if(trueNum >= 1000 && trueNum < 3000){
            trueNum *=  (1 + 0.02*Math.random());
        }else if(trueNum >= 3000){
            trueNum *=  (1 + 0.01*Math.random());
        }
        return parseFloat(trueNum.toFixed(2));
    }

}


