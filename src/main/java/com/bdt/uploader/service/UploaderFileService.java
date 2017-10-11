package com.bdt.uploader.service;

import com.bdt.uploader.config.WebuploaderConfig;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.channels.FileChannel;
import java.text.DecimalFormat;

/**
 * 使用spring-web CommonsMultipartFile方法处理上传文件
 * Created by ZhangHongBo on 2017/9/25.
 */
@Service
public class UploaderFileService {
    private static final Logger log = LoggerFactory.getLogger(UploaderFileService.class);

    private WebuploaderConfig webuploaderConfig;
    //文件上传路径
    String filePath = "f:\\test\\";
//     String filePaths = webuploaderConfig.getTempDirectory();

    /**
     * 最终上传文件
     *
     * @param fileName
     * @param id
     * @param multipartFile
     * @param chunks
     * @param chunk
     * @throws IOException
     */
    public void saveOneChunk(final String fileName, final String id, CommonsMultipartFile multipartFile, final int chunks, final int chunk, String fileMd5) throws IOException {
        if (filePath != null && !filePath.equals("")) {
            String destFileName = formatChunkFileName(fileName, chunk);
            //创建新的临时文件夹
            File parentFileDir = tempDir(fileMd5);
            //将分片存放在临时文件夹中
            File tempPartFile = new File(parentFileDir, destFileName);
            multipartFile.transferTo(tempPartFile);
            log.info("开始创建下标索引{},内容：{}", chunk, destFileName);
        } else {
            log.info("上传文件路径不能为空！");
        }
    }


    /**
     * 分片是否上传过
     *
     * @param fileName
     * @param chunk
     * @param chunkSize
     * @param fileMd5
     * @return
     */
    public String checkChunk(String fileName, int chunk, String chunkSize, String fileMd5) {
        String destFileName = formatChunkFileName(fileName, chunk);
        File checkFile = new File(filePath + fileMd5 + "\\" + destFileName);
        log.info("验证分片地址：{}", checkFile);
        //检查文件是否存在，且大小是否一致
        if (checkFile.exists() && checkFile.length() == Integer.parseInt(chunkSize)) {
            //上传过
            log.info("{},分片已存在!", destFileName);
            return "{\"ifExist\":1}";
        } else {
            //没有上传过
            log.info("下标索引{}不存在！", chunk);
            return "{\"ifExist\":0}";
        }
    }

    /**
     * 合并分片文件
     *
     * @param fileName
     * @param chunks
     * @param fileMd5
     * @throws IOException
     */
    public String mergeChunks(String fileName, int chunks, String fileMd5) throws IOException {
        //获取文件夹中文件数量
        File f = new File(filePath + fileMd5);
        if (f.exists()) {//判断文件是否存在
            File[] fileArray = f.listFiles(new FileFilter() {
                @Override
                public boolean accept(File pathname) {
                    if (pathname.isDirectory()) {
                        return false;
                    }
                    return true;
                }
            });
            if (fileArray != null) {
                if (fileArray.length == chunks) {
                    File destTempFile = new File(filePath, fileName);
                    double totleSize = getDirSize(new File(String.valueOf(filePath + fileMd5)));
                    log.info("本次要合并文件夹：{}，大小：{}，合并后的文件名为：{}", fileMd5, totleSize, fileName);
                    //多并发线程安全 FileChannel
                    FileChannel outChnnel = new FileOutputStream(destTempFile).getChannel();
                    FileChannel inChannel;
                    long startTime = System.currentTimeMillis();
                    for (int j = 0; j < chunks; j++) {
                        String destFileName = formatChunkFileName(fileName, j);
                        File partFile = new File(filePath + fileMd5, destFileName);
                        inChannel = new FileInputStream(partFile).getChannel();
                        inChannel.transferTo(0, inChannel.size(), outChnnel);
                        inChannel.close();
                    }
                    long endTime = System.currentTimeMillis();
                    outChnnel.close();
                    // 删除临时目录中的分片文件
                    FileUtils.deleteDirectory(new File(filePath + fileMd5));
                    log.info("合并完成，合并文件用时：{}ms，已删除已合并的文件：{}", (endTime - startTime), fileMd5);
                    return "{\"ifExist\":1}";
                } else {
                    log.info("该对象{}，尚未完成上传！", fileName);
                    return "{\"ifExist\":0}";
                }
            } else {
                log.info("该文件夹{}为空！", f.getPath());
                return "{\"ifExist\":0}";
            }
        } else {
            log.info("{}文件不存在！", f.getPath());
            return "{\"ifExist\":0}";
        }
    }

    /**
     * 格式化分片文件的名称：原始文件名_分片索引.part
     *
     * @param fileName
     * @param chunkIndex
     * @return
     */
    private String formatChunkFileName(final String fileName, final int chunkIndex) {
        return fileName + "_" + chunkIndex + ".part";
    }

    /**
     * 创建临时文件夹--存放分片文件
     *
     * @param fileMd5
     * @return
     */
    private File tempDir(String fileMd5) {
        // 临时目录用来存放所有分片文件
        String tempFileDir = filePath + fileMd5;
        File parentFileDir = new File(tempFileDir);
        if (!parentFileDir.exists()) {
            parentFileDir.mkdirs();
            log.info("创建新的临时文件夹：{}", parentFileDir.getName());
        }
        return parentFileDir;
    }

    /**
     * 获取文件夹大小
     *
     * @param file
     * @return
     */
    public static double getDirSize(File file) {
        //判断文件是否存在
        if (file.exists()) {
            //如果是目录则递归计算其内容的总大小
            if (file.isDirectory()) {
                File[] children = file.listFiles();
                double size = 0;
                for (File f : children)
                    size += getDirSize(f);
                return size;
            } else {//如果是文件则直接返回其大小,以“兆”为单位
                double size = (double) file.length() / 1024 / 1024;
                return size;
            }
        } else {
            log.info("文件或者文件夹不存在，请检查路径是否正确！");
            return 0.0;
        }
    }


    /**
     * 上传进度
     *
     * @param fileMd5
     * @return
     */
    public String selectProgressByFileName(String fileMd5) {
        File file = new File(filePath + fileMd5);
        if (file.exists()) {//文件分片是否存在，如果存在计算大小
            String fileSize = String.valueOf(getDirSize(file));
            return fileSize;
        } else {
            return "0.0";
        }
    }
}
