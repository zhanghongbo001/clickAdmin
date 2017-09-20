<%@page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="zh_CN">
<%@include file="/WEB-INF/view/layout/header.jsp" %>
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
                        <h4 class="pull-left page-title">用户消费记录</h4>
                    </div>
                </div>
                <form action="" class="search form-inline" role="form" method="post">
                    <div style="padding-left: 21px;">
                        <div class="form-group">
                            <label class="sr-only" for="account">输入用户名查找</label>
                            <input type="text" name="account" class="form-control" id="account"
                                   placeholder="输入用户名查找">
                        </div>
                        <button type="submit" id="btn-submit-search"
                                class="btn btn-info waves-effect waves-light m-l-10">搜索
                        </button>
                    </div>
                </form>
                <div class="panel">
                    <div class="panel-body">
                        <table class="table table-bordered table-striped" id="datatable-editable">
                            <thead>
                            <tr>
                                <th>用户名称</th>
                                <th>点击数(单位：次)</th>
                                <th>费用</th>
                                <th>余额</th>
                                <th>域名</th>
                            </tr>
                            </thead>
                            <tbody>
                            <%--<c:choose>
                                <c:when test="${empty web}">
                                    <tr>
                                        <td colspan="5">没有数据</td>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach items="${web}" var="webs">
                                        <input type="hidden" id="id" value="${webs.id}"/>
                                        <tr class="grade">
                                            <td>${webs.account}</td>
                                            <td>${webs.num}</td>
                                            <td>${webs.expense}</td>
                                            <td>${webs.balance}</td>
                                            <td>${webs.domain}</td>
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
            </div>
            <footer class="footer text-right">
                2016 © Moltran.
            </footer>
        </div>
    </div>
    <%@include file="/WEB-INF/view/layout/footer.jsp" %>
    <!-- 其他功能JS -->
    <script src="${ctx}/assets/webTaskItem/list.js"></script>
</body>
</html>
