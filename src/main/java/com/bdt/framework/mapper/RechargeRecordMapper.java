package com.bdt.framework.mapper;

import com.bdt.framework.entity.RechargeRecord;

import java.util.List;

public interface RechargeRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RechargeRecord record);

    RechargeRecord selectByPrimaryKey(Integer id);

    List<RechargeRecord> selectAll();

    int updateByPrimaryKey(RechargeRecord record);
}