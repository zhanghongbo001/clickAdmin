package com.bdt.framework.mapper;

import com.bdt.framework.entity.WebTaskExecuteLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WebTaskExecuteLogMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table web_task_execute_log
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table web_task_execute_log
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    int insert(WebTaskExecuteLog record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table web_task_execute_log
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    WebTaskExecuteLog selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table web_task_execute_log
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    List<WebTaskExecuteLog> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table web_task_execute_log
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    int updateByPrimaryKey(WebTaskExecuteLog record);

    List<WebTaskExecuteLog> selectByNow(@Param("keyword") String keyword, @Param("id") Integer id);

    List<WebTaskExecuteLog> selectByYesterday(@Param("keyword") String keyword,@Param("id") Integer id);

    List<WebTaskExecuteLog> selectByBeforeYesterday(@Param("keyword") String keyword,@Param("id") Integer id);

    List<WebTaskExecuteLog> selectByCurveNowNum(@Param("keyword") String keyword, Integer id);

    List<WebTaskExecuteLog> selectByCurveYesterdayNum(@Param("keyword") String keyword, Integer id);

    List<WebTaskExecuteLog> selectByCurveBeforeYesterdayNum(@Param("keyword") String keyword, Integer id);
}