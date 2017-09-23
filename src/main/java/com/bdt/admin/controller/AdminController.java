package com.bdt.admin.controller;

import com.bdt.admin.biz.AdminBiz;
import com.bdt.framework.entity.Admin;
import com.bdt.framework.exception.BusinessException;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.List;

/**
 * 用户管理
 *
 * @author zhanghongbo
 * @data 2016/10/4.
 */
@Controller
@RequestMapping(value = "/admin")
public class AdminController {
    private static final Logger log = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminBiz adminBiz;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Page<Admin> page, ModelMap modelMap) {
        Page<Admin> admins = adminBiz.selectByPage(page);
        modelMap.put("adminlist", admins);
        modelMap.put("pages", admins.getPages());
        modelMap.put("pageNum", admins.getPageNum());
        return "/WEB-INF/view/admin/list";
    }

    /**
     * 搜索用户
     *
     * @param account
     * @return
     */
    @RequestMapping(value = "/lists", method = RequestMethod.POST)
    @ResponseBody
    public List<Admin> lists(@Param("account") String account, ModelMap modelMap) throws Exception {
        account = account.trim();
        List<Admin> admins = null;
        try {
            if (account != "") {
                admins = adminBiz.selectByAccount(account);
            } else {
                admins = adminBiz.selectByAll();
            }
        } catch (Exception e) {
            throw new BusinessException("查询的用户不存在!");
        }
        return admins;
    }

    /**
     * 重置密码
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "repeatPassword")
    public String repeatPassword(@Param("id") int id, ModelMap modelMap) {
        Admin admin = adminBiz.selectById(id);
        if (admin != null) {
            admin.setPasswd(passwordEncoder.encode("123456"));
            adminBiz.updateByPrimaryKey(admin);
        }
        return "redirect:/admin/list";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    public String edit(@Param("id") Integer id, ModelMap modelMap) {
        Admin admin = adminBiz.selectById(id);
        modelMap.addAttribute("admin", admin);
        return "/WEB-INF/view/admin/edit";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public String edit(@Param("id") Integer id, @Param("balance") BigDecimal balance, ModelMap modelMap) throws Exception {
        Admin admin = adminBiz.selectById(id);
        BigDecimal a = new BigDecimal("99999999.99");
        int b = admin.getBalance().compareTo(a);
        if (b == -1) {
            BigDecimal balances = admin.getBalance().add(balance);
            admin.setBalance(balances);
            try {
                adminBiz.updateByBalance(admin);
            } catch (Exception e) {
                throw new BusinessException("您添加的额度超出限制!(最高：99999999.99元)");
            }
            return "redirect:/admin/list";
        } else {
            throw new BusinessException("该用户的余额已经超出限制，无法继续增加额度！");
        }
    }
}
