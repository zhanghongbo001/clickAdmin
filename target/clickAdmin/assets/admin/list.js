$(function () {
    $(document).ready(function () {
        //查询用户信息
        function all() {
            $formSearch = $('.search.admin.form-inline');
            var datas = $formSearch.serialize();
            $.ajax({
                url: ctx + "/admin/lists",
                type: "POST",
                data: datas,
                success: function (result) {
                    if (result.success == false) {
                        //先清空tbody中的数据
                        $('#datatable-editable').children().next().html("")
                        htmltr += "<tr>"
                            + "<td colspan='5'>" + result.errorMsg + "</td>"
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
                                    + "<td>" + item.id + "</td>"
                                    + "<td>" + item.account + "</td>"
                                    + "<td>******</td>"
                                    + "<td>" + item.balance + "</td>"
                                    + "<td class='actions'><a href='javascript:;' class='hidden on-editing save-row'><i class='fa fa-save'></i></a>"
                                    + "<a href='javascript:;' class='hidden on-editing cancel-row'><i class='fa fa-times'></i></a>"
                                    + "<a href='javascript:;' id='J_update_" + item.id + "' class='J_update' title='修改'><i class='fa fa-pencil'></i></a>"
                                    + "<a href='javascript:;'  class='hidden on-default remove-row' title='删除'><i class='fa fa-trash-o'></i></a>"
                                    + "<a href='javascript:;' id='J_Reset_" + item.id + "' class='J_Reset' title='重置密码,重置后新密码为：123456'><i class='fa fa-repeat'></i></a>"
                                    + "</td>"
                                    + "</tr>";
                                $('#datatable-editable').append(htmltr);
                            }
                        } else {
                            //先清空tbody中的数据
                            $('#datatable-editable').children().next().html("")
                            htmltr += "<tr>"
                                + "<td colspan='5'>没有该用户的信息！</td>"
                                + "</tr>";
                            $('#datatable-editable').append(htmltr);
                        }
                    }
                }
            });
        };

        //自调函数---查询所有用户数据信息
        all();

        //点击搜索
        $('#btn-submit-search-admin').click(function () {
            //调用函数--查询单个用户函数（在此处的作用）
            all();
            return false;
        });
        //重置用户密码
        $("body").delegate(".J_Reset", "click", function () {
            var $this = $(this);
            layer.confirm('确定重置该用户的密码？重置后的新密码是：123456', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                var selectAdminId = $this.attr("id");
                if (selectAdminId) {
                    selectAdminId = parseInt(selectAdminId.replace("J_Reset_", ""));
                }
                window.location.href = ctx + "/admin/repeatPassword?id=" + selectAdminId;
            });
        });

        //修改用户金额
        $("body").delegate(".J_update", "click", function () {
            var $this = $(this);
            var selectAdminId = $this.attr("id");
            if (selectAdminId) {
                selectAdminId = parseInt(selectAdminId.replace("J_update_", ""));
            }
            window.location.href = ctx + "/admin/edit?id=" + selectAdminId;
        });

    });
});