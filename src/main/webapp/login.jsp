<%@ page pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String url = request.getRequestURL().toString();
    url = url.substring(0, url.indexOf('/', url.indexOf("//") + 2));
    String context = request.getContextPath();
    url += context;
    application.setAttribute("ctx", url);
%>
<!DOCTYPE html>
<html>
<head>
    <title>后台系统（云排名）</title>
    <meta charset="utf-8">
    <link href="assets/login/css/home.css?v=2" rel="stylesheet" type="text/css"/>
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
</head>
<body>
<div class="wrap">
    <div class="banner-show" id="js_ban_content">
        <div class="cell bns-01">
            <div class="con"></div>
        </div>
        <div class="cell bns-02" style="display:none;">
            <div class="con"></div>
        </div>
        <div class="cell bns-03" style="display:none;">
            <div class="con"><%--<a href="http://www.js-css.cn" target="_blank" class="banner-link"> <i>企业云</i></a>--%></div>
        </div>
    </div>
    <div class="banner-control" id="js_ban_button_box">
        <a href="javascript:;" class="left">左</a>
        <a href="javascript:;" class="right">右</a>
    </div>
    <script type="text/javascript" src="${ctx}/assets/login/js/login.js"></script>
    <div class="container">
        <div class="register-box">
            <div class="reg-slogan"> 后台系统管理（云排名）</div>

            <div class="reg-form" id="js-form-mobile"><br>
                <br>
                <form action="" name="loginform" accept-charset="utf-8" id="login_form"
                      class="loginForm" method="post">
                    <div id="userCues" class="cue" style="padding-left: 95px; display: none;">
                        ${result}
                    </div>
                    <br>
                    <div class="cell">
                        <input type="text" name="username" id="username" class="text" maxlength="11"
                               placeholder="用户名"/>
                    </div>
                    <div class="cell">
                        <input type="password" name="password" id="password" class="text" placeholder="密码"/>
                    </div>
                    <div class="cell">
                        <input type="text" name="randCheckCode" id="CreateCheckCode" maxlength="4" class="text" placeholder="验证码"/>
                        <img id="img" class="validCodeImg" src="${ctx}/PictureCheckCode" onclick="myReload();" />
                    </div>
                    <div class="bottom">
                        <button type="submit" id="login_form_submit" style="width:328px;" class="button btn-green">登录</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>window.ctx = "${ctx}";</script>
<script language="javascript">
    function myReload(){
        //不刷新页面时也可以刷新验证码
        $(".validCodeImg").get(0).src=$(".validCodeImg").get(0).src+"?PictureCheckCode="+Math.random();
    }
</script>
</body>
</html>

