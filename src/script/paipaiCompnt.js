/**
 * Created by 是昔流芳 on 2017/9/19.
 */

var Paipai = function(){
    this.desc="商品描述";
    this.price_now = 0;
    this.price_primary = 0;
}

Paipai.prototype = {
    goodsListDom: function(){
        var html;
        html = '<div class="single_good">'+
                    '<div class="item_img"></div>'+
                    '<div class="about">'+
                        '<p class="desc">'+ this.desc +'</p>'+
                        '<div class="price">'+
                            '<span class="price_now">'+ this.price_now +'</span>'+
                            '<span class="price_primary">'+ this.price_primary +'</span>'+
                            '<i class="hummer"></i>'+
                        '</div>'+
                    '</div>'+
                '</div>'

        return html;
    },

    //待支付订单的计时器列表创建
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


var commonCompt = {

    //弹出对话框
    Confirm: function (objPara){
        var html =  '<div id="confirm" style="position:fixed;background-color:rgba(0,0,0,0.8);top:0;left:0;right:0;bottom:0;z-index:99;display:none">'+
            '<div class="content" style="width:4.5rem;position:absolute;left:50%;margin-left:-2.25rem;margin-top:4rem;background-color:#fff;-webkit-border-radius:0.1rem;-moz-border-radius:0.1rem;border-radius:0.1rem;overflow:hidden;">'+
            '<div class="title" style="color:#f95454;font-size:0.3rem;text-align: center;padding:0.24rem 0 0.14rem;border-bottom:1px solid #c5c5c5;display:none">'+objPara.title+'</div>'+
            '<p class="text" style="font-size:0.28rem;color:#2f2f2f;line-height:0.4rem;padding:0.3rem 0.6rem;text-align: center;border-bottom:1px solid #c5c5c5;">'+objPara.contentText+'</p>'+
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
        $('#confirm').fadeIn();
        $('#confirm .action .cancel').click(function(){
            objPara.rightBtnClick();
            $('#confirm').fadeOut(300,function(){
                $('#confirm').remove();
            });

        })
        $('#confirm .action .certain').click(function(){
            objPara.leftBtnClick();
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
                            '<i></i><br><span>收藏</span>'+
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

    }

}


