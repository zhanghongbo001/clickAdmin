package com.bdt.uploader.service;

import com.bdt.uploader.config.WebuploaderConfig;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 使用spring-web CommonsMultipartFile方法处理上传文件
 * Created by ZhangHongBo on 2017/9/25.
 */
@Service
public class UploaderFileService {
    private static final Logger log = LoggerFactory.getLogger(UploaderFileService.class);

    //文件上传路径
    private String filePath = "f:\\test\\";
    private String filePaths= WebuploaderConfig.getTempDirectory();
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
    public void saveOneChunk(final String fileName, final String id, CommonsMultipartFile multipartFile, final int chunks, final int chunk) throws IOException {
        log.info("地址：{}",filePaths);
        String destFileName = formatChunkFileName(fileName, chunk);
        //创建新的临时文件夹
        File parentFileDir = tempDir(id);
        //将分片存放在临时文件夹中
        File tempPartFile = new File(parentFileDir, destFileName);
        multipartFile.transferTo(tempPartFile);
        //判断分片是否全部存在
        boolean uploadDone = uploadDones(fileName, chunks, parentFileDir);
        if(uploadDone){
            //合并分片文件
            mergeChunks(fileName,chunks,parentFileDir);
        }
    }

    /**
     * 将临时文件合并为同一个文件
     *
     * @param fileName
     * @param chunks
     */
    public void mergeChunks(String fileName, int chunks, File parentFileDir) throws IOException {
        File destTempFile = new File(filePath, fileName);
        double totleSize = getDirSize(new File(String.valueOf(parentFileDir)));
        log.info("本次要合并文件夹：{}，大小：{}，合并后的文件名为：{}", parentFileDir.getName(), totleSize, fileName);
        for (int j = 0; j < chunks; j++) {
            String destFileName = formatChunkFileName(fileName, j);
            File partFile = new File(parentFileDir, destFileName);
            FileOutputStream destTempfos = new FileOutputStream(destTempFile, true);
            //遍历"所有分片文件"到"最终文件"中
            FileUtils.copyFile(partFile, destTempfos);
            destTempfos.close();
        }
        // 删除临时目录中的分片文件
        FileUtils.deleteDirectory(parentFileDir);
        log.info("合并完成，已删除已合并的文件：{}", parentFileDir.getName());
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
     * @param id
     * @return
     */
    private File tempDir(String id) {
        // 临时目录用来存放所有分片文件
        String tempFileDir = filePath + id;
        File parentFileDir = new File(tempFileDir);
        if (!parentFileDir.exists()) {
            parentFileDir.mkdirs();
            log.info("创建新的文件夹：{}", parentFileDir.getName());
        }
        return parentFileDir;
    }

    /**
     * 是否全部上传完成
     * 所有分片都存在才说明整个文件上传完成
     *
     * @param fileName
     * @param chunks
     * @param parentFileDir
     * @return
     */
    private boolean uploadDones(final String fileName, final int chunks, File parentFileDir) {
        boolean uploadDone = true;
        for (int i = 0; i < chunks; i++) {
            String destFileName = formatChunkFileName(fileName, i);
            File partFile = new File(parentFileDir, destFileName);
            if (!partFile.exists()) {
                uploadDone = false;
            }
        }
        return uploadDone;
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
}
