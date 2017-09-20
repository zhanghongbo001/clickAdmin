package com.bdt.webTaskItem.biz.impl;

import com.bdt.framework.entity.Admin;
import com.bdt.framework.entity.WebTask;
import com.bdt.framework.entity.WebTaskItem;
import com.bdt.framework.mapper.AdminMapper;
import com.bdt.framework.mapper.WebTaskItemMapper;
import com.bdt.webTaskItem.biz.WebTaskItemBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/10.
 */
@Service
public class WebTaskItemBizImpl implements WebTaskItemBiz {

    @Autowired private WebTaskItemMapper webTaskItemMapper;

    @Autowired private AdminMapper adminMapper;

    /**
     * 搜索某个用户的总点击数
     * @param adminId
     * @return
     */
    @Override
    public List<WebTaskItem> selectByAdminId(Integer adminId) {
        List<WebTaskItem> webTaskItems= webTaskItemMapper.selectByAdminId(adminId);
        for (WebTaskItem webTaskItem:webTaskItems){
            Admin admin=adminMapper.selectByPrimaryKey(webTaskItem.getAdminId());
            webTaskItem.setAccount(admin.getAccount());
            webTaskItem.setBalance(admin.getBalance());
            //计算该用户点击总数的费用
            DecimalFormat df = new DecimalFormat("0.00");
            String price = df.format(webTaskItem.getNum() * 0.05);
            webTaskItem.setExpense(price);
        }
        return webTaskItems;
    }

    /**
     * 计算所有的用户总点击数
     * @return
     */
    @Override
    public List<WebTaskItem> selectByGroupDomain() {
        List<WebTaskItem> webTaskItems=webTaskItemMapper.selectByGroupDomain();
        for (WebTaskItem webTaskItem:webTaskItems){
            Admin admin=adminMapper.selectByPrimaryKey(webTaskItem.getAdminId());
            webTaskItem.setAccount(admin.getAccount());
            webTaskItem.setBalance(admin.getBalance());
            //计算该用户点击总数的费用
            DecimalFormat df = new DecimalFormat("0.00");
            String price = df.format(webTaskItem.getNum() * 0.05);
            webTaskItem.setExpense(price);
        }
        return webTaskItems;
    }
}
