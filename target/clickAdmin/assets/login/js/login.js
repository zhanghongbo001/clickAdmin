$(function () {
    var defaultInd = 0;
    var list = $('#js_ban_content').children();
    var count = 0;
    var change = function (newInd, callback) {
        if (count) return;
        count = 2;
        $(list[defaultInd]).fadeOut(400, function () {
            count--;
            if (count <= 0) {
                if (start.timer) window.clearTimeout(start.timer);
                callback && callback();
            }
        });
        $(list[newInd]).fadeIn(400, function () {
            defaultInd = newInd;
            count--;
            if (count <= 0) {
                if (start.timer) window.clearTimeout(start.timer);
                callback && callback();
            }
        });
    }

    var next = function (callback) {
        var newInd = defaultInd + 1;
        if (newInd >= list.length) {
            newInd = 0;
        }
        change(newInd, callback);
    }

    var start = function () {
        if (start.timer) window.clearTimeout(start.timer);
        start.timer = window.setTimeout(function () {
            next(function () {
                start();
            });
        }, 8000);
    }

    start();

    $('#js_ban_button_box').on('click', 'a', function () {
        var btn = $(this);
        if (btn.hasClass('right')) {
            //next
            next(function () {
                start();
            });
        }
        else {
            //prev
            var newInd = defaultInd - 1;
            if (newInd < 0) {
                newInd = list.length - 1;
            }
            change(newInd, function () {
                start();
            });
        }
        return false;
    });

});

$(document).ready(function () {
    $("#login_form_submit").click(function () {

        if ($("#username").val() == "") {
            $("#username").focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            $("#userCues").css('display','block');
            $("#userCues").html("<font color='red'><b>×用户名不能为空</b></font>");
            return false;
        } else {
            $("#username").css({
                border: "1px solid #D7D7D7",
                boxShadow: "none"
            });
        }
        if ($("#password").val() == "") {
            $("#password").focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            $("#userCues").css('display','block');
            $("#userCues").html("<font color='red'><b>×密码不能为空</b></font>");
            return false;
        } else {
            $("password").css({
                border: "1px solid #D7D7D7",
                boxShadow: "none"
            });
        }

        /*var layerIdx = layer.load(3);*/
        $formlogin = $("#login_form");
        var datas = $formlogin.serialize();
        $.ajax({
            url: ctx + "/login",
            type: "post",
            data: datas,
            success: function (result) {
                if (result.success == false) {
                    $("#userCues").css('display','block');
                    $("#userCues").html("<font color='red'><b>×" + result.errorMsg + "</b></font>");
                    return false;
                } else {
                    window.location.href=ctx+"/index";
                }
            },
            error: function (result) {
                alert("系统出现问题，请及时联系管理员！");
                return false;
            }
        });
        return false;
    });
});