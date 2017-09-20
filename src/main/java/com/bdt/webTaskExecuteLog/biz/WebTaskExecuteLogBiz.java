package com.bdt.webTaskExecuteLog.biz;

import com.bdt.framework.entity.WebTaskExecuteLog;

import java.text.ParseException;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/13.
 */
public interface WebTaskExecuteLogBiz {

    List<WebTaskExecuteLog> selectByNow(String keyword,Integer id);

    List<WebTaskExecuteLog> selectByYesterday(String keyword,Integer id);

    List<WebTaskExecuteLog> selectByBeforeYesterday(String keyword,Integer id);
}
