package com.bdt.curve.controller;

import com.bdt.admin.biz.AdminBiz;
import com.bdt.curve.biz.CurveBiz;
import com.bdt.framework.entity.Admin;
import com.bdt.framework.entity.WebTaskExecuteLog;
import com.bdt.framework.exception.BusinessException;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/16.
 */
@Controller
@RequestMapping(value = "/curve")
public class CurveController {

    @Autowired private CurveBiz curveBiz;

    @Autowired private AdminBiz adminBiz;

    @RequestMapping(value = "/list")
    public String list(){
        return "/WEB-INF/view/curve/list";
    }

    /**
     * 获取X，Y轴的值，并生成趋势图
     * @return
     */
    @RequestMapping(value = "/curveList",method = RequestMethod.POST)
    @ResponseBody
    public List<WebTaskExecuteLog> curveList(@Param("account") String account, @Param("time") String time, @Param("keyword") String keyword, ModelMap modelMap){
        List<WebTaskExecuteLog> webTaskExecuteLogs = null;
        try {
            Admin admin = adminBiz.selectByAccounts(account);
            if (time.equals("today")) {
                webTaskExecuteLogs = curveBiz.selectByCurveNowNum(keyword, admin.getId());
            } else if (time.equals("yesterday")) {
                webTaskExecuteLogs = curveBiz.selectByCurveYesterdayNum(keyword, admin.getId());
            } else if (time.equals("beforeYesterday")) {
                webTaskExecuteLogs = curveBiz.selectByCurveBeforeYesterdayNum(keyword, admin.getId());
            }
        } catch (Exception e) {
            throw new BusinessException("该用户与关键词不存在！");
        }
        return webTaskExecuteLogs;
    }
}
