$(document).ready(function () {
    var products = {
        firstProducts: {
            price: 396,
            selectcheakbox: $(".firstProducts>ul>.selects>.selectcheakbox"),
            productsimg: $(".firstProducts>ul>.products>.productsimg"),
            productsname: $(".firstProducts>ul>.products>.productsname"),
            totalPrice: $(".firstProducts>ul>.total>.totalPrice"),
            univalent: $(".firstProducts>ul>.price>.univalent"),
            subtract: $(".firstProducts>ul>.number>.subtract"),
            productsnumber: $(".firstProducts>ul>.number>.productsnumber"),
            add: $(".firstProducts>ul>.number>.add"),
            operation: $(".firstProducts>ul>.operation")
        },
        secondProducts: {
            price: 396,
            selectcheakbox: $(".secondProducts>ul>.selects>.selectcheakbox"),
            productsimg: $(".secondProducts>ul>.products>.productsimg"),
            productsname: $(".secondProducts>ul>.products>.productsname"),
            totalPrice: $(".secondProducts>ul>.total>.totalPrice"),
            univalent: $(".secondProducts>ul>.price>.univalent"),
            subtract: $(".secondProducts>ul>.number>.subtract"),
            productsnumber: $(".secondProducts>ul>.number>.productsnumber"),
            add: $(".secondProducts>ul>.number>.add"),
            operation: $(".secondProducts>ul>.operation")
        },
        thirdProducts: {

            price: 396,
            selectcheakbox: $(".thirdProducts>ul>.selects>.selectcheakbox"),
            productsimg: $(".thirdProducts>ul>.products>.productsimg"),
            productsname: $(".thirdProducts>ul>.products>.productsname"),
            totalPrice: $(".thirdProducts>ul>.total>.totalPrice"),
            univalent: $(".thirdProducts>ul>.price>.univalent"),
            subtract: $(".thirdProducts>ul>.number>.subtract"),
            productsnumber: $(".thirdProducts>ul>.number>.productsnumber"),
            add: $(".thirdProducts>ul>.number>.add"),
            operation: $(".thirdProducts>ul>.operation")
        },
        fourProducts: {
            price: 396,
            selectcheakbox: $(".fourProducts>ul>.selects>.selectcheakbox"),
            productsimg: $(".fourProducts>ul>.products>.productsimg"),
            productsname: $(".fourProducts>ul>.products>.productsname"),
            totalPrice: $(".fourProducts>ul>.total>.totalPrice"),
            univalent: $(".fourProducts>ul>.price>.univalent"),
            subtract: $(".fourProducts>ul>.number>.subtract"),
            productsnumber: $(".fourProducts>ul>.number>.productsnumber"),
            add: $(".fourProducts>ul>.number>.add")
        }
    };
    var operation = $(".fourProducts>ul>.operation");

    $(".add").on("click", function () {
        var n = $(this).attr("title");//获取当前点击按钮所属物品
        var num = products[n].productsnumber.val();//原商品数量
        var nums = parseInt(num) + 1;//新增后商品数量
        products[n].productsnumber.val(nums);//新增后商品数量
        products[n].price = totalPriceFun(n, parseInt(products[n].univalent.text()), parseInt(nums));//计算当前单个商品总价
        signup(accountsAll(productsList()));//更新总价格
    });
    $(".subtract").on("click", function () {
        var n = $(this).attr("title");//获取当前点击按钮所属物品

        var i = parseInt(products[n].productsnumber.val());//原商品数量
        if (i !== 1 && i > 1) {
            var nums = parseInt(i) - 1;
            products[n].productsnumber.val(nums);//减少后商品数量
            products[n].price = totalPriceFun(n, parseInt(products[n].univalent.text()), parseInt(nums));//计算当前单个商品总价
            signup(accountsAll(productsList()));//更新总价格
        } else if (i == 0) {
            products[n].productsnumber.val(1);
            products[n].price = totalPriceFun(n, parseInt(products[n].univalent.text()), parseInt(nums));//计算当前单个商品总价
            signup(accountsAll(productsList()));//更新总价格
        } else if (i < 1) {
            throw new Error("商品数量错误！");
        }
        if (i === 1) {

            signup(accountsAll(productsList()));
            return;
        }
    });
    $(":checkbox").on("click", function () {
        signup(accountsAll(productsList()));//更新价格
    });
    function totalPriceFun(n, i, w) {
        var price = 0;
        products[n].totalPrice.text(parseInt(i) * parseInt(w));
        price = parseInt(products[n].totalPrice.text());
        if (checked(n)) {
            return price;
        } else {
            return price = 0;
        }

    }//单个商品总价

    function checked(n) {
        var check = products[n].selectcheakbox.prop('checked');
        return check;
    }//判断是否选择

    var productsList = function () {
        var arrslist = [];
        for (var list in products) {
            arrslist.push(list);
        }
        return arrslist;
    };//遍历出商品名称

    function accountsAll(i) {

        var sum = 0;
        for (n in i) {
            var w = i[n];
            products[w].price = totalPriceFun(w, parseInt(products[w].univalent.text()), products[w].productsnumber.val());
            if (checked(w)) {
                sum += parseInt(products[w].price);
            } else {
                products[w].price = 0;
                sum += products[w].price;
            }
        }
        return (sum);
    }//计算总价格


    function signup(i) {
        $(".accountsAll").text(i);
    }//更新价格至前台
    var titleselectbox = $(".buyTitle>ul>.titleselect>.buyTitlechecked");


    titleselectbox.click(function () {
        var isChecked = $(this).prop("checked");
        $("input[class='selectcheakbox']").prop("checked", isChecked);
        signup(accountsAll(productsList()));//更新价格
    });//全选 反选

    $("input[class='selectcheakbox']").click(function () {
        var isChecked = $(this).prop("checked");
        titleselectbox.prop("checked", isChecked);

    });


    $(".icon3").on("mouseover", (function () {
        $(".weixin").css("visibility", "visible");
    }));

    $(".icon3").on("mouseout", (function () {
        $(".weixin").css("visibility", "hidden");
    }));

    $(":text").on("input propertychange", function () {
        var text = $(":text").val();
        $(":text").val();

        if (text == 0) {
            $(":text").val(1);
        }

        var n = $(this).attr("title");//获取当前点击按钮所属物品
        products[n].price = totalPriceFun(n, parseInt(products[n].univalent.text()), parseInt(products[n].productsnumber.val()));//计算当前单个商品总价
        signup(accountsAll(productsList()));//更新总价格
        $(":text").val();
    });

});
