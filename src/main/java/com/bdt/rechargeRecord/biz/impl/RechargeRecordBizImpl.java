package com.bdt.rechargeRecord.biz.impl;

import com.bdt.admin.biz.AdminBiz;
import com.bdt.framework.dto.RechargeRecordDto;
import com.bdt.framework.entity.Admin;
import com.bdt.framework.entity.RechargeRecord;
import com.bdt.framework.mapper.AdminMapper;
import com.bdt.framework.mapper.RechargeRecordMapper;
import com.bdt.rechargeRecord.biz.RechargeRecordBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/9.
 */
@Service
public class RechargeRecordBizImpl implements RechargeRecordBiz {

    @Autowired
    private RechargeRecordMapper rechargeRecordMapper;
    @Autowired
    private AdminMapper adminMapper;

    @Override
    public List<RechargeRecord> selectByAll() {
        List<RechargeRecord> rechargeRecords = rechargeRecordMapper.selectAll();
        for (RechargeRecord rechargeRecord:rechargeRecords){
            Admin admins = adminMapper.selectByPrimaryKey(rechargeRecord.getAdminId());
            //rechargeRecord.setAdminName(admins.getAccount());
        }
        return rechargeRecords;
    }
}
