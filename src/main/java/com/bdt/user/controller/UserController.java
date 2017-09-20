package com.bdt.user.controller;

import com.bdt.framework.common.Sendmail;
import com.bdt.framework.entity.SysUser;
import com.bdt.framework.errorcode.LuoErrorCode;
import com.bdt.framework.exception.BusinessException;
import com.bdt.framework.utils.CipherUtil;
import com.bdt.user.biz.SysUserBiz;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

/**
 * @author zhanghongbo
 * @data 2016/7/21.
 */
@Controller
public class UserController {
    private Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private SysUserBiz sysUserBiz;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String logins(HttpServletRequest request,ModelMap modelMap){
        return "/login";
    }

    /**
     * 验证用户名和密码
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(HttpServletRequest request, ModelMap modelMap,HttpSession session) throws Exception {
        String username = request.getParameter("username");
        String result = "login";
        //取得 密码，并用MD5加密
        String password = CipherUtil.generatePassword(request.getParameter("password"));
        //使用spring security中功能强大的加密方式进行密码加密
        //String password=passwordEncoder.encode(request.getParameter("password"));
        //验证码
        String code= request.getParameter("randCheckCode");
        String codes = String.valueOf(session.getAttribute("randCheckCode"));
        logger.info("====验证码==="+code+"/"+codes);
        if (!code.equalsIgnoreCase(codes)){
                throw new BusinessException(LuoErrorCode.ERROR_CODE);
        }
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        Subject currentUser = SecurityUtils.getSubject();
        try {
            if (!currentUser.isAuthenticated()) {//使用shiro来验证
                token.setRememberMe(true);
                currentUser.login(token);//验证角色和权限
            }
            result = "/index";//验证成功
            return result;
        } catch (Exception e) {
            throw new BusinessException(LuoErrorCode.NULL_USER_PASSWORD);
        }
    }

    /**
     * 退出
     *
     * @return
     */
    @RequestMapping(value = "/logout")
    public String logout() {
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.logout();
        return "redirect:/login";
    }


    @RequestMapping(value = "/addUser", method = RequestMethod.GET)
    public String addUser(HttpServletRequest request,ModelMap modelMap){
        return "/login";
    }
    /**
     * 用户注册（添加）
     *
     * @param request
     */
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public void addUser(HttpServletRequest request) throws Exception {

        String username = request.getParameter("user");
        String passwd = CipherUtil.generatePassword(request.getParameter("passwd"));
        String email = request.getParameter("email");
        SysUser users = sysUserBiz.getUserByEmail(email);
        if (users == null) {
            String inputCode = request.getParameter("inputCode");
            //获取session中的验证码进行效验
            String code = request.getSession().getAttribute("randCheckCode").toString();
            if (inputCode.toLowerCase().equals(code.toLowerCase())) {//效验不区分大小写
                SysUser user = new SysUser();
                user.setName(username);
                user.setPassword(passwd);
                user.setEmail(email);//用户邮箱
                user.setStatus(false);//激活状态
                user.setValidatecode(UUID.randomUUID().toString());//激活码
                Date date = new Date();//获取当前系统时间
                Calendar c = Calendar.getInstance();
                long time = c.getTimeInMillis();
                long token_exptime = time + (1000 * 60 * 60 * 24);//过期时间为24小时后
                //long token_exptime =time + (1000*60);     //这里测试是用的20秒
                user.setRegistertime(date);//注册时间
                user.setTokenexptime(token_exptime);//激活时间段
                int r = sysUserBiz.addUser(user);
                //注册成功后，把用户名和密码记录到登录页面input中
                request.getSession().setAttribute("username",username);
                request.getSession().setAttribute("password",request.getParameter("passwd"));
                //用户注册成功之后就使用用户注册时的邮箱给用户发送一封Email
                //发送邮件是一件非常耗时的事情，因此这里开辟了另一个线程来专门发送邮件
                if (r > 0) {
                    Sendmail sendmail = new Sendmail(user);
                    //启动线程，线程启动之后就会执行run方法来发送邮件
                    sendmail.start();
                } else {
                    throw new BusinessException(LuoErrorCode.FAIL_REGISTER);
                }
            } else {
                throw new BusinessException(LuoErrorCode.ERROR_CODE);
            }
        } else {
            throw new BusinessException(LuoErrorCode.EMAIL_REGISTER_DEFEATED);
        }
    }

    /**
     * 激活账号
     */
   /* @RequestMapping(value = "/activation", method = RequestMethod.GET)
    public void activation(HttpServletRequest request) throws Exception {
        String email = request.getParameter("email");
        String validatecode = request.getParameter("validateCode");
        //数据访问层，通过email获取用户信息
        User user = userBiz.getUserByEmail(email);
        //验证用户是否存在
        if (user != null) {
            //验证用户激活状态
            if (user.getStatus() == false) {
                ///没激活
                Calendar calendar = Calendar.getInstance();//获取当前时间
                //获取当前时间（单位：毫秒）
                long time = calendar.getTimeInMillis();
                long token_exptime = user.getTokenexptime();
                //验证链接是否过期
                if (time > token_exptime) {
                    //激活码过期 删除该用户信息记录
                    userBiz.deleteById(user.getId());
                    throw new BusinessException(LuoErrorCode.INVALID_TOKEN_EXPTIME);
                } else {
                    //验证激活码是否正确
                    if (validatecode.equals(user.getValidatecode())) {
                        //激活成功， //并更新用户的激活状态，为已激活
                        user.setStatus(1);
                        userBiz.updateByPrimaryKeySelective(user);
                        throw new BusinessException(LuoErrorCode.SUCCESS_ACTIVATION_ACCOUNT_NUMBER);
                    } else {
                        throw new BusinessException(LuoErrorCode.ERROR_TOKEN_EXPTIME);
                    }
                }
            } else {
                throw new BusinessException(LuoErrorCode.SUCCESS_TOKEN_EXPTIME);
            }
        } else {
            throw new BusinessException(LuoErrorCode.ERROR_EMAIL_REGISTER);
        }
    }*/
}
