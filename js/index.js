$(document).ready(function () {
    $(".inp").css("fontSize", "22px");


    $(".car").hover(function () {
        $(".car-info").css("backgroundColor", "white")
        $(".car-info>a").css("color", "orange")
        $(".car-blcok").slideDown(130)
    },
        function () {
            $(".car-info").css("backgroundColor", "rgb(66, 66, 66)")
            $(".car-info>a").css("color", "#b0b0b0")
            $(".car-blcok").slideUp(130)
        }

    )




    /*搜索框*/
    $(".search").on("focus", function () {
        $(".keywordList").show();
        $(".inp").css("borderColor", "orange");
        $(".search").css("borderColor", "orange");
        $(".search-hot").hide()
    });


    $(".search").on("blur", function () {
        $(".keywordList").hide();
        $(".inp").css("borderColor", "rgb(204, 204, 204)");
        $(".search").css("borderColor", "rgb(204, 204, 204)");
        $(".search-hot").show()
    })
    // 文档加载完成事件
    let goodsNav;
    let goodsFlag;

    $(document).ready(function () {
        getData();
        eventInit();
        pheno();
        listhomeAppliancesItme()
    });

    // 获取后台数据
    function getData() {

        $.ajax({
            url: "data/goods-nav.json",
            success: function (result) {
                console.log(result);
             homeAppliances()
                goodsNav = result;
              
            }
        });

    }

    // 事件的初始化
    function eventInit() {

        $(".showbox-wrap").hover(function () {
            $(".goods-slide-wrap").slideDown(200);
        }, function (event) {

            $(".goods-slide-wrap").slideUp(200);

        });

        $(".goods-item").hover(function () {
            let id = $(this).attr("data-id");
            if (id) {
                fillListById(id);
            }
        });
    }


    // 填充内容，更新页面
    function fillList(list) {
        let html = "";
        for (let i = 0; i < list.length; i++) {
            html += '<div class="goods-slide-item">';
            if (list[i].isNew) {
                html += '<div class="goods-new-wrap">';
                html += '<div class="goods-new">新品</div>';
                html += '</div>';
            }


            html += '<div class="goods-slide-img">';
            html += '<img src="' + list[i].imgUrl + '" alt="">';
            html += '</div>';
            html += '<div class="goods-slide-name">' + list[i].name + '</div>';
            html += '<div class="goods-slide-price">' + list[i].price + '</div>';
            html += '</div>';
        }

        $("#goods-slide-content").html(html);
    }

    // 根据id填充商品导航列表
    function fillListById(id) {
        if (id == "phone" && goodsFlag != "phone") {
            fillList(goodsNav.phoneList);
            goodsFlag = "phone";
        }

        if (id == "redmi" && goodsFlag != "redmi") {
            fillList(goodsNav.redMiList);
            goodsFlag = "redmi";
        }
    }





    //showbox
    $(".x").on("click", function () {
        $(".showwrap").css("top", "-300px").css("opacity", 0);
        $(".showbox").fadeOut(800);
    })


    $("#show").click(function () {


        $(".showbox").fadeIn(600);
        $(".showwrap").css("display", "block");
        $(".showwrap").animate({
            "top": "50%",
            "opacity": "1"
        }, 200);
    })

    $(".showbox").on("click", function () {
        $(".showwrap").css("top", "-300px").css("opacity", 0)

        $(".showbox").fadeOut(800);
    })
    //showbox 结束

    //轮播
    var mySwiper = new Swiper('.swiper-container', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,//1秒切换一次
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    mySwiper.el.onmouseover = function () { //鼠标放上暂停轮播
        mySwiper.autoplay.stop();
    }
    mySwiper.el.onmouseleave = function () {
        mySwiper.autoplay.start();
    }


    /*手机ajax*/

    function pheno() {
        $.ajax({
            url: "../data/pheno.json",
            success: function (result) {
                listpheno(result.phone);
                console.log(result.phone);
            }
        })
    }


    function listpheno(list) {
        let html = "";
        for (let i = 0; i < 8; i++) {
            html += ' <div class="pheno-content hover-tran">';
            if (list[i].isNew) {
                html += '<div class="flag flag-new">';
                html += "新品";
            } else {
                if (list[i].cost != null) {
                    html += '<div class="flag flag-old">';
                    html += "打8折";
                } else {
                    html += '<div class="flag">';
                }
            }
            html += ' </div>';
            html += ' <a class="" href=""><img src="' + list[i].imgUrl + '" alt=""></a>';
            html += '<a class="pheno-content-name" href="">' + list[i].name + '</a>';
            html += ' <span class="pheno-content-title">' + list[i].particulars + '</span>';
            html += ' <p class="pheno-content-price">' + list[i].price;
            if (list[i].cost != null) {
                html += '<del class="del-a">' + list[i].cost + '</del>';
            }
            html += '</p>';
            html += ' </div>';
        }
        $("#pheno-rigth").html(html)
    }



    /*家电*/
    let datalist;
    function homeAppliances() {
        $.ajax({
            url: "../data/homeAppliances.json",
            method: "",
            data: {},
            success: function (result) {
                datalist=result;
                console.log(result);
                listhomeAppliances(result.hot)
            }
        })
    }

    


function listhomeAppliancesItme(){
     $(".appliances-title-name").hover(function () {
            let id = $(this).attr("data-num");
            console.log(typeof id)
            listhomeAppliances(datalist[id])
            console.log(datalist[id]);
        })
}

       
       

    

    function listhomeAppliances(list) {
        
        let html = "";
        for (let j = 0; j < list.length - 1; j++) {
            html += '<div class="homeAppliances-rigth-box hover-tran">';
            if (list[j].title != null) {
                if (list[j].title == "新品") {
                    html += '<div class="homeAppliances-top flag-new">';
                    html += list[j].title;
                    html += '</div>';
                } else {
                    html += '<div class="homeAppliances-top flag-old">';
                    html += list[j].title;
                    html += '</div>';
                }
            } else {
                html += '<div class="homeAppliances-top">';
                html += '</div>';
            }

            html += '<a href=""><img src="' + list[j].imgUrl + '" alt=""></a>';
            html += '<a href="" class="homeAppliances-content-name">' + list[j].name + '</a>';
            if (list[j].particulars != null) {
                html += '<span class="homeAppliances-content-title">' + list[j].particulars + '</span>';
            } else {
                html += '<span class="homeAppliances-content-title"></span>';
            }

            html += '<p class="homeAppliances-content-price">' + list[j].price;
            if (list[j].cost != null) {
                html += '<del class="del-a">' + list[j].cost + '</del>';
            }
            html += '</p>';
            html += '<div class="hide-box">';
            html += '<a class="hide-box-title" href="">';
            html += '<p>' + list[j].evaluate + '</p>';
            html += '<span>' + list[j].username + '</span>';
            html += '</a>';
            html += '</div>';
            html += '</div>';
        }

        html += '<div class="homeAppliances-flagbox">';
        html += '<div class="homeAppliances-flag desc hover-tran">';
        html += '<div class="desc-left">';
        html += '<a href="">' + list[7].name + '</a>';
        html += '<p>' + list[7].price + '</p>';
        html += '</div>';
        html += '<div class="desc-img"><a href=""><img src="' + list[7].imgUrl + '"alt=""></a></div>';
        html += '</div>';
        html += '<div class="desc hover-tran">';
        html += '<div class="desc-left">';
        html += '<h2>浏览更多</h2>';
        html += '<span class="desc-left-span">健康</span>';
        html += '</div>';
        html += '<div class="desc-img dd">';
        html += '<span class="iconfont" id="desc-img-span">&#xe643;</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';


        $(".homeAppliances-rigth").html(html);
    }




})

