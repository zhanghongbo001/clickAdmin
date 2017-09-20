package com.bdt.webTaskExecuteLog.controller;

import com.bdt.admin.biz.AdminBiz;
import com.bdt.framework.entity.Admin;
import com.bdt.framework.entity.WebTaskExecuteLog;
import com.bdt.framework.exception.BusinessException;
import com.bdt.webTaskExecuteLog.biz.WebTaskExecuteLogBiz;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

/**
 * @author zhanghongbo
 * @data 2016/10/13.
 */
@Controller
@RequestMapping(value = "/webTaskExecuteLog")
public class WebTaskExecuteLogController {
    @Autowired
    private WebTaskExecuteLogBiz webTaskExecuteLogBiz;

    @Autowired
    private AdminBiz adminBiz;

    @RequestMapping(value = "/list")
    public String list(ModelMap modelMap) {
        return "/WEB-INF/view/webTaskExecuteLog/list";
    }


    /**
     * 访问明细
     *
     * @param time
     * @param keyword
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/todayLog", method = RequestMethod.POST)
    @ResponseBody
    public List<WebTaskExecuteLog> todayLog(@Param("account") String account, @Param("time") String time, @Param("keyword") String keyword, ModelMap modelMap) throws Exception {
        List<WebTaskExecuteLog> webTaskExecuteLogs = null;
        try {
            Admin admin = adminBiz.selectByAccounts(account);
            if (time.equals("today")) {
                webTaskExecuteLogs = webTaskExecuteLogBiz.selectByNow(keyword, admin.getId());
            } else if (time.equals("yesterday")) {
                webTaskExecuteLogs = webTaskExecuteLogBiz.selectByYesterday(keyword, admin.getId());
            } else if (time.equals("beforeYesterday")) {
                webTaskExecuteLogs = webTaskExecuteLogBiz.selectByBeforeYesterday(keyword, admin.getId());
            }
        } catch (Exception e) {
            throw new BusinessException("该用户与关键词不存在！");
        }
        modelMap.put("web", webTaskExecuteLogs);
        return webTaskExecuteLogs;
    }
}
