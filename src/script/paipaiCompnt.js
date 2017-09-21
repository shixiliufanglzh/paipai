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
        $('#mainNav button')
        $('#mainNav').on('click','button',function(){
            //$('#mainNav button').removeClass('active');
            //$(this).addClass('active');
        })
    }
}