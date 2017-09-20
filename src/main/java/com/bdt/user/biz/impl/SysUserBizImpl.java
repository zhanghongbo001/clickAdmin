package com.bdt.user.biz.impl;

import com.bdt.framework.entity.SysUser;
import com.bdt.framework.mapper.SysUserMapper;
import com.bdt.user.biz.SysUserBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author zhanghongbo
 * @data 2016/7/21.
 */
@Service
public class SysUserBizImpl implements SysUserBiz {

    @Autowired(required=false)
    private SysUserMapper sysUserMapper;

    @Override
    public SysUser getUserById(int id) {
        SysUser sysUser=sysUserMapper.selectByPrimaryKey(id);
        return sysUser;
    }

    @Override
    public int updateByPrimaryKeySelective(SysUser user) {
        /*int users=userMapper.updateByPrimaryKeySelective(user);
        return users;*/
        return 0;
    }

    @Override
    public int deleteById(int id) {
        int users=sysUserMapper.deleteByPrimaryKey(id);
        return users;
    }

    @Override
    public SysUser findUserByLoginName(String username) {
        return null;
    }

    @Override
    public int addUser(SysUser sysUser) {
       /* int num=userMapper.insertSelective(user);
        return num;*/
        return 0;
    }

    @Override
    public SysUser getUserByName(String name) {
        SysUser sysUser=sysUserMapper.selectByName(name);
        return sysUser;
    }

    @Override
    public SysUser getUserByEmail(String email) {
        /*User user=userMapper.selectByEmail(email);
        return user;*/
        return null;
    }

}
