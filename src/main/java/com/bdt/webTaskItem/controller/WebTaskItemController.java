package com.bdt.webTaskItem.controller;

import com.bdt.admin.biz.AdminBiz;
import com.bdt.framework.entity.Admin;
import com.bdt.framework.entity.WebTaskItem;
import com.bdt.framework.errorcode.LuoErrorCode;
import com.bdt.framework.exception.BusinessException;
import com.bdt.webTaskItem.biz.WebTaskItemBiz;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/10.
 */
@Controller
@RequestMapping(value = "/webTaskItem")
public class WebTaskItemController {
    @Autowired
    private WebTaskItemBiz webTaskItemBiz;
    @Autowired
    private AdminBiz adminBiz;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(ModelMap modelMap) {
        List<WebTaskItem> webTaskItems = webTaskItemBiz.selectByGroupDomain();
        modelMap.addAttribute("web", webTaskItems);
        return "/WEB-INF/view/webTaskItem/list";
    }


    /**
     * 计算总的点击数，余额，以及相关的费用
     *
     * @param account
     * @return
     */
    @RequestMapping(value = "/count",method = RequestMethod.POST)
    @ResponseBody
    public List<WebTaskItem> count(@Param("account") String account, ModelMap modelMap) throws Exception {
        List<WebTaskItem> webTaskItems = null;
        try {
            if (account != "") {
                Admin admin = adminBiz.selectByAccounts(account);
                webTaskItems = webTaskItemBiz.selectByAdminId(admin.getId());
            } else {
                webTaskItems = webTaskItemBiz.selectByGroupDomain();
            }
        }catch (Exception e){
            throw new BusinessException("该用户不存在消费记录");
        }
        modelMap.put("web", webTaskItems);
        return webTaskItems;
    }
}
