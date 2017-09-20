package com.bdt.framework.errorcode;

public enum LuoErrorCode {

    NULL_OBJ("对象为空"),
    ERROR_ADD_USER("添加用户失败"),
    NULL_USER_PASSWORD("用户名或密码错误"),
    FAIL_REGISTER("账号注册失败"),
    EMAIL_REGISTER_DEFEATED("该邮箱已经注册过了,请更换邮箱号"),
    INVALID_TOKEN_EXPTIME("该激活码链接失效,请重新填写注册信息"),
    SUCCESS_ACTIVATION_ACCOUNT_NUMBER("该账号激活成功，请登录"),
    ERROR_TOKEN_EXPTIME("激活码链接不正确"),
    SUCCESS_TOKEN_EXPTIME("邮箱激活成功，请登录"),
    ERROR_EMAIL_REGISTER("该邮箱未注册（邮箱地址不存在）"),
    ERROR_CODE("验证码错误！"),
    UNKNOWN_ERROR("系统繁忙，请稍后再试....");

    private String desc;

    private LuoErrorCode( String desc) {
        this.setDesc(desc);
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return this.desc;
    }
}
