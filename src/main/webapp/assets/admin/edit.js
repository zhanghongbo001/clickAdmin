$(function () {
    $(document).ready(function () {
        var nums = $("#inputEmail3").val();
        if (nums >= "99999999.99") {
            $("#userCues").css('display','block');
            $("#userCues").html("<font color='red'><b>×账户余额超出限制,不能增加余额额度</b></font>");
            $("#inputBalance").attr('disabled','disabled');
            $("#balance-submit").attr('disabled','disabled');
            return false;
        }
    });
    $("#balance-submit").click(function () {
        if ($("#inputBalance").val() == "") {
            $("#inputBalance").focus().css({
                border: "1px solid red",
                boxShadow: "0 0 2px red"
            });
            $("#userCues").css('display','block');
            $("#userCues").html("<font color='red'><b>×增加金额不能为空！</b></font>");
            return false;
        }
        $formlogin = $("#edit-balance");
        var datas = $formlogin.serialize();
        $.ajax({
            url: ctx + "/admin/edit",
            type: "post",
            data: datas,
            success: function (result) {
                if (result.success == false) {
                    $("#userCues").css('display','block');
                    $("#userCues").html("<font color='red'><b>×" + result.errorMsg + "</b></font>");
                    return false;
                } else {
                    window.location.href=ctx+"/admin/list";
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