var _$ = window.location != window.parent.location ? parent.$ : $;
var _win = window.location != window.parent.location ? parent : window;
var _layer = parent.layer ? parent.layer : layer;
var _$body = _$("body");

$.ajaxSetup({
    error : function(r){
        switch(r.status){
            case 401 : {
                layer.msg("您没有权限操作!",function(){});
                break;
            }
            case 403 : {
                layer.msg("请求被服务器禁止,未登录或者账号登录已过期,请重新登录",function(){
                    window.location.reload();
                });
                break;
            }
        }
    }
});

w_open = function (url, w, h) {
    w = w || 1000;
    h = h || 700;
    var top = (window.screen.availHeight - 30 - h) / 2;
    var left = (window.screen.availWidth - 10 - w) / 2;
    var c = "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" + w + ",height=" + h + ",top=" + top + ",left=" + left;
    window.open(url, "_blank", c);
};

var handleImgInput = function(container){
    var $fileImgs = $(".file_img", container).each(function () {
        var $this = $(this);
        var urlName = $this.data("urlname");
        var maxNumber = $this.data("maxnumber");
        if(!maxNumber){
            maxNumber = 1;//默认1个文件
        }
        var options = $this.data("options");
        var prefix = $this.data("prefix");
        if (!prefix) {
            prefix = "";
        }
        var initalPreview = [];
        if (options) {
            if (typeof(options) === "string") {//单个
                initalPreview.push("<img src='" + prefix + options + "' class='file-preview-image' />");
            } else {
                urlName = urlName === "undefined" ? "url" : urlName;
                $.each(options, function () {
                    var value = this[urlName];
                    initalPreview.push("<img class='j-img' data-id='" + this["id"] + "' src='" + prefix + value + "' class='file-preview-image' style='height:160px;width:auto;' />");
                });
            }
        }
        $this.fileinput({
            showUpload: false,
            showCaption: false,
            maxFileCount: maxNumber,
            browseClass: "btn btn-primary",
            allowedFileExtensions: ["png", "jpg", "jpeg", "gif", "bmp"],
            initialPreview: initalPreview
        });
    });
};

function injectUI(container) {
    //$(container).kindeditor();
    $(container).loadcalendar();
    if ($('.select2', container).size() > 0) {
        $('.select2', container).select2({allowClear: true});
    }
    handleImgInput(container);

    $('.treegrid', container).treegrid({
        initialState: 'expanded', //expanded collapsed
        expanderExpandedClass: 'fa fa-minus',
        expanderCollapsedClass: 'fa fa-plus'
    });
    $('.treegrid', container).show();
    $(".add-tooltip").tooltip();
    $(".select2").select2({
        minimumResultsForSearch: Infinity
    });
}

function injectEvent(container) {
    $('.handle_action', container).off().on("click", function (event) {
        event.preventDefault();
        var self = $(this);
        var options = self.data('options');

        function refresh() {
            var grid = $('.datagrid');
            if (grid.size() > 0 && grid.data('DataTable') == true) {
                grid.invoke('refresh');
            } else {
                window.location.href = window.location.href;
            }
        }

        var defaults = {
            title: '',
            url: '',
            width: 800,
            height: 500,
            fullScreen: false,
            iframe: false,
            callback: function (d, r) {
                if (r) {
                    if (r.success) {
                        d.dialog('close');
                        refresh();
                    } else {
                        ui.dialog.alert(r.msg);
                    }
                }
            }
        };

        var opts = $.extend(defaults, options);
        if (opts.fullScreen) {
            opts.width = _$(_win).width() - 50;
            opts.height = _$(_win).height() - 50;
        }

        if (opts.mode == "dialog") {
            ui.dialog.show(opts);
        } else if (opts.mode == "link") {
            window.location.href = opts.url;
        } else if (opts.mode == "win") {
            w_open(opts.url, opts.width, opts.height);
        } else if (opts.mode == "custom") {
            window[opts.handle](self, opts);
        } else if (opts.mode == "image") {
            _layer.open({
                type: 1,
                title: opts.title,
                closeBtn: 1,
                shift: 2,
                shadeClose: true,
                content: '<img src="' + opts.url + '">'
            });
        } else if (opts.mode == "export") {
            var fromObj = ui.form.serializeObject($("#fromSearch"));
            var url = opts.url + $.param(fromObj);
            var exportIframe = _$("#exportIframe");
            if (exportIframe.length == 0) {
                exportIframe = _$("<iframe id=\"exportIframe\" frameborder=\"0\" style=\"width: 0px; height: 0px;\"></iframe>");
                _$("body").append(exportIframe);
            }

            exportIframe.attr("src", url);
        } else if (opts.mode == "ajax") {
            if (opts.confirm) {
                if (!confirm(opts.confirm)) {
                    return;
                }
            }
            var layerLoadIdx;
            var xhr = $.ajax({
                url: opts.url,
                type: "POST",
                beforeSend: function () {
                    layerLoadIdx = layer.load(3);
                },
                success: function (result) {
                    if (result.success) {
                        refresh();
                    } else {
                        ui.dialog.alert(result.msg);
                    }
                }
            });
            xhr.complete(function () {
                layer.close(layerLoadIdx);
            });
            xhr.fail(function () {
                layer.close(layerLoadIdx);
            });
        }
    });
}

$(function () {
    var $body = $('body');
    injectUI($body);
    injectEvent($body);
    //选中菜单
    var $selectedMenu = $(".selected");
    $selectedMenu.closest(".has_sub").find(".waves-effect").trigger("click");
    $selectedMenu.addClass("subdrop");
});

String.format = function () {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

Boolean.prototype.toCn = function () {
    if (this == true)
        return '<span class="label label-success">是</span>';
    else
        return '<span class="label label-danger">否</span>';
};

var Namespace = new Object();
Namespace.register = function (path) {
    var arr = path.split(".");
    var ns = "";
    for (var i = 0; i < arr.length; i++) {
        if (i > 0) ns += ".";
        ns += arr[i];
        eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
    }
};

Namespace.register("util.request");
Namespace.register("util.url");

util.request = {
    get: function (url, data, callback) {
        this.send({
            type: "GET",
            url: url,
            data: data
        }, callback);
    },
    post: function (url, data, callback) {
        this.send({
            type: "POST",
            url: url,
            data: data
        }, callback);
    },
    syncGet: function (url, data, callback) {
        this.send({
            type: "GET",
            url: url,
            async: false,
            data: data
        }, callback);
    },
    syncPost: function (url, data, callback) {
        this.send({
            type: "POST",
            url: url,
            async: false,
            data: data
        }, callback);
    },
    send: function (options, callback) {
        var defaults = {
            type: "GET",
            url: null,
            data: null,
            cache: false,
            success: function (result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            },
            error: function (msg) {
                if (typeof callback == 'function') {
                    callback({success: true, msg: "请求服务器失败"});
                }
            }
        };
        options = $.extend(defaults, options);
        if (options.url == null)
            return;

        $.ajax(options);
    }
};

util.url = {
    encode: function (string) {
        return escape(this._utf8_encode(string));
    },

    decode: function (string) {
        return this._utf8_decode(unescape(string));
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    },
    params: (function(){
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    })()
};

Namespace.register("ui.util");
Namespace.register("ui.request");
Namespace.register("ui.form");
Namespace.register("ui.dialog");

ui.util = {
    getGuid: function guidGenerator() {
        var s4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
    }
};

ui.form = {
    ajaxSubmit: function (formJq, callback) {
        formJq.ajaxSubmit(callback);
        // var url = formJq.attr("action");
        // var method = formJq.attr("method").toUpperCase();
        // $.ajax({
        //    type: method,
        //    url: url,
        //    data: formJq.serialize(),
        //    cache: false,
        //    success: function (result) {
        //        if(!result.success){
        //            layer.msg(result.msg,function(){});
        //            return;
        //        }
        //        if (typeof callback == 'function') {
        //            callback(result);
        //        }
        //    }
        // });
    },
    serializeObject: function (form) {
        var o = {};
        $.each(form.serializeArray(), function (index) {
            if (o[this['name']]) {
                o[this['name']] = o[this['name']] + "," + this['value'];
            } else {
                o[this['name']] = this['value'];
            }
        });
        return o;
    }
};

ui.buttons = {
    render: function (id, row) {
        var ps = {};
        for (var p in row) {
            if (typeof (row[p]) != "function") {
                ps[p.toLowerCase()] = row[p];
            }
        }

        var html = $(id).html();
        html = html.replace(/%7b/ig, '{');
        html = html.replace(/%7d/ig, '}');

        var pattern = /\{(\w+)\}/ig;
        var match = pattern.exec(html);
        //console.log(ps);
        //console.log(ps['id']);

        while (match != null) {
            var key = match[0];
            var value = ps[match[1].toLowerCase()];
            //console.log(key, value);
            html = html.replace(key, value);
            match = pattern.exec(html);
        }

        $(".add-tooltip").tooltip();
        return html;
    }
};

ui.dialog = {
    alert: function (msg, options) {
        _layer.msg(msg);
    },
    prompt: function (options) {
        var defaults = {
            dialogid: "prompt",
            title: '',
            callback: null
        };

        var opts = _$.extend(defaults, options);

        var $dialog = _$("<div id=\"" + opts.dialogid + "\" title=\"" + opts.title + "\">" +
            "<input class=\"content form-control\" autocomplete=\"off\" type=\"text\">" +
            "</div>");

        if (!_$("body").has($dialog)) {
            _$("body").append($dialog);
        }

        var d = $dialog.dialog({
            title: opts.title,
            autoOpen: true,
            width: opts.width,
            height: opts.height,
            modal: true,
            open: function () {
                var $close = $dialog.closest('.ui-dialog')
                    .find('.ui-dialog-titlebar-close');
                $close.html('×').on("click",function(){
                        $dialog.remove();
                    });
            },
            buttons: [{
                text: "取消",
                click: function () {
                    $dialog.remove();
                }
            }, {
                text: "确定",
                click: function () {
                    var content = $dialog.find('.content').val();
                    if (options.callback != null)
                        options.callback($dialog, content);
                }
            }]
        });
    },
    show: function (options) {
        var defaults = {
            dialogid: "dialog",
            title: '',
            iframe: false,
            showButton: true,
            width: 650,
            height: 500,
            callback: null,
            close : function(){
                $(this).remove();
            },
            buttons : [{
                text: "取消",
                click: function () {
                    opts.close.call(this);
                }
            }, {
                text: "确定",
                click: function () {
                    var f = null;
                    if (opts.iframe) {
                        f = $dialog.find('iframe')[0].contentWindow.$("form").eq(0);
                    } else {
                        if ($dialog.find("form").length > 0) {
                            f = $dialog.find("form").eq(0);
                        }
                    }
                    if(opts.onClick){
                        opts.onClick($dialog);
                    }
                    if (f != null && f.size() > 0 && f.isValid() && f.attr("method")) {
                        var layerIdx = _layer.load(3);
                        ui.form.ajaxSubmit(f, function (result) {
                            _layer.close(layerIdx);
                            if (opts.callback != null)
                                opts.callback($dialog, result);
                        });
                    } else {
                        if (opts.callback != null)
                            opts.callback($dialog);
                    }
                }
            }]

        };

        var opts = _$.extend(defaults, options);

        var $dialog = _$("<div id=\"" + opts.dialogid + "\" title=\"" + opts.title + "\"></div>");
        if (!_$("body").has($dialog)) {
            _$("body").append($dialog);
            _$("#" + opts.dialogid + ">.panel-body").niceScroll({
                touchbehavior: false,
                cursorcolor: "#398F70",
                cursoropacitymax: 1,
                cursorwidth: 5,
                cursorborder: "none",
                cursorborderradius: "4px",
                background: "#2F7758",
                autohidemode: false
            });
        }


        if (opts.showButton == false) {
            opts.buttons = [];
        }

        var d = $dialog.dialog({
            title: opts.title,
            autoOpen: true,
            width: opts.width,
            height: opts.height,
            modal: true,
            close: function (event, ui) {
                if (opts.close) {
                    opts.close.call(this);
                }
            },
            open: function () {
                $dialog.closest('.ui-dialog')
                    .find('.ui-dialog-titlebar-close')
                    .html('×');

                if (opts.iframe) {
                    $dialog.css('overflow-y', 'hidden');
                }

                if (opts.iframe) {
                    var iframeJq = $('<iframe src="' + opts.url + '" frameborder="0" height="100%" width="100%" id="' + opts.dialogid + 'frame" scrolling="auto"></iframe>');
                    $dialog.html(iframeJq);
                } else {
                    _$.ajax({
                        type: 'GET',
                        url: opts.url,
                        data : opts.data,
                        beforeSend : function (xhr) {
                            xhr.setRequestHeader("HANDLE_WITH", "HTML");
                        },
                        success: function (data) {
                            $dialog.html(data);
                            injectUI($dialog);
                            injectEvent($dialog);
                        }
                    });
                }
            },
            buttons: opts.buttons
        });
        return d;
    }
};

util.areaManager = function (options) {
    var defaults = {
        provinceJq: $("#j-province"),
        cityJq: $("#j-city"),
        areaJq: $("#j-area"),
        defProvinceVal: null,
        defCityVal: null,
        defAreaVal: null
    };
    var opts = $.extend(defaults, options);

    opts.provinceJq.off("change");
    opts.cityJq.off("change");

    opts.provinceJq.empty().append($("<option value=\"\">--省份--</option>"));
    opts.cityJq.empty().append($("<option value=\"\">--城市--</option>"));
    opts.areaJq.empty().append($("<option value=\"\">--县/区--</option>"));

    loadProvince(function () {
        if (opts.defProvinceVal != null) {
            opts.provinceJq.val(opts.defProvinceVal);
            var province = $("option:selected", opts.provinceJq).attr("refId");

            loadCity(province, function () {//加载城市
                if (opts.defCityVal != null) {
                    opts.cityJq.val(opts.defCityVal);

                    var city = $("option:selected", opts.cityJq).attr("refId");

                    loadArea(province, city, function () {//加载地区
                        if (opts.defAreaVal != null) {
                            opts.areaJq.val(opts.defAreaVal);
                        }
                    });
                }
            });
        }
    });

    opts.provinceJq.change(function () {
        var province = $("option:selected", this).attr("refId");
        opts.cityJq.empty().append($("<option value=\"\">--城市--</option>"));
        opts.areaJq.empty().append($("<option value=\"\">--县/区--</option>"));
        loadCity(province);
    });

    opts.cityJq.change(function () {
        var province = $("option:selected", opts.provinceJq).attr("refId");
        var city = $("option:selected", this).attr("refId");
        opts.areaJq.empty().append($("<option value=\"\">--县/区--</option>"));
        loadArea(province, city);
    });

    function loadProvince(callback) {
        util.request.get(ctx + "/area/selectByParent", {parentId : 0}, function (result) {
            $(result).each(function () {
                opts.provinceJq.append("<option refId=\"" + this.id + "\" value=\"" + this.id + "\">" + this.name + "</option>");
            });

            if (callback)
                callback();
        });
    }

    function loadCity(province, callback) {
        if (!province)
            return;

        opts.areaJq.show();

        if (province == "")
            return false;

        util.request.get(ctx + "/area/selectByParent", {parentId: province}, function (result) {
            $(result).each(function () {
                opts.cityJq.append("<option refId=\"" + this.id + "\" value=\"" + this.id + "\">" + this.name + "</option>");
            });

            if (callback)
                callback();
        });
    }

    function loadArea(province, city, callback) {
        if (!province || !city)
            return;

        if (province == "" || city == "") {
            return false;
        }

        util.request.get(ctx + "/area/selectByParent", {parentId : city}, function (result) {
            if (result.length == 0) {
                opts.areaJq.find("option ").eq(0).val("null");
                opts.areaJq.hide();
            } else {
                opts.areaJq.show();
                $(result).each(function () {
                    opts.areaJq.append("<option refId=\"" + this.id + "\" value=\"" + this.id + "\">" + this.name + "</option>");
                });
                if (callback)
                    callback();
            }
        });
    }
};

(function ($) {
    $.fn.dataGrid = function (options) {
        var gridJq = $(this);
        gridJq.data('DataTable', true);
        var tableJq = $('.panel-body table', gridJq);

        var defaults = {
            checkbox: false,
            edit: {},
            del: {},
            order: [],
            ordering : false,
            pk: 'id',
            operateMode: 'dialog',
            processing: true,
            serverSide: true,
            ajax: '',
            sortable : false,
            dom: 'rt<"table-footer clearfix"ilp><"clear">',
            pageLength: 15,
            paging: true,
            pagingType: 'simple_numbers',
            lengthMenu: [[15, 20, 50, 100], [15, 20, 50, 100]],
            drawCallback: function (result) {
                injectEvent(tableJq);
            },
            language: {
                processing: '<i class="fa fa-spinner fa-spin" style="display:block;"></i>',
                lengthMenu: "_MENU_ 条/页",
                paginate: {
                    previous: "上一页",
                    next: "下一页",
                    first: "第一页",
                    last: "最后"
                },
                zeroRecords: "没有内容",
                info: "共_PAGES_页,_MAX_条记录,当前显示_START_-_END_条",
                infoEmpty: "0条记录",//筛选为空时左下角的显示。
                infoFiltered: ""//筛选之后的左下角筛选提示，
            }
        };

        defaults.ajax = {
            url: options.url,
            data: function (params) {
                var fromObj = ui.form.serializeObject($("#fromSearch"));
                params.search = {};
                params.pageSize = params.length;
                if (params.start == 0) {
                    params.pageIndex = 1;
                } else {
                    params.pageIndex = (params.start / params.length) + 1;
                }

                if (params.order.length > 0) {
                    params.columnName = params.columns[params.order[0].column].data,
                        params.columnOrder = params.order[0].dir;
                }

                delete params.order;
                delete params.columns;
                delete params.search;
                delete params.start;
                delete params.length;

                params = $.extend(params, fromObj);
            }
        };
        tableJq.attr('width', '100%');
        var opts = $.extend(defaults, options);
        var detailIdx = 0;
        //首行的checkbox
        var $firstTr = $('thead tr', tableJq).eq(0);
        //数据操作
        var cols = [];
        if (opts.buttons) {
            detailIdx++;
            $firstTr.prepend($('<th style="width:150px;">编辑</th>'));
            var operateCol = {
                data : "id",
                orderable: false,
                className: 'dt-body-center',
                render: function (data, type, row) {
                    var html = "";
                    $.each(opts.buttons,function(idx,btn){
                        if (btn && btn.url && Shiros.hasPermission(btn.url)) {
                            var editOpts = {
                                "mode": "dialog",
                                "showButton": true,
                                "title": "未命名",
                                "width": 430,
                                "height": 400,
                                "icon": "fa-pencil",
                                "tooltip": true
                            };
                            var finalOpts = $.extend(editOpts, btn);
                            finalOpts.url = btn.url + "?" + opts.pk + "=" + row.id;
                            var info = JSON.stringify(finalOpts);
                            var $box = $("<a>");
                            $box.attr("href","javascript:;").addClass("handle_action btn btn-xs btn-outline add-tooltip btn-default");
                            $("<i>").addClass("fa").addClass(finalOpts.icon).appendTo($box);
                            $box.append(finalOpts.btnTitle);
                            $box.attr("data-options",info);

                            // html += '<a href="javascript:;" class="handle_action btn btn-xs btn-outline add-tooltip btn-default" data-options=\'' + info + '\'><i class="fa ' + finalOpts.icon + '"></i>' + finalOpts.btnTitle + '</a>&nbsp;';
                            html += $box[0].outerHTML;
                        }
                    });
                    return html;
                }
            };
            cols.push(operateCol);
            $(opts.columns).each(function () {
                cols.push(this);
            });
            opts.columns = cols;
            cols = [];
        }
        if (opts.checkbox && opts.checkbox == true) {
            detailIdx++;
            if ($firstTr) {
                $firstTr.prepend($('<th style="width:20px" ><span class="checkbox"><input name="select_all" type="checkbox"><label ></label></span></th>'));
            }
            cols.push({
                data: "id",
                orderable: false,
                className: 'dt-body-center',
                render: function (data, type, row) {
                    return '<label class="checkbox"><input type="checkbox" value="' + data + '" /><label></label></label>';
                }
            });

            $(opts.columns).each(function () {
                cols.push(this);
            });

            opts.columns = cols;
            cols = [];
        }
        //是否有要展开的详细信息
        if (typeof(opts.detailUri) != "undefined") {
            defaults.fnCreatedRow = function (nRow, aData, iDataIndex) {
                $('td:eq(' + detailIdx + ')', nRow).html("<i class='fa fa-plus j-row-detail' data-id='" + aData["id"] + "'></i>&nbsp;" + aData["name"]);
            }
        }
        var dataTable = tableJq.DataTable(opts);
        if (opts.checkbox && opts.checkbox == true) {
            var rowsSelected = [];

            function updateDataTableSelectAllCtrl(tbObj) {
                var $table = tbObj.table().node();
                var $chkboxAll = $('tbody input[type="checkbox"]', $table);
                var $chkboxChecked = $('tbody input[type="checkbox"]:checked', $table);
                var chkboxSelectAll = $('thead input[name="select_all"]', $table).get(0);

                // If none of the checkboxes are checked
                if ($chkboxChecked.length === 0) {
                    chkboxSelectAll.checked = false;
                    if ('indeterminate' in chkboxSelectAll) {
                        chkboxSelectAll.indeterminate = false;
                    }

                    // If all of the checkboxes are checked
                } else if ($chkboxChecked.length === $chkboxAll.length) {
                    chkboxSelectAll.checked = true;
                    if ('indeterminate' in chkboxSelectAll) {
                        chkboxSelectAll.indeterminate = false;
                    }

                    // If some of the checkboxes are checked
                } else {
                    chkboxSelectAll.checked = true;
                    if ('indeterminate' in chkboxSelectAll) {
                        chkboxSelectAll.indeterminate = true;
                    }
                }
            }

            $('tbody', tableJq).on('click', 'input[type="checkbox"]', function (e) {
                var $row = $(this).closest('tr');

                // Get row data
                var data = dataTable.row($row).data();

                // Get row ID
                var rowId = data[0];

                // Determine whether row ID is in the list of selected row IDs
                var index = $.inArray(rowId, rowsSelected);

                // If checkbox is checked and row ID is not in list of selected row IDs
                if (this.checked && index === -1) {
                    rowsSelected.push(rowId);

                    // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                } else if (!this.checked && index !== -1) {
                    rowsSelected.splice(index, 1);
                }

                if (this.checked) {
                    $row.addClass('selected');
                } else {
                    $row.removeClass('selected');
                }

                // Update state of "Select all" control
                updateDataTableSelectAllCtrl(dataTable);

                // Prevent click event from propagating to parent
                e.stopPropagation();
            });

            // Handle click on table cells with checkboxes
            tableJq.on('click', 'thead th:first-child', function (e) {
                $(this).parent().find('input[type="checkbox"]').trigger('click');
            });

            tableJq.on('dblclick', 'tbody td', function (e) {
                $(this).parent().find('input[type="checkbox"]').trigger('click');
            });

            // Handle click on "Select all" control
            $('thead input[name="select_all"]', tableJq).on('click', function (e) {
                if (this.checked) {
                    $('tbody input[type="checkbox"]:not(:checked)', tableJq).trigger('click');
                } else {
                    $('tbody input[type="checkbox"]:checked', tableJq).trigger('click');
                }

                // Prevent click event from propagating to parent
                e.stopPropagation();
            });

            // Handle table draw event
            dataTable.on('draw', function () {
                // Update state of "Select all" control
                updateDataTableSelectAllCtrl(dataTable);
            });
        }
        if (typeof(opts.detailUri) != "undefined") {
            $('.table', gridJq).on('click', '.j-row-detail', function () {
                var $this = $(this);
                var nTr = $this.parents('tr')[0];
                var $tr = $(nTr);
                var id = $this.data("id");
                var $detail = $("#detail-" + id);

                if ($this.is(".fa-minus")) {//展开
                    $this.removeClass("fa-minus").addClass("fa-plus");
                    $detail.hide();
                } else {
                    $this.removeClass("fa-plus").addClass("fa-minus");
                    if ($detail.length != 0) {
                        $detail.show();
                        return;
                    }
                    util.request.get(opts.detailUri, {refId: id,_EXCLUDE_LAYOUT : true}, function (result) {
                        // 调用方法显示详细信息 data-id为自定义属性 存放配置ID
                        var idStr = "detail-" + id;
                        $this.closest("tr").after("<tr id='" + idStr + "'><td colspan='" + dataTable.columns()[0].length + "'>" + result + "</td></tr>");
                        if(typeof(opts.onOpenDetail) == "function"){
                            opts.onOpenDetail.call($("#"+idStr));
                        }
                    });
                }
            });
        }
        injectEvent(gridJq);

        $(".handle_grid_add", gridJq).click(function (event) {
            event.preventDefault();
            var title = $(this).data('title');
            var url = $(this).data('url');
            var width = $(this).data('width') || 800;
            var height = $(this).data('height') || 500;
            var iframe = $(this).data('iframe') || false;

            if (opts.operateMode == "jump") {
                window.location.href = url;
                return;
            }

            ui.dialog.show({
                title: title,
                url: url,
                width: width,
                height: height,
                iframe: iframe,
                callback: function (d, r) {
                    if (r.success) {
                        d.dialog('close');
                        dataTable.search('').draw();
                    } else {
                        ui.dialog.alert(r.msg);
                    }
                }
            });
        });

        gridJq.data('getIds', getIds);
        gridJq.data('search', search);
        gridJq.data('refresh', search);

        function getIds() {
            var ids = [];
            $(dataTable.rows('.selected').data()).each(function () {
                ids.push(this[opts.pk]);
            });

            return ids;
        }

        function search() {
            dataTable.search('').draw();
        }

        $(".handle_grid_edit", gridJq).click(function (event) {
            event.preventDefault();
            var ids = getIds();
            if (ids.length > 0) {
                var title = $(this).data('title');
                var url = $(this).data('url') + '?id=' + ids[0];
                var width = $(this).data('width') || 800;
                var height = $(this).data('height') || 500;

                if (opts.operateMode == "jump") {
                    window.location.href = url;
                    return;
                }

                ui.dialog.show({
                    title: title,
                    url: url,
                    width: width,
                    height: height,
                    callback: function (d, r) {
                        if (r.success) {
                            d.dialog('close');
                            dataTable.search('').draw();
                        } else {
                            ui.dialog.alert(r.msg);
                        }
                    }
                });
            }
        });

        $(".handle_grid_del", gridJq).click(function (event) {
            event.preventDefault();
            var ids = getIds();
            if (ids.length > 0) {
                var url = $(this).data('url');
                if (!confirm("您确认要删除吗？")) {
                    return;
                }

                $.ajax({
                    url: url,
                    data: {ids: ids},
                    traditional: true,
                    type: "POST",
                    success: function (r) {
                        if (r.success) {
                            dataTable.search('').draw();
                        } else {
                            ui.dialog.alert(r.msg);
                        }
                    }
                });
            } else {
                ui.dialog.alert('请选择要删除的数据');
            }
        });

        $(".handle_grid_batch", gridJq).click(function (event) {
            event.preventDefault();
            var ids = getIds();
            if (ids.length > 0) {
                var url = $(this).data('url');
                if (!confirm("操作后将不可恢复,确认操作？")) {
                    return;
                }

                $.ajax({
                    url: url,
                    data: {ids: ids},
                    traditional: true,
                    type: "POST",
                    success: function (r) {
                        if (r.success) {
                            dataTable.search('').draw();
                        } else {
                            ui.dialog.alert(r.msg);
                        }
                    }
                });
            } else {
                ui.dialog.alert('请选择要操作的数据');
            }
        });

        $(".handle_grid_search").click(function (event) {
            event.preventDefault();
            dataTable.search('').draw();
        });
        return dataTable;
    };
})(jQuery);

$.fn.extend({
    invoke: function (name) {
        return $(this).data(name)();
    }
});

(function ($) {
    //加载日历
    $.fn.extend({
        loadcalendar: function (options) {
            var defaults = {};
            var opts = $.extend(defaults, options);
            var self = $(this);

            //日历-时间
            $(".ui2-datetimepicker", self).on("click", function () {
                var opts = $.extend({
                    dateFmt: "yyyy-MM-dd HH:mm:ss"
                }, $(this).data("options"));
                WdatePicker(opts);
            });

            // 日历-日期
            $(".ui2-datepicker", self).on("focus", function () {
                var opts = $.extend({
                    dateFmt: "yyyy-MM-dd"
                }, $(this).data("options"));
                WdatePicker(opts);
            });
        }
    });
})(jQuery);
(function ($) {
    $.cookie = function (name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
})(jQuery);

//var editor;
//(function ($) {
//$.fn.extend({
//    kindeditor: function (options) {
//        var defaults = {};
//        var opts = $.extend(defaults, options);
//        $('textarea[editor=true]', this).each(function () {
//            editor = KindEditor.create(this, {
//                uploadJson: '/admin/common/editorUpload',
//                extraFileUploadParams: { AUTHID: $.cookie('.Admin_Identity') },
//                fileManagerJson: '',
//                filterMode: false,
//                allowFileManager: false,
//                afterCreate: function () {
//                    var self = this;
//                    KindEditor.ctrl(document, 13, function () {
//                        self.sync();
//                    });
//                    KindEditor.ctrl(self.edit.doc, 13, function () {
//                        self.sync();
//                    });
//                }, afterBlur: function () {
//                    this.sync();
//                }
//            });
//
//        });
//    }
//});
//})(jQuery);


(function ($) {
    $.fn.extend({
        uploader: function () {
            $(this).each(function () {
                var container = $(this);
                var options = container.data('options');

                container.append('<li>' +
                    '   <div class="uploader-button"></div>' +
                    '</li>' +
                    '<li class="uploader-list">' +
                    '</li>');

                var defaults = {};
                var opts = $.extend(defaults, options);
                var isMultiple = opts.Mode == 2;

                if (opts.Data != null)
                    loadAttachment(opts.Data);

                function genAttachmentItem(data) {
                    var li = $("<div></div>");
                    switch (opts.Mode) {
                        case 0:
                            if (opts.IsImage) {
                                li.append(String.format("<a href='{0}' target='_blank'><img src='{0}' style='width: 70px;height: 70px;' /></a>", data.FileUrl));
                            } else {
                                li.append(String.format("<a href='{0}' target='_blank'><label class='qq-upload-file'>{1}</label></a>", data.FileUrl, data.Url));
                            }
                            li.append(String.format("<input type='hidden' name='{0}' value='{1}'/>", opts.Name, data.Url));
                            break;
                        case 1:
                            if (opts.IsImage) {
                                li.append(String.format("<a href='{0}' target='_blank'><img src='{0}' style='width: 70px;height: 70px;' /></a>", data.FileUrl, data.Name));
                            } else {
                                li.append(String.format("<a href='{0}' target='_blank'><label class='qq-upload-file'>{1}</label></a>", data.FileUrl, data.Name));
                            }
                            li.append(String.format("<input type='hidden' name='{0}.Id' value='{1}'/>", opts.Name, data.Id));
                            li.append(String.format("<input type='hidden' name='{0}.Name' value='{1}'/>", opts.Name, data.Name));
                            li.append(String.format("<input type='hidden' name='{0}.Url' value='{1}'/>", opts.Name, data.Url));
                            li.append(String.format("<input type='hidden' name='{0}.ContentType' value='{1}'/>", opts.Name, data.ContentType));
                            break;
                        case 2:
                            var index = ui.util.getGuid();
                            if (opts.IsImage) {
                                li.append(String.format("<a href='{0}' target='_blank'><img src='{0}' style='width: 70px;height: 70px;' /></a>", data.FileUrl, data.Name));
                            } else {
                                li.append(String.format("<a href='{0}' target='_blank'><label class='qq-upload-file'>{1}</label></a>", data.FileUrl, data.Name));
                            }
                            li.append(String.format("<input type='hidden' name='{0}.index' autocomplete='off' value='{1}'>", opts.Name, index));
                            li.append(String.format("<input type='hidden' name='{0}[{1}].Id' value='{2}'/>", opts.Name, index, data.Id));
                            li.append(String.format("<input type='hidden' name='{0}[{1}].Name' value='{2}'/>", opts.Name, index, data.Name));
                            li.append(String.format("<input type='hidden' name='{0}[{1}].Url' value='{2}'/>", opts.Name, index, data.Url));
                            li.append(String.format("<input type='hidden' name='{0}[{1}].ContentType' value='{2}'/>", opts.Name, index, data.ContentType));
                            break;
                    }

                    if (li != null) {
                        li.append("<a class='form-item remove' href='javascript:void(0);'>删除</a>");
                        $("a.remove", li).on("click", function () {
                            $(this).closest("div").remove();
                        });
                    }

                    return li;
                }

                function loadAttachment(data) {
                    var li = null;
                    switch (opts.Mode) {
                        case 0:
                            li = genAttachmentItem(data);
                            $(".uploader-list", container).prepend(li);
                            break;
                        case 1:
                            li = genAttachmentItem(data);
                            $(".uploader-list", container).prepend(li);
                            break;
                        case 2:
                            $(data).each(function () {
                                li = genAttachmentItem(this);
                                $(".uploader-list", container).prepend(li);
                            });
                            break;
                    }
                }

                var uploader = $('.uploader-button', container).fineUploader({
                    request: {
                        endpoint: '/admin/common/upload',
                        params: {
                            category: 'Shop'
                        }
                    },
                    validation: {
                        allowedExtensions: ['jpeg', 'jpg', 'png', 'xls', 'xlsx', 'pdf', 'txt', 'doc', 'docx', 'rar', 'zip'],
                        sizeLimit: 100 * (1024 * 1024) // 200 kB = 200 * 1024 bytes
                    },
                    multiple: isMultiple,
                    text: {
                        uploadButton: '<button class="btn btn-xs"><span class="btn-label icon fa fa-paperclip"></span> 上传</button>'
                    }
                }).on('complete', function (event, id, fileName, responseJson) {
                    if (responseJson.success) {
                        var ele = $(this).fineUploader('getItemByFileId', id);
                        ele.remove();
                        var li;
                        switch (opts.Mode) {
                            case 0:
                                li = genAttachmentItem({Url: responseJson.filePath, FileUrl: responseJson.fileurl});
                                $(".uploader-list div", container).remove();
                                $(".uploader-list", container).prepend(li);
                                break;
                            case 1:
                                li = genAttachmentItem({
                                    Id: 0,
                                    Name: fileName,
                                    Url: responseJson.filePath,
                                    FileUrl: responseJson.fileurl,
                                    ContentType: responseJson.contentType
                                });
                                $(".uploader-list div", container).remove();
                                $(".uploader-list", container).prepend(li);
                                break;
                            case 2:
                                li = genAttachmentItem({
                                    Id: 0,
                                    Name: fileName,
                                    Url: responseJson.filePath,
                                    FileUrl: responseJson.fileurl,
                                    ContentType: responseJson.contentType
                                });
                                $(".uploader-list", container).prepend(li);
                                break;
                        }
                    }
                });
            });
        }
    });
})(jQuery);

(function ($) {
    $.fn.extend({
        insertContent: function (myValue, t) {
            var $t = $(this)[0];
            if (document.selection) { //ie
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
                sel.moveStart('character', -l);
                var wee = sel.text.length;
                if (arguments.length == 2) {
                    var l = $t.value.length;
                    sel.moveEnd("character", wee + t);
                    t <= 0 ? sel.moveStart("character", wee - 2 * t
                        - myValue.length) : sel.moveStart(
                        "character", wee - t - myValue.length);
                    sel.select();
                }
            } else if ($t.selectionStart
                || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos)
                    + myValue
                    + $t.value.substring(endPos,
                        $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
                if (arguments.length == 2) {
                    $t.setSelectionRange(startPos - t,
                        $t.selectionEnd + t);
                    this.focus();
                }
            } else {
                this.value += myValue;
                this.focus();
            }
        }
    });
})(jQuery);
//防止重复加载JS
(function($){
    $.once = function(key,fn){
        var exists = window[key];
        if(!exists){
            $(fn);
            window[key] = true;
        }
    }
})(jQuery);