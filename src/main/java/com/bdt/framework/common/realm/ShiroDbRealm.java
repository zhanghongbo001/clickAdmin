package com.bdt.framework.common.realm;

import com.bdt.framework.entity.SysUser;
import com.bdt.framework.exception.BusinessException;
import com.bdt.framework.utils.CipherUtil;
import com.bdt.user.biz.SysUserBiz;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;

/**
 * shrio
 * @author zhanghongbo
 * @data 2016/7/19.
 */
public class ShiroDbRealm extends AuthorizingRealm {
    private static Logger logger = LoggerFactory.getLogger(ShiroDbRealm.class);
    private static final String ALGORITHM = "MD5";

    @Autowired
    private SysUserBiz userBiz;

    public ShiroDbRealm() {
        super();
    }

    /**
     * 验证登陆
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken authcToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        SysUser user = userBiz.getUserByName(token.getUsername());
        if(user.getStatus()!=false){
            throw new BusinessException("邮箱已经激活，请直接登录！");
        }else {
            CipherUtil cipher = new CipherUtil();//MD5加密
            if (user != null) {
                return new SimpleAuthenticationInfo(user.getName(), user.getPassword(), getName());
            } else {
                throw new AuthenticationException();
            }
        }
    }

    /**
     * 登陆成功之后，进行角色和权限验证
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		/*这里应该根据userName使用role和permission 的serive层来做判断，并将对应 的权限加进来，下面简化了这一步*/
        Set<String> roleNames = new HashSet<String>();
        Set<String> permissions = new HashSet<String>();
        roleNames.add("admin");//添加角色。对应到index.jsp
        roleNames.add("administrator");
        permissions.add("create");//添加权限,对应到index.jsp
        permissions.add("login?main");
        permissions.add("login?logout");
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
        info.setStringPermissions(permissions);
        return info;
    }


    /**
     * 清除所有用户授权信息缓存.
     */
    public void clearCachedAuthorizationInfo(String principal) {
        SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
        clearCachedAuthorizationInfo(principals);
    }


    /**
     * 清除所有用户授权信息缓存.
     */
    public void clearAllCachedAuthorizationInfo() {
        Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
        if (cache != null) {
            for (Object key : cache.keys()) {
                cache.remove(key);
            }
        }
    }
}
