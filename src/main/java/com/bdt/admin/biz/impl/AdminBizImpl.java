package com.bdt.admin.biz.impl;

import com.bdt.admin.biz.AdminBiz;
import com.bdt.framework.entity.Admin;
import com.bdt.framework.exception.BusinessException;
import com.bdt.framework.mapper.AdminMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.sun.corba.se.impl.orbutil.concurrent.Sync;
import com.sun.xml.internal.bind.v2.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/4.
 */
@Service
public class AdminBizImpl implements AdminBiz {

    @Autowired(required = false)
    private AdminMapper adminMapper;

    @Override
    public Page<Admin> selectByPage(Page<Admin> page) {
        PageHelper.startPage(page.getPageNum(),page.getPageSize());
        Page<Admin> admins =  adminMapper.selectAll();
        return admins;
    }

    @Override
    public List<Admin> selectByAll() {
        List<Admin> admins=adminMapper.selectAll();
        return admins;
    }

    @Override
    public List<Admin> selectByAccount(String account) {
        List<Admin> admin = adminMapper.selectByAccount(account);
        return admin;
    }

    @Override
    public Admin selectByAccounts(String account) {
        Admin admin=adminMapper.selectByAccounts(account);
        return admin;
    }

    @Override
    public Admin selectById(Integer id) {
        Admin admin = adminMapper.selectByPrimaryKey(id);
        return admin;
    }

    @Override
    public int updateByPrimaryKey(Admin admin) {
        int num = adminMapper.updateByPrimaryKey(admin);
        return num;
    }

    @Override
    public int updateByBalance(Admin admin) {
        int num = adminMapper.updateByPrimaryKey(admin);
        return num;
    }
}
