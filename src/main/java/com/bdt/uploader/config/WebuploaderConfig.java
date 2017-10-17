package com.bdt.uploader.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;

/**
 * 工具类
 * Created by ZhangHongBo on 2017/9/25.
 */
@Component
public class WebuploaderConfig {

    @Value("#{configProperties['dir.temlDir']}")
    private String tempDirectory;

    public String getTempDirectory() {
        return tempDirectory;
    }

    public void setTempDirectory(String tempDirectory) {
        this.tempDirectory = tempDirectory;
    }

    /**
     * 获取上传的临时目录
     *
     * @return
     */
    public String getTempDir() {
        if (tempDirectory != null && !tempDirectory.endsWith(File.separator)) {
            tempDirectory += File.separator;
        }
        return tempDirectory;
    }
}
