package com.bdt.uploader.controller;

import com.bdt.uploader.service.UploaderFileService;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * 上传文件组件
 * Created by ZhangHongBo on 2017/9/23.
 */
@Controller
@RequestMapping(value = "/uploaders")
public class UploaderController {
    private static final Logger log = LoggerFactory.getLogger(UploaderController.class);

    @Autowired
    private UploaderFileService uploaderFileService;


    /**
     * web uploader 上传文件
     *
     * @return
     */
    @RequestMapping(value = "/uploader", method = RequestMethod.GET)
    public String uploader() {
        return "WEB-INF/view/uploader/uploader";
    }

    /**
     * auto web uploader 自动上传
     *
     * @return
     */
    @RequestMapping(value = "/autoUploader", method = RequestMethod.GET)
    public String autoUploader() {
        return "WEB-INF/view/uploader/autoUploader";
    }

    /**
     * 保存文件
     *
     * @param multipartFile
     * @param fileNames
     * @param chunk
     * @throws IOException
     */
    @RequestMapping(value = "webuploads", method = RequestMethod.POST)
    @ResponseBody
    public void webuploads(@RequestParam("file") CommonsMultipartFile multipartFile, @RequestParam(value = "name") String fileNames, @RequestParam(value = "chunk", required = false, defaultValue = "0") int chunk, @RequestParam("fileMd5") String fileMd5) throws Exception {
        try {
            if (!multipartFile.isEmpty() && multipartFile != null) {
                uploaderFileService.saveOneChunk(fileNames, multipartFile, chunk, fileMd5);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.info("上传失败！");
        }
    }

    /**
     * 合并，验证分片
     *
     * @param request
     * @param response
     */
    @RequestMapping(value = "/mergeOrCheckChunks", method = {RequestMethod.POST, RequestMethod.GET}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public String mergeOrCheckChunks(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String param = request.getParameter("param");
        String fileName = request.getParameter("fileName");
        String fileMd5 = request.getParameter("fileMd5");
        String chunkCount = request.getParameter("chunks");
        String statc = null;
        if (param.equals("checkChunk")) {//是否存在分片文件
            int chunk = Integer.valueOf(request.getParameter("chunk"));
            String chunkSize = request.getParameter("chunkSize");
            statc = uploaderFileService.checkChunk(fileName, chunk, chunkSize, fileMd5);
        } else if (param.equals("mergeChunks")) {//合并分片文件
            if (chunkCount != null && !chunkCount.equals("")) {
                int chunks = Integer.valueOf(chunkCount);
                statc = uploaderFileService.mergeChunks(fileName, chunks, fileMd5);
            } else {
                log.info("mergeChunks chunks error:chunks:{},fileName:{},fileMd5:{}", chunkCount, fileName, fileMd5);
            }
        }
       return statc;
    }

    /**
     * 查询当前文件是否上传过，如果上传过，上传进度是多少
     *
     * @param request
     */
    @RequestMapping(value = "selectProgressByFileName", method = RequestMethod.POST)
    @ResponseBody
    public String selectProgressByFileName(HttpServletRequest request) throws Exception {
        String fileMd5 = request.getParameter("fileMd5");
        String fileSize = uploaderFileService.selectProgressByFileName(fileMd5);
        return fileSize;
    }

    /**
     * 文件分片上传
     *
     * @param request
     * @param response
     * @throws Exception
     */
    /*@RequestMapping(method = {RequestMethod.POST}, value = {"/webUploader"})
    @ResponseBody
    public void webUploader(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String id = "";
        String fileName = "";
        // 如果大于1说明是分片处理
        int chunks = 1;
        int chunk = 0;
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        if (isMultipart) {
            try {
                DiskFileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                // 得到所有的表单域，它们目前都被当作FileItem
                List<FileItem> fileItems = upload.parseRequest(request);
                FileItem tempFileItem = null;
                for (FileItem fileItem : fileItems) {
                    if (fileItem.getFieldName().equals("id")) {
                        id = fileItem.getString();
                    } else if (fileItem.getFieldName().equals("name")) {
                        fileName = new String(fileItem.getString().getBytes("ISO-8859-1"), "UTF-8");
                    } else if (fileItem.getFieldName().equals("chunks")) {
                        chunks = Integer.valueOf(fileItem.getString());
                    } else if (fileItem.getFieldName().equals("chunk")) {
                        chunk = Integer.valueOf(fileItem.getString());
                    } else if (fileItem.getFieldName().equals("file")) {
                        tempFileItem = fileItem;
                    }
                }
                String realname = fileName;//转化后的文件名
                String filePath = "f:\\test\\";//文件上传路径
                // 临时目录用来存放所有分片文件
                String tempFileDir = filePath + id;
                File parentFileDir = new File(tempFileDir);
                if (!parentFileDir.exists()) {
                    parentFileDir.mkdirs();
                    log.info("创建新的文件夹：{}", parentFileDir.getName());
                }
                // 分片处理时，前台会多次调用上传接口，每次都会上传文件的一部分到后台
                File tempPartFile = new File(parentFileDir, realname + "_" + chunk + ".part");
                FileUtils.copyInputStreamToFile(tempFileItem.getInputStream(), tempPartFile);

                // 是否全部上传完成
                // 所有分片都存在才说明整个文件上传完成
                boolean uploadDone = true;
                for (int i = 0; i < chunks; i++) {
                    File partFile = new File(parentFileDir, realname + "_" + i + ".part");
                    if (!partFile.exists()) {
                        uploadDone = false;
                    }
                }
                // 所有分片文件都上传完成
                // 将所有分片文件合并到一个文件中
                if (uploadDone) {
                    // 得到 destTempFile 就是最终的文件
                    File destTempFile = new File(filePath, realname);
                    double totleSize = uploaderFileService.getDirSize(new File(String.valueOf(parentFileDir)));
                    log.info("本次要合并文件夹：{}，大小：{}，合并后的文件名为：{}", parentFileDir.getName(), totleSize, realname);
                    for (int j = 0; j < chunks; j++) {
                        File partFile = new File(parentFileDir, realname + "_" + j + ".part");
                        FileOutputStream destTempfos = new FileOutputStream(destTempFile, true);
                        //遍历"所有分片文件"到"最终文件"中
                        FileUtils.copyFile(partFile, destTempfos);
                        destTempfos.close();
                    }
                    // 删除临时目录中的分片文件
                    FileUtils.deleteDirectory(parentFileDir);
                    log.info("合并完成，已删除已合并的文件：{}", parentFileDir.getName());
                } else {
                    // 临时文件创建失败
                    if (chunk == chunks - 1) {
                        //FileUtils.deleteDirectory(parentFileDir);
                    }
                }
            } catch (Exception e) {
                log.error("上传文件失败了！");
            }
        }
    }
*/

}
