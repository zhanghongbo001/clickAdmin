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
                        <h4 class="pull-left page-title">访问明细</h4>
                    </div>
                </div>
                <form action="" class="search form-inline" role="form" method="post">
                    <div style="padding-left: 21px;">
                        <div class="form-group">
                            <input type="text" name="account" class="form-control" id="account"
                                   placeholder="输入用户名查找"/>
                            <input type="text" name="keyword" class="form-control" id="keyword"
                                   placeholder="输入关键词查找"/>
                        </div>
                        <input type="button" id="today" class="btn btn-primary" value="今天"/>
                        <input type="button" id="yesterday" class="btn btn-primary" value="昨天"/>
                        <input type="button" id="beforeYesterday" class="btn btn-primary" value="前天"/>
                    </div>
                </form>
                <div class="panel">
                    <div class="panel-body">
                        <table class="table table-bordered table-striped" id="datatable-editable">
                            <thead>
                            <tr>
                                <th>浏览时间</th>
                                <th>受访</th>
                                <th>IP</th>
                            </tr>
                            </thead>
                            <tbody>
                            <%--<c:choose>
                                <c:when test="${empty webTaskExecuteLog}">
                                    <tr>
                                        <td colspan="3">没有数据</td>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach items="${webTaskExecuteLog}" var="web">
                                        <input type="hidden" id="adminId" value="${web.id}"/>
                                        <tr class="grade">
                                            <td><fmt:formatDate value="${web.createTime}"
                                                                pattern="HH:mm:ss"/></td>
                                            <td>${web.currentUrl}</td>
                                            <td>${web.ip}</td>
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
    <script src="${ctx}/assets/webTaskExecuteLog/list.js"></script>
</body>
</html>
