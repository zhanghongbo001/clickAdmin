<%@page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="zh_CN">
<%@include file="/WEB-INF/view/layout/header.jsp" %>
<!-- Chart JS -->
<script src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
<script src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script>
<script src="http://cdn.hcharts.cn/highcharts/modules/exporting.js"></script>
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
                        <h4 class="pull-left page-title">趋势分析</h4>
                    </div>
                </div>
                <form action="" class="search curve form-inline" role="form" method="post">
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
                        <!-- 生成用户的趋势图-->
                        <canvas id="lineChart" style="display: none;" width="600"
                                height="450"></canvas>
                        <%-- <canvas id="canvas" height="450" width="600"></canvas>--%>
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
    <script src="${ctx}/assets/plugins/chartjs/chart.min.js"></script>

    <!-- 其他功能JS -->
    <script src="${ctx}/assets/curve/list.js"></script>
</body>
</html>
