$(function () {
    $(document).ready(function () {
        $(":button").click(function () {
            if ($(this).attr("id") == "today") {
                $("#today").css("background", "#a79e9e");
                $("#yesterday").css("background", "#1e88e5");
                $("#beforeYesterday").css("background", "#1e88e5");
            } else if ($(this).attr("id") == "yesterday") {
                $("#today").css("background", "#1e88e5");
                $("#yesterday").css("background", "#a79e9e");
                $("#beforeYesterday").css("background", "#1e88e5");
            } else if ($(this).attr("id") == "beforeYesterday") {
                $("#today").css("background", "#1e88e5");
                $("#yesterday").css("background", "#1e88e5");
                $("#beforeYesterday").css("background", "#a79e9e");
            }
            //筛选条件
            var time = $(this).attr("id");
            if ($("#keyword").val() == "" || $("#account").val() == "") {
                layer.alert('请输入你要搜索的用户名与关键词', {icon: 5});
                $("#today").css("background", "#1e88e5");
                $("#yesterday").css("background", "#1e88e5");
                $("#beforeYesterday").css("background", "#1e88e5");
                return false;
            }
            $.ajax({
                url: ctx + "/webTaskExecuteLog/todayLog",
                type: "POST",
                data: {time: time, keyword: $("#keyword").val(), account: $("#account").val()},
                success: function (result) {
                    if (result.success == false) {
                        //先清空tbody中的数据
                        $('#datatable-editable').children().next().html("")
                        htmltr += "<tr>"
                            + "<td colspan='3'>" + result.errorMsg + "</td>"
                            + "</tr>";
                        $('#datatable-editable').append(htmltr);
                    } else {
                        if (result.length != 0) {
                            var newTime = "";
                            var youWant = "";
                            //先清空tbody中的数据
                            $('#datatable-editable').children().next().html("")
                            for (var i = 0; i < result.length; i++) {
                                var htmltr = "";
                                var item = result[i];
                                //格式化日期格式2016年10月28日15:04:18
                                newTime = new Date(item.createTime);
                                youWant = newTime.getFullYear() + '-' + (newTime.getMonth() + 1) + '-' + newTime.getDate() + ' ' + newTime.getHours() + ':' + newTime.getMinutes() + ':' + newTime.getSeconds();
                                htmltr += "<tr class='grade'>"
                                    + "<td>" + youWant + "</td>"
                                    + "<td>" + item.currentUrl + "</td>"
                                    + "<td>" + item.ip + "</td>"
                                    + "</tr>";
                                $('#datatable-editable').append(htmltr);
                            }
                        } else {
                            //先清空tbody中的数据
                            $('#datatable-editable').children().next().html("")
                            htmltr += "<tr>"
                                + "<td colspan='3'>该用户关键词暂时没有相关访问数据</td>"
                                + "</tr>";
                            $('#datatable-editable').append(htmltr);
                        }
                    }
                }
            });
            return false;
        });
    });
});