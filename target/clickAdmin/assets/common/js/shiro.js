Shiros = {};
/**
 * 是否拥有权限
 * @param url 某个权限的请求地址
 * @returns {boolean} 是/否
 */
Shiros.hasPermission = function(url){
    if(url == undefined){
        return true;
    }
    var permissions = window._PERMISSION_NAMES;
    for(var i = 0; i < permissions.length; i ++){
        var per = permissions[i];
        per = per.replace(":","/");
        if(url.endsWith(per)){
            return true;
        }
    }
    return true;
};