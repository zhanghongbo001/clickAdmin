package com.bdt.curve.biz;

import com.bdt.framework.entity.WebTaskExecuteLog;

import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/16.
 */
public interface CurveBiz {

    List<WebTaskExecuteLog> selectByCurveNowNum(String keyword, Integer id);

    List<WebTaskExecuteLog> selectByCurveYesterdayNum(String keyword,Integer id);

    List<WebTaskExecuteLog> selectByCurveBeforeYesterdayNum(String keyword,Integer id);
}
