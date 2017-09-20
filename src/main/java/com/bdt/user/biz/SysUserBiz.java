package com.bdt.user.biz;

import com.bdt.framework.entity.SysUser;

/**
 * @author zhanghongbo
 * @data 2016/7/21.
 */
public interface SysUserBiz {
    SysUser getUserById(int id);

    int updateByPrimaryKeySelective(SysUser sysUser);

    int deleteById(int id);

    SysUser findUserByLoginName(String username);

    int addUser(SysUser sysUser);

    SysUser getUserByName(String name);

    SysUser getUserByEmail(String email);
}

