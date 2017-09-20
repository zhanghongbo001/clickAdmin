package com.bdt.webTaskExecuteLog.biz.impl;

import com.bdt.framework.entity.WebTaskExecuteLog;
import com.bdt.framework.mapper.WebTaskExecuteLogMapper;
import com.bdt.webTaskExecuteLog.biz.WebTaskExecuteLogBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/13.
 */
@Service
public class WebTaskExecuteLogBizImpl implements WebTaskExecuteLogBiz {

    @Autowired private WebTaskExecuteLogMapper webTaskExecuteLogMapper;

    /**
     * 今天
     * @param keyword
     * @return
     */
    @Override
    public List<WebTaskExecuteLog> selectByNow(String keyword,Integer id) {
        List<WebTaskExecuteLog> webTaskExecuteLogs=webTaskExecuteLogMapper.selectByNow(keyword,id);
        return webTaskExecuteLogs;
    }

    /**
     * 昨天
     * @param keyword
     * @return
     */
    @Override
    public List<WebTaskExecuteLog> selectByYesterday(String keyword,Integer id) {
        List<WebTaskExecuteLog> webTaskExecuteLogs=webTaskExecuteLogMapper.selectByYesterday(keyword,id);
        return webTaskExecuteLogs;
    }

    /**
     * 前天
     * @param keyword
     * @return
     */
    @Override
    public List<WebTaskExecuteLog> selectByBeforeYesterday(String keyword,Integer id) {
        List<WebTaskExecuteLog> webTaskExecuteLogs=webTaskExecuteLogMapper.selectByBeforeYesterday(keyword,id);
        return webTaskExecuteLogs;
    }
}
