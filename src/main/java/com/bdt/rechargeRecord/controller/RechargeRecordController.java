package com.bdt.rechargeRecord.controller;

import com.bdt.framework.entity.RechargeRecord;
import com.bdt.rechargeRecord.biz.RechargeRecordBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/9.
 */
@Controller
@RequestMapping(value = "/rechargeRecord")
public class RechargeRecordController {
    @Autowired private RechargeRecordBiz rechargeRecordBiz;

    @RequestMapping(value ="/list",method = RequestMethod.GET)
    public String list(ModelMap modelMap){
        List<RechargeRecord> rechargeRecordDtos= rechargeRecordBiz.selectByAll();
        modelMap.addAttribute("recharge",rechargeRecordDtos);
        return "/WEB-INF/view/rechargeRecord/list";
    }
}
