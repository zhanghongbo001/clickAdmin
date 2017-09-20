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
                        <h4 class="pull-left page-title">充值列表</h4>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-body">
                        <table class="table table-bordered table-striped" id="datatable-editable">
                            <thead>
                            <tr>
                                <th>订单ID</th>
                                <th>订单名称</th>
                                <th>支付金额</th>
                                <th>订单创建时间</th>
                                <th>订单创建人</th>
                                <th>支付状态</th>
                                <th>订单描述</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:choose>
                                <c:when test="${empty recharge}">
                                    <tr>
                                        <td colspan="7">没有数据</td>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach items="${recharge}" var="recharges">
                                        <input type="hidden" id="id" value="${recharges.id}"/>
                                        <tr class="grade">
                                            <td>${recharges.orderId}</td>
                                            <td>${recharges.orderName}</td>
                                            <td>${recharges.totalFee}</td>
                                            <td><fmt:formatDate value="${recharges.createTime}"
                                            pattern="yyyy年MM月dd日HH点mm分ss秒"/></td>
                                            <td>${recharges.adminName}</td>
                                            <td>
                                                <c:choose>
                                                    <c:when test="${empty recharges.success}">
                                                        失败
                                                    </c:when>
                                                    <c:otherwise>成功</c:otherwise>
                                                </c:choose>
                                            </td>
                                            <td>${recharges.orderDesc}</td>
                                        </tr>
                                    </c:forEach>
                                </c:otherwise>
                            </c:choose>
                            </tbody>
                        </table>
                    </div>
                    <!-- end: page -->
                    <div class="page"></div>
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

</body>
</html>
