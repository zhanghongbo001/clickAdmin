package com.bdt.curve.biz.impl;

import com.bdt.curve.biz.CurveBiz;
import com.bdt.framework.entity.WebTaskExecuteLog;
import com.bdt.framework.mapper.WebTaskExecuteLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/16.
 */
@Service
public class CurveBizImpl implements CurveBiz {

    @Autowired private WebTaskExecuteLogMapper webTaskExecuteLogMapper;

    /**
     * 趋势图  统计今天的数据
     * @param keyword
     * @param id
     * @return
     */
    @Override
    public List<WebTaskExecuteLog> selectByCurveNowNum(String keyword, Integer id) {
        List<WebTaskExecuteLog> webTaskExecuteLogs=webTaskExecuteLogMapper.selectByCurveNowNum(keyword,id);
        return webTaskExecuteLogs;
    }
    /**
     * 趋势图  统计昨天的数据
     * @param keyword
     * @param id
     * @return
     */
    @Override
    public List<WebTaskExecuteLog> selectByCurveYesterdayNum(String keyword, Integer id) {
        List<WebTaskExecuteLog> webTaskExecuteLogs=webTaskExecuteLogMapper.selectByCurveYesterdayNum(keyword,id);
        return webTaskExecuteLogs;
    }
    /**
     * 趋势图  统计前天的数据
     * @param keyword
     * @param id
     * @return
     */
    @Override
    public List<WebTaskExecuteLog> selectByCurveBeforeYesterdayNum(String keyword, Integer id) {
        List<WebTaskExecuteLog> webTaskExecuteLogs=webTaskExecuteLogMapper.selectByCurveBeforeYesterdayNum(keyword,id);
        return webTaskExecuteLogs;
    }
}
