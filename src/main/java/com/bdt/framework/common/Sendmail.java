package com.bdt.framework.common;

import com.bdt.framework.entity.SysUser;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * 发送邮件
 * @author zhanghongbo
 * @data 2016/8/9.
 */
public class Sendmail extends Thread {

    //用于给用户发送邮件的邮箱
    private String from = "zhbjavait@163.com";
    //邮箱的用户名
    private String username = "zhbjavait@163.com";
    //邮箱的密码(授权码）
    private String password = "zhanghongbo";
    //发送邮件的服务器地址
    private String host = "smtp.163.com";

    private SysUser user;

    public Sendmail(SysUser user) {
        this.user = user;
    }

    /* 重写run方法的实现，在run方法中发送邮件给指定的用户
      * @see java.lang.Thread#run()
      */
    @Override
    public void run() {
        try {
            Properties prop = System.getProperties();
            prop.put("mail.smtp.host", host);
            prop.put("mail.smtp.auth", "true");
            Session session = Session.getInstance(prop);
            session.setDebug(true);
            Transport ts = session.getTransport();
            ts.connect(host, username, password);
            Message message = createEmail(session, user);
            ts.sendMessage(message, message.getAllRecipients());
            ts.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @param session
     * @param user
     * @return
     * @throws Exception
     * @Method: createEmail
     * @Description: 创建要发送的邮件
     */
    public Message createEmail(Session session, SysUser user) throws Exception {

        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
        message.setSubject("新用户注册邮件");
        ///邮件的内容
        StringBuffer sb = new StringBuffer("&nbsp;&nbsp;&nbsp;&nbsp;您好：</br>&nbsp;&nbsp;&nbsp;&nbsp;欢迎账号为"+user.getName()+"注册本产品，点击下面链接激活账号，48小时生效，否则重新注册账号，链接只能使用一次，请尽快激活！</br>");
        sb.append("<a href=\"http://localhost:8080/activation?email=")
                .append(user.getEmail())
                .append("&validateCode=")
                .append(user.getValidatecode())
                .append("\">&nbsp;&nbsp;&nbsp;&nbsp;http://localhost:8080/activation?email=")
                .append(user.getEmail())
                .append("&validateCode=")
                .append(user.getValidatecode())
                .append("</a></br>")
                .append("&nbsp;&nbsp;&nbsp;&nbsp;如果上面的链接无法点击，您也可以复制链接，粘贴到您浏览器的地址栏内，然后按“回车”完成操作。</br>")
                .append("&nbsp;&nbsp;&nbsp;&nbsp;如果您没有进行过注册的操作，请不要点击上述链接，并删除此邮件。</br>")
                .append("&nbsp;&nbsp;&nbsp;&nbsp;此致  公司名称！");
        message.setContent(sb.toString(), "text/html;charset=UTF-8");
        message.saveChanges();
        return message;
    }
}
