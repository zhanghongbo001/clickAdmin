<%@page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh_CN">
<%@include file="/WEB-INF/view/layout/header.jsp" %>
<!-- laypage css-->
<link rel="stylesheet" href="${ctx}/assets/common/lib/laypage/skin/laypage.css">
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
                        <h4 class="pull-left page-title">用户列表</h4>
                    </div>
                </div>
                <form action="" class="search admin form-inline" role="form" method="post">
                    <div style="padding-left: 21px;">
                        <div class="form-group">
                            <label class="sr-only" for="account">输入用户名查找</label>
                            <input type="text" name="account" class="form-control" id="account"
                                   placeholder="输入用户名查找">
                        </div>
                        <button type="submit" id="btn-submit-search-admin"
                                class="btn btn-info waves-effect waves-light m-l-10">搜索
                        </button>
                    </div>
                </form>
                <div class="panel">
                    <div class="panel-body">
                        <table class="table table-bordered table-striped" id="datatable-editable">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th style="width: 220px;">密码</th>
                                <th>余额</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <input type="hidden" name="pageNum" id="j-pagenum" value="${pageNum}"/>
                            <%-- <c:choose>
                                 <c:when test="${empty adminlist}">
                                     <tr>
                                         <td colspan="5">没有数据</td>
                                     </tr>
                                 </c:when>
                                 <c:otherwise>
                                     <c:forEach items="${adminlist}" var="admin">
                                         <tr class="grade">
                                             <td>${admin.id}</td>
                                             <td>${admin.account}</td>
                                             <td>******</td>
                                             <td>${admin.balance}</td>
                                             <td class="actions">
                                                 <a href="#" class="hidden on-editing save-row"><i
                                                         class="fa fa-save"></i></a>
                                                 <a href="#" class="hidden on-editing cancel-row"><i
                                                         class="fa fa-times"></i></a>
                                                 <a href="${ctx}/admin/edit?id=${admin.id}" class="on-default edit-row"
                                                    title="修改"><i
                                                         class="fa fa-pencil"></i></a>
                                                 <a href="#" class="hidden on-default remove-row" title="删除"><i
                                                         class="fa fa-trash-o"></i></a>
                                                 <a href="${ctx}/admin/repeatPassword?id=${admin.id}"
                                                    class="on-default repeat-row" onclick="if(confirm('确定重置该${admin.account}用户的密码为：123456吗？')==false)return false;" title="重置密码,重置后新密码为：123456"><i
                                                         class="fa fa-repeat"></i></a>
                                             </td>
                                         </tr>
                                     </c:forEach>
                                 </c:otherwise>
                             </c:choose>--%>
                            </tbody>
                        </table>
                    </div>
                    <!-- end: page -->
                </div>
                <!-- end Panel -->
                <div id="page"></div>
            </div>
            <footer class="footer text-right">
                2016 © Moltran.
            </footer>
        </div>
    </div>
    <%@include file="/WEB-INF/view/layout/footer.jsp" %>
    <!--laypage js-->
    <script src="${ctx}/assets/common/lib/laypage/laypage.js"></script>
    <script>
        window._TOTAL_PAGE = '${adminlist.getPages()}';
        window._CURRENT_PAGE = '${pageNum}';
    </script>
    <!-- 其他功能JS -->
        <script src="${ctx}/assets/admin/list.js"></script>
        <%--<script src="${ctx}/assets/common/js/page.js"></script>--%>
</body>
</html>
