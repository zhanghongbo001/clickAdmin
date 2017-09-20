package com.bdt.webTaskItem.biz;

import com.bdt.framework.entity.WebTaskItem;

import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/10.
 */
public interface WebTaskItemBiz {

    List<WebTaskItem> selectByAdminId(Integer adminId);

    List<WebTaskItem> selectByGroupDomain();
}
