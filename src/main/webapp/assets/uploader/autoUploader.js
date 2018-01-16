// 文件上传
$(function () {
    /*******************初始化参数*********************************/
    var $list = $('#thelist'),//文件列表
        uploader;//uploader对象

    /*******************监听分块上传过程中的三个时间点 start************************/
    WebUploader.Uploader.register({
            "before-send-file": "beforeSendFile",//整个文件上传前
            "before-send": "beforeSend",  //每个分片上传前
            "after-send-file": "afterSendFile"  //分片上传完毕
        },
        {
            //时间点1：所有分块进行上传之前调用此函数
            beforeSendFile: function (file) {
                var deferred = WebUploader.Base.Deferred();
                uploader.md5File(file, 0, 9 * 1024 * 1024).progress(function (percentage) {
                    $("#" + file.id).find('p.state').text('正在读取文件信息...');
                }).then(function (val) {
                    $("#" + file.id).find('p.state').text('正在读取文件信息...');
                    file.fileMd5 = val;
                    /*if(file.isUpload!==undefined && file.isUpload){
                        deferred.resolve();
                        return;
                    }*/
                    deferred.resolve();
                });
                return deferred.promise();
            },
            //时间点2：如果有分块上传，则每个分块上传之前调用此函数
            beforeSend: function (block) {
                var deferred = WebUploader.Base.Deferred();
                block.file.chunks = block.chunks;
                $.ajax({
                    type: "POST",
                    url: "/uploaders/mergeOrCheckChunks?param=checkChunk",  //ajax验证每一个分片
                    data: {
                        fileName: block.file.name,
                        fileMd5: block.file.fileMd5,  //文件唯一标记
                        chunk: block.chunk,  //当前分块下标
                        chunkSize: block.end - block.start//当前分块大小
                    },
                    cache: false,
                    timeout: 1000,//超时的话，只能认为该分片未上传过
                    dataType: "json",
                    success: function (response) {
                        if (response.ifExist) {
                            //分块存在，跳过
                            deferred.reject();
                        } else {
                            //分块不存在或不完整，重新发送该分块内容
                            deferred.resolve();
                        }
                    },
                    error: function () {//任何形式的验证失败，都会触发重新上传
                        deferred.resolve();
                    }
                });
                return deferred.promise();
            },
            //时间点3：所有分块上传成功后调用此函数
            afterSendFile: function (block) {
                var beferred = WebUploader.Base.Deferred();
                //如果分块上传成功，则通知后台合并分块
                $.ajax({
                    type: "POST",
                    url: "/uploaders/mergeOrCheckChunks?param=mergeChunks",  //ajax将所有片段合并成整体
                    data: {
                        fileName: block.name,
                        fileMd5: block.fileMd5,
                        chunks: block.chunks
                    },
                    dataType: "json",
                    success: function (response) {
                        //合并成功之后的操作
                        if (response.ifExist) {
                            $('#' + block.id).find('p.state').text('文件已上传成功');

                        } else {
                            $('#' + block.id).find('p.state').text('文件上传失败，请检查网络连接！');
                        }

                        beferred.resolve();
                    },
                    error: function () {
                        beferred.resolve();
                    }
                });
            }
        });
    /*******************监听分块上传过程中的三个时间点 end************************/

    /*************************** 初始化WebUploader start***************************/
    uploader = WebUploader.create({
        //选择文件，自动上传(自动上传设置成upload()方法上传，不然所有的拦截信息没用)
        auto: false,
        // 不压缩image
        resize: false,
        // swf文件路径，需要用到flash的时候BASE_URL自己根据需要定义 也可写成绝对路径
        swf: ctx + '/assets/common/webuploader-0.1.5/Uploader.swf',
        // 文件接收服务端。此处根据自己的框架写，本人用的是SpringMVC
        server: '/uploaders/webuploads',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#picker',
        /*pick: {
            id: '#picker',
            label: '选择文件',
            multiple: true  //默认为true，true表示可以多选文件，HTML5的属性
        },*/
        duplicate: true,//是否可重复选择同一文件
        chunked: true,  //分片处理
        chunkRetry: 3, //如果某个分片由于网络问题出错，允许自动重传的次数
        chunkSize: 9 * 1024 * 1024, //每片20M
        threads: 3,//上传并发数，允许同时最大上传进程数量。
        prepareNextFile: true,//在上传当前文件时，准备好下一个文件
        disableGlobalDnd: true // 禁掉全局的拖拽功能
        /*accept: {
         //限制上传文件格式
         extensions: 'doc,docx,pdf',
         mimeTypes: 'doc/docx/pdf'
         }*/
    });
    /*************************** 初始化WebUploader end***************************/

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        $("#upload").animate({marginBottom: "0px"});
        var fileNames = $.tooltipsExtracted(file.name,2,15);
        $list.append(
            '<div class="progr" id="' + file.id + '">' +
            '<div class="al">' +
            '<div style="width: 150px;" title="' + file.name + '" data-toggle="tooltip" data-placement="right">' + fileNames + '</div>' +
            '<div style="margin-left: 30px;"><p class="state" style="color: #080808;">等待上传...</p></div>' +
            '</div>' +
            '<div style="clear: both;"></div>' +
            '<div class="progr del">' +
            '<div class="progress">' +
            '<div class="progress-bar" role="progressbar"' +
            'aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">' +
            '</div>' +
            '</div>' +
            '<div style="margin-left: 30px;"><a href="javascript:void(0);" class="file_btn btnRemoveFile"><i class="fa fa-times" aria-hidden="true" style="color: red;"></i></a></div>' +
            '</div>' +
            '<div style="clear: both;"></div>' +
            '</div>'
        );
        uploader.upload(file.id);
    });

    //当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
    uploader.on('uploadBeforeSend', function (block, data, headers) {
        data.fileMd5 = block.file.fileMd5;
    });

    //当所有文件上传结束时触发。
    uploader.on('uploadFinished', function (block, data, headers) {
        setTimeout(function () {
            $("#upload").animate({marginBottom: "-170px"})
        }, 2000);
    });

    //删除队列中的文件
    $("body").delegate(".btnRemoveFile", "click", function () {
        var $this = $(event.target);
        var state = $this.parent().parent().parent().children().children().children();
        if (state.text() == "文件已上传成功!") {
            alert("文件已上传成功，不可以做删除操作！");
        }
        var fileitem = $this.parent().parent().parent().parent();
        var rmFileId = $(fileitem).attr("id");
        //删除内存文件
        uploader.removeFile(rmFileId, true);
        $("#" + rmFileId, "#uploader").remove();
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress .progress-bar');
        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo($li).find('.progress-bar');
        }
        //根据fielId获得当前要上传的文件的进度
        $li.find('p.state').text('上传中，已上传' + Math.round(percentage * 100) + '%');
        $percent.css('width', percentage * 100 + '%');

    });

    /**
     * 验证文件格式以及文件大小
     */
    uploader.on("error", function (type) {
        if (type == "Q_TYPE_DENIED") {
            layer.msg("请上传doc,docx，pdf格式文件");
        } else if (type == "Q_EXCEED_SIZE_LIMIT") {
            layer.msg("文件大小不能超过3G");
        } else {
            layer.msg("上传出错！请检查后重新上传！错误代码：" + type);
        }

    });

    $(".protop").click(function () {
        showfind();
    });
});

/***** 自定义插件 state******/
$.extend({
    //截取字符串
    tooltipsExtracted: function (value, state, num) {
        if (value != undefined) {
            if (value.length > num) {
                if (state == 1) {
                    value = value.substring(0, num) + "...";
                } else {
                    value = value.substring(0, 10) + "...";
                }
            }
        }
        return value;
    }
});
/***** 自定义插件 end******/

//上传小窗 hide and show
function showfind() {
    var botton = $(".progressall").css('marginBottom');
    if (botton == "0px") {
        $("#upload").animate({marginBottom: "-170px"});
    } else {
        $("#upload").animate({marginBottom: "0px"});
    }
}