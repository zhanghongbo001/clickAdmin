package com.bdt.framework.entity;

public class SysRole {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_role.id
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_role.name
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    private String name;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_role.role_desc
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    private String roleDesc;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_role.is_enable
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    private Boolean isEnable;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_role.id
     *
     * @return the value of sys_role.id
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_role.id
     *
     * @param id the value for sys_role.id
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_role.name
     *
     * @return the value of sys_role.name
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_role.name
     *
     * @param name the value for sys_role.name
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_role.role_desc
     *
     * @return the value of sys_role.role_desc
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public String getRoleDesc() {
        return roleDesc;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_role.role_desc
     *
     * @param roleDesc the value for sys_role.role_desc
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_role.is_enable
     *
     * @return the value of sys_role.is_enable
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public Boolean getIsEnable() {
        return isEnable;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_role.is_enable
     *
     * @param isEnable the value for sys_role.is_enable
     *
     * @mbggenerated Sat Mar 25 19:52:14 CST 2017
     */
    public void setIsEnable(Boolean isEnable) {
        this.isEnable = isEnable;
    }
}