<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="topbar">
    <!-- LOGO -->
    <div class="topbar-left">
        <div class="text-center">
            <a href="${ctx}" class="logo"><i class="md md-terrain"></i> <span>云排名 </span></a>
        </div>
    </div>
    <div class="navbar navbar-default" role="navigation">
        <div class="container">
            <div class="">
                <div class="pull-left">
                    <button class="button-menu-mobile open-left">
                        <i class="fa fa-bars"></i>
                    </button>
                    <span class="clearfix"></span>
                </div>
                <ul class="nav navbar-nav navbar-right pull-right">
                    <%--<li class="dropdown hidden-xs">--%>
                        <%--<a href="#" data-target="#" class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">--%>
                            <%--<i class="md md-notifications"></i> <span class="badge badge-xs badge-danger">3</span>--%>
                        <%--</a>--%>
                        <%--<ul class="dropdown-menu dropdown-menu-lg">--%>
                            <%--<li class="text-center notifi-title">Notification</li>--%>
                            <%--<li class="list-group">--%>
                                <%--<!-- list item-->--%>
                                <%--<a href="javascript:void(0);" class="list-group-item">--%>
                                    <%--<div class="media">--%>
                                        <%--<div class="pull-left">--%>
                                            <%--<em class="fa fa-user-plus fa-2x text-info"></em>--%>
                                        <%--</div>--%>
                                        <%--<div class="media-body clearfix">--%>
                                            <%--<div class="media-heading">New user registered</div>--%>
                                            <%--<p class="m-0">--%>
                                                <%--<small>You have 10 unread messages</small>--%>
                                            <%--</p>--%>
                                        <%--</div>--%>
                                    <%--</div>--%>
                                <%--</a>--%>
                                <%--<!-- list item-->--%>
                                <%--<a href="javascript:void(0);" class="list-group-item">--%>
                                    <%--<div class="media">--%>
                                        <%--<div class="pull-left">--%>
                                            <%--<em class="fa fa-diamond fa-2x text-primary"></em>--%>
                                        <%--</div>--%>
                                        <%--<div class="media-body clearfix">--%>
                                            <%--<div class="media-heading">New settings</div>--%>
                                            <%--<p class="m-0">--%>
                                                <%--<small>There are new settings available</small>--%>
                                            <%--</p>--%>
                                        <%--</div>--%>
                                    <%--</div>--%>
                                <%--</a>--%>
                                <%--<!-- list item-->--%>
                                <%--<a href="javascript:void(0);" class="list-group-item">--%>
                                    <%--<div class="media">--%>
                                        <%--<div class="pull-left">--%>
                                            <%--<em class="fa fa-bell-o fa-2x text-danger"></em>--%>
                                        <%--</div>--%>
                                        <%--<div class="media-body clearfix">--%>
                                            <%--<div class="media-heading">Updates</div>--%>
                                            <%--<p class="m-0">--%>
                                                <%--<small>There are--%>
                                                    <%--<span class="text-primary">2</span> new updates available</small>--%>
                                            <%--</p>--%>
                                        <%--</div>--%>
                                    <%--</div>--%>
                                <%--</a>--%>
                                <%--<!-- last list item -->--%>
                                <%--<a href="javascript:void(0);" class="list-group-item">--%>
                                    <%--<small>See all notifications</small>--%>
                                <%--</a>--%>
                            <%--</li>--%>
                        <%--</ul>--%>
                    <%--</li>--%>
                    <%--<li class="hidden-xs">--%>
                        <%--<a href="#" id="btn-fullscreen" class="waves-effect waves-light"><i class="md md-crop-free"></i></a>--%>
                    <%--</li>--%>
                    <%--<li class="hidden-xs">--%>
                        <%--<a href="#" class="right-bar-toggle waves-effect waves-light"><i class="md md-chat"></i></a>--%>
                    <%--</li>--%>
                    <li class="dropdown">
                        <a href="javascript:;" class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true">
                            <img src="${ctx}/assets/common/images/avatar-1.jpg" alt="用户头像" class="img-circle" />
                        </a>
                        <ul class="dropdown-menu">
                            <%--<li><a href="javascript:void(0)"><i class="md md-face-unlock"></i> Profile</a></li>--%>
                            <%--<li><a href="javascript:void(0)"><i class="md md-settings"></i> Settings</a></li>--%>
                            <%--<li><a href="javascript:void(0)"><i class="md md-lock"></i> Lock screen</a></li>--%>
                            <li><a href="${ctx}/logout"><i class="md md-settings-power"></i>退出</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
    </div>
</div>
