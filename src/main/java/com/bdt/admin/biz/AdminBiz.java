package com.bdt.admin.biz;

import com.bdt.framework.entity.Admin;
import com.github.pagehelper.Page;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/4.
 */
public interface AdminBiz {

    Page<Admin> selectByPage(Page<Admin> page);

    List<Admin> selectByAll();

    List<Admin> selectByAccount(String account);

    Admin selectByAccounts(String account);

    Admin selectById(Integer id);

    int updateByPrimaryKey(Admin admin);

    int updateByBalance(Admin admin);
}
