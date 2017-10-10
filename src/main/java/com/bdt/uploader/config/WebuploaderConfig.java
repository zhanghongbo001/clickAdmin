package com.bdt.uploader.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;

/**
 * Created by ZhangHongBo on 2017/9/25.
 */
public class WebuploaderConfig {

    @Value("${'dir.temlDir'}")
    private String tempDirectory;

    /**
     * 获取上传的临时目录
     *
     * @return
     */
    public String getTempDirectory() {
        if (tempDirectory != null && !tempDirectory.endsWith(File.separator)) {
            tempDirectory += File.separator;
        }
        return tempDirectory;
    }
}
