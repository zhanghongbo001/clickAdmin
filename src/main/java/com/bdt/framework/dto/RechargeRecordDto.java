package com.bdt.framework.dto;

import com.bdt.framework.entity.RechargeRecord;
import lombok.Data;

/**
 * @author zhanghongbo
 * @data 2016/10/9.
 */
@Data
public class RechargeRecordDto extends RechargeRecord {
    //订单创建人
    private String adminName;

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }
}
