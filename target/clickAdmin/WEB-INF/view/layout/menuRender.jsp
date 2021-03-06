<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<li>
    <a href="${ctx}/admin/list" class="waves-effect"><i></i><span>用户管理</span></a>
</li>
<li>
    <a href="${ctx}/rechargeRecord/list" class="waves-effect"><i></i><span>充值中心</span></a>
</li>
<li>
    <a href="${ctx}/webTaskItem/list" class="waves-effect"><i></i><span>消费记录</span></a>
</li>
<li>
    <a href="${ctx}/webTaskExecuteLog/list" class="waves-effect"><i></i><span>访问明细</span></a>
</li>
<li>
    <a href="${ctx}/curve/list" class="waves-effect"><i></i><span>趋势分析</span></a>
</li>
<%--<li class="has_sub">
    <a href="javascript:;" class="waves-effect"><i class=""></i><span>业务管理</span><span class="pull-right"><i
            class="md md-add"></i></span></a>
    <ul class="list-unstyled">
        <li>
            <a href="" class=""><i class=""></i>点击列表（总）</a>
            <a href=""><i class=""></i>折线图</a>
        </li>
    </ul>
</li>--%>
<%--
<c:choose>
    <c:when test="${empty MENU}">
        <p>菜单消失了，请联系管理员</p>
    </c:when>
    <c:otherwise>
        <c:forEach items="${MENU}" var="m">
            <c:choose>
                <c:when test="${fn:length(m.children) eq 0}">
                    <li>
                        <a href="${ctx}${m.url}" class="waves-effect"><i class="${m.icon}"></i><span>${m.name}</span></a>
                    </li>
                </c:when>
                <c:otherwise>
                        <li class="has_sub">
                            <a href="javascript:;" class="waves-effect"><i class="${m.icon}"></i><span>${m.name}</span><span class="pull-right"><i class="md md-add"></i></span></a>
                            <ul class="list-unstyled">
                                <c:forEach items="${m.children}" var="c">
                                    <li>
                                        <c:choose>
                                            <c:when test="${c.selected}">
                                                <a href="${ctx}${c.url}" class="selected"><i class="${c.icon}"></i>${c.name}</a>
                                            </c:when>
                                            <c:otherwise>
                                                <a href="${ctx}${c.url}"><i class="${c.icon}"></i>${c.name}</a>
                                            </c:otherwise>
                                        </c:choose>
                                    </li>
                                </c:forEach>
                            </ul>
                        </li>
                </c:otherwise>
            </c:choose>
        </c:forEach>
    </c:otherwise>
</c:choose>--%>
