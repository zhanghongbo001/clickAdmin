<%@page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh_CN">
<%@include file="/WEB-INF/view/layout/header.jsp" %>
<script src="${ctx}/assets/common/js/jquery-1.9.1.min.js"></script>
<script src="${ctx}/assets/common/js/bootstrap.min.js"></script>
<script src="${ctx}/assets/plugins/bootstrap3-editable/bootstrap-editable.js"></script>
<script src="${ctx}/assets/admin/list.js"></script>
<body class="fixed-left">
<div id="wrapper">
    <%@include file="/WEB-INF/view/layout/top.jsp" %>
    <%@include file="/WEB-INF/view/layout/left.jsp" %>
    <div class="content-page">
        <div class="content">
            <div class="container">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="pull-left page-title">用户信息</h4>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-body">
                        <div class="col-md-6">
                            <div class="panel panel-default">
                                <div class="panel-heading"><h3 class="panel-title">余额增加</h3></div>
                                <div class="panel-body">
                                    <form action="" id="edit-balance" method="post" class="form-horizontal" role="form">
                                        <div id="userCues" class="form-group" style="padding-left: 130px; display: none;">
                                            ${result}
                                        </div>
                                        <input type="hidden" value="${admin.id}" name="id"/>
                                        <div class="form-group">
                                            <label for="inputEmail3" class="col-sm-3 control-label">余额</label>
                                            <div class="col-sm-9">
                                                <input type="text" id="inputEmail3" disabled="true" value="${admin.balance}" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputBalance" class="col-sm-3 control-label">金额</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="balance" maxlength="11" class="form-control" id="inputBalance" placeholder="补充金额">
                                            </div>
                                        </div>
                                        <div class="form-group m-b-0">
                                            <div class="col-sm-offset-3 col-sm-9">
                                                <button type="submit" id="balance-submit" class="btn btn-info waves-effect waves-light">提交</button>
                                            </div>
                                        </div>
                                    </form>
                                </div> <!-- panel-body -->
                            </div> <!-- panel -->
                        </div> <!-- col -->
                    </div>
                    <!-- end: page -->
                </div>
                <!-- end Panel -->
            </div>
            <footer class="footer text-right">
                2016 © Moltran.
            </footer>
        </div>
    </div>
    <%@include file="/WEB-INF/view/layout/footer.jsp" %>
    <!-- 其他功能JS -->
    <script src="${ctx}/assets/admin/edit.js"></script>
</body>
</html>
