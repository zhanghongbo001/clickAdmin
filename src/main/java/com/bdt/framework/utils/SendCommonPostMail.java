package com.bdt.framework.utils;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zhanghongbo
 * @data 2016/10/1.
 */

public class SendCommonPostMail {
    public static void main(String[] args) throws IOException {
        final String url = "http://sendcloud.sohu.com/webapi/mail.send.json";
        final String apiUser = "heimao";
        //final String apiKey = "CukPnZCgS5D7Vmmm";
        final String apiKey="Fr3k4irNFZMVlI5w";
        //final String from="admin@mail.cnblackhat.com";//发件人地址. from 和发信域名, 会影响是否显示代发
        final String from="mail.cnblackhat.com";
        final String fromname="云排名";//发件人名称. 显示如: ifaxin客服支持 <support@ifaxin.com>
        final String to="1002688187@qq.com;1825920834@qq.com";//收件人地址. 多个地址使用';'分隔, 如 ben@ifaxin.com;joe@ifaxin.com
        final String subject="云排名公告通知--这是一封测试邮件";//标题. 不能为空

        HttpClient httpclient = new DefaultHttpClient();
        HttpPost httpost = new HttpPost(url);

        List params = new ArrayList();
        // 不同于登录SendCloud站点的帐号，您需要登录后台创建发信子帐号，使用子帐号和密码才可以进行邮件的发送。
        params.add(new BasicNameValuePair("api_user", apiUser));
        params.add(new BasicNameValuePair("api_key", apiKey));
        params.add(new BasicNameValuePair("from", from));
        params.add(new BasicNameValuePair("fromname", fromname));
        params.add(new BasicNameValuePair("to", to));
        params.add(new BasicNameValuePair("subject", subject));
        params.add(new BasicNameValuePair("html", "<style type=\"text/css\">html,\n" +
                "    body {\n" +
                "        margin: 0;\n" +
                "        padding: 0;\n" +
                "    }\n" +
                "</style>\n" +
                "<center>\n" +
                "<table style=\"background:#f6f7f2;font-size:13px;font-family:microsoft yahei;\">\n" +
                "\t<tbody>\n" +
                "\t\t<tr>\n" +
                "\t\t\t<td>\n" +
                "\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"800px\">\n" +
                "\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t<td align=\"center\" valign=\"top\">\n" +
                "\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:120px;background: url(http://7xi9bi.com1.z0.glb.clouddn.com/35069/2015/07/20/5891eacba5ba41f389168121f08be02f.jpg) no-repeat;\" width=\"538px\">\n" +
                "\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t<td height=\"70px\" valign=\"middle\" width=\"100%\"><img alt=\"logo\" src=\"http://www.yunrank.cn/images/logo.png\" style=\"margin-left:50px;\" /></td>\n" +
                "\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t<td align=\"center\" valign=\"top\">\n" +
                "\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#fff;height:411px;\" width=\"465px\">\n" +
                "\t\t\t\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"center\" style=\"color:#666;line-height:1.5\" valign=\"top\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<div style=\"width:360px;text-align:left;margin-top:50px;margin-bottom:80px;\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<p>亲爱的用户您好：</p>\n" +
                "\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<p style=\"text-indent:2em\">欢迎您使用云排名，我们将为您提供优质的服务。在使用<br />\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t的过程中如有任何疑问或者建议请联系我们。</p>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
                "\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<div style=\"border-top:1px dashed #ccc;margin:20px\">&nbsp;</div>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t<td height=\"37px\" style=\"background:#dededc\">&nbsp;</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t</tr>\n" +
                "\t\t\t\t</tbody>\n" +
                "\t\t\t</table>\n" +
                "\t\t\t</td>\n" +
                "\t\t</tr>\n" +
                "\t</tbody>\n" +
                "</table>\n" +
                "</center>\n"));//邮件的内容. 不能为空, 可以是文本格式或者 HTML 格式
        params.add(new BasicNameValuePair("resp_email_id", "true"));


        httpost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
        // 请求
        HttpResponse response = httpclient.execute(httpost);
        // 处理响应
        if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) { // 正常返回
            // 读取xml文档
            String result = EntityUtils.toString(response.getEntity());
            System.out.println(result);
        } else {
            System.err.println("error");
        }
        httpost.releaseConnection();
    }
}
