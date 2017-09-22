package com.bdt.admin.controller;

import com.bdt.admin.biz.AdminBiz;
import com.bdt.framework.entity.Admin;
import com.bdt.framework.entity.WebTaskItem;
import com.bdt.framework.exception.BusinessException;
import com.github.pagehelper.Page;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.util.List;

/**
 * 用户管理
 *
 * @author zhanghongbo
 * @data 2016/10/4.
 */
@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private static final Logger log= LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminBiz adminBiz;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Page<Admin> page, ModelMap modelMap) {
        Page<Admin> admins = adminBiz.selectByPage(page);
        modelMap.put("adminlist", admins);
        modelMap.put("pages",admins.getPages());
        modelMap.put("pageNum",admins.getPageNum());
        return "/WEB-INF/view/admin/list";
    }

    /**
     * web uploader 上传文件
     * @return
     */
    @RequestMapping(value = "/uploader",method = RequestMethod.GET)
    public String uploader(){
        return "WEB-INF/view/uploader/uploader";
    }
    /**
     * 搜索用户
     * @param account
     * @return
     */
    @RequestMapping(value = "/lists",method = RequestMethod.POST)
    @ResponseBody
    public List<Admin> lists(@Param("account") String account, ModelMap modelMap) throws Exception {
        account=account.trim();
        List<Admin> admins = null;
        try {
            if (account != "") {
                admins = adminBiz.selectByAccount(account);
            } else {
                admins = adminBiz.selectByAll();
            }
        }catch (Exception e){
            throw new BusinessException("查询的用户不存在!");
        }
        return admins;
    }

    /**
     * 重置密码
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "repeatPassword")
    public String repeatPassword(@Param("id") int id, ModelMap modelMap) {
        Admin admin = adminBiz.selectById(id);
        if (admin != null) {
            admin.setPasswd(passwordEncoder.encode("123456"));
            adminBiz.updateByPrimaryKey(admin);
        }
        return "redirect:/admin/list";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    public String edit(@Param("id") Integer id, ModelMap modelMap) {
        Admin admin = adminBiz.selectById(id);
        modelMap.addAttribute("admin", admin);
        return "/WEB-INF/view/admin/edit";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public String edit(@Param("id") Integer id, @Param("balance") BigDecimal balance, ModelMap modelMap) throws Exception {
        Admin admin = adminBiz.selectById(id);
        BigDecimal a = new BigDecimal("99999999.99");
        int b = admin.getBalance().compareTo(a);
        if (b == -1) {
            BigDecimal balances = admin.getBalance().add(balance);
            admin.setBalance(balances);
            try {
                adminBiz.updateByBalance(admin);
            } catch (Exception e) {
                throw new BusinessException("您添加的额度超出限制!(最高：99999999.99元)");
            }
            return "redirect:/admin/list";
        } else {
            throw new BusinessException("该用户的余额已经超出限制，无法继续增加额度！");
        }
    }

    @RequestMapping(method = {RequestMethod.POST}, value = {"/webUploader"})
    @ResponseBody
    public void webUploader(HttpServletRequest request, HttpServletResponse response) throws Exception {
        log.info("进入上传服务");
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        if(isMultipart){
            try {
                DiskFileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                // 得到所有的表单域，它们目前都被当作FileItem
                List<FileItem> fileItems = upload.parseRequest(request);
                log.info(fileItems.get(0).toString());
                String id = "";
                String fileName = "";
                // 如果大于1说明是分片处理
                int chunks = 1;
                int chunk = 0;
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
                    } else if (fileItem.getFieldName().equals("multiFile")) {
                        tempFileItem = fileItem;
                    }
                }
                //session中的参数设置获取是我自己的原因,文件名你们可以直接使用fileName,这个是原来的文件名
                String fileSysName = request.getSession().getAttribute("fileSysName").toString();
                String realname = fileSysName+fileName.substring(fileName.lastIndexOf("."));//转化后的文件名
                request.getSession().setAttribute("realname",realname);
                String filePath = "sound/";//文件上传路径
                // 临时目录用来存放所有分片文件
                String tempFileDir = filePath + id;
                File parentFileDir = new File(tempFileDir);
                if (!parentFileDir.exists()) {
                    parentFileDir.mkdirs();
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
                    for (int i = 0; i < chunks; i++) {
                        File partFile = new File(parentFileDir, realname + "_" + i + ".part");
                        FileOutputStream destTempfos = new FileOutputStream(destTempFile, true);
                        //遍历"所有分片文件"到"最终文件"中
                        FileUtils.copyFile(partFile, destTempfos);
                        destTempfos.close();
                    }
                    // 删除临时目录中的分片文件
                    FileUtils.deleteDirectory(parentFileDir);
                } else {
                    // 临时文件创建失败
                    if (chunk == chunks -1) {
                        FileUtils.deleteDirectory(parentFileDir);
                    }
                }
            }catch (Exception e){
                log.error("上传文件失败了！");
            }
        }
    }
}
