<%@page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh_CN">
<%@include file="/WEB-INF/view/layout/header.jsp" %>
<!-- laypage css-->
<link rel="stylesheet" href="${ctx}/assets/common/lib/laypage/skin/laypage.css">
<link rel="stylesheet" href="${ctx}/assets/common/webuploader-0.1.5/webuploader.css">
<!--引入JS-->
<script type="text/javascript" src="${ctx}/assets/common/webuploader-0.1.5/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="${ctx}/assets/common/webuploader-0.1.5/webuploader.js"></script>
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
                        <h4 class="pull-left page-title">web uploader上传文件</h4>
                    </div>
                </div>
                <div  style="width: 400px;height: 400px;">
                    <!-- 隐藏域 实时保存上传进度 -->
                    <input id="jindutiao" type="hidden"/>
                    <div id="post-container" class="container">
                        <div class="col-md-9">
                            <div class="page-container">
                                <div id="uploader" class="wu-example">
                                    <div id="thelist" class="uploader-list"></div>
                                    <div class="btns">
                                        <div id="picker">选择文件</div>
                                        <button id="ctlBtn" class="btn btn-default">开始上传</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
<script src="${ctx}/assets/uploader/uploader.js"></script>

<%--<script src="${ctx}/assets/common/js/page.js"></script>--%>
</body>
</html>
