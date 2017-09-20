$(function () {
    $(document).ready(function () {
        $('#btn-submit-search').click(function () {
            $formSearch = $('.search.form-inline');
            var datas = $formSearch.serialize();
            $.ajax({
                url: ctx + "/webTaskItem/count",
                type: "POST",
                data: datas,
                success: function (result) {
                    if (result.success == false) {
                        //先清空tbody中的数据
                        $('#datatable-editable').children().next().html("")
                        htmltr += "<tr>"
                            + "<td colspan='5'>"+result.errorMsg+"</td>"
                            + "</tr>";
                        $('#datatable-editable').append(htmltr);
                    } else {
                        if (result.length != 0) {
                            //先清空tbody中的数据
                            $('#datatable-editable').children().next().html("")
                            for (var i = 0; i < result.length; i++) {
                                var htmltr = "";
                                var item = result[i];
                                htmltr += "<tr class='grade'>"
                                    + "<td>" + item.account + "</td>"
                                    + "<td>" + item.num + "</td>"
                                    + "<td>" + item.expense + "</td>"
                                    + "<td>" + item.balance + "</td>"
                                    + "<td>" + item.domain + "</td>"
                                    + "</tr>";
                                $('#datatable-editable').append(htmltr);
                            }
                        } else {
                            //先清空tbody中的数据
                            $('#datatable-editable').children().next().html("")
                            htmltr += "<tr>"
                                + "<td colspan='5'>该用户暂时没有相关消费记录</td>"
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