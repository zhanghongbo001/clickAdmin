// 文件上传
$(function () {
    /*******************初始化参数*********************************/
    var $list = $('#thelist'),//文件列表
        $btn = $('#ctlBtn'),//开始上传按钮
        state = 'pending',//初始按钮状态
        uploader;//uploader对象

    /******************下面的参数是自定义的*************************/
    var oldJindu;//如果该文件之前上传过 已经上传的进度是多少
    var count = 0;//当前正在上传的文件在数组中的下标，一次上传多个文件时使用
    var filesArr = new Array();//文件数组：每当有文件被添加进队列的时候 就push到数组中
    var map = {};//key存储文件id，value存储该文件上传过的进度

    /*******************监听分块上传过程中的三个时间点 start************************/
    WebUploader.Uploader.register({
            "before-send-file": "beforeSendFile",//整个文件上传前
            "before-send": "beforeSend",  //每个分片上传前
            "after-send-file": "afterSendFile"  //分片上传完毕
        },
        {
            //时间点1：所有分块进行上传之前调用此函数
            beforeSendFile: function (file) {
                var deferred = WebUploader.Deferred();
                //获取文件信息后进入下一步
                deferred.resolve();
                return deferred.promise();
            },
            //时间点2：如果有分块上传，则每个分块上传之前调用此函数
            beforeSend: function (block) {
                var deferred = WebUploader.Deferred();
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
                    async: false,
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
                    }
                });
                this.owner.options.formData.fileMd5 = block.file.fileMd5;
                block.file.chunks = block.chunks;//当前文件共分片数量
                return deferred.promise();
            },
            //时间点3：所有分块上传成功后调用此函数
            afterSendFile: function (block) {
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
                        count++; //每上传完成一个文件 count+1
                        if (count <= filesArr.length - 1) {
                            uploader.upload(filesArr[count].id);//上传文件列表中的下一个文件
                        }
                        //合并成功之后的操作
                        if (response.ifExist) {
                            $('#' + block.id).find('p.state').text('文件已上传成功');

                        } else {
                            $('#' + block.id).find('p.state').text('文件上传失败，请检查网络连接！');
                        }
                    }
                });
            }
        });
    /*******************监听分块上传过程中的三个时间点 end************************/

    /*************************** 初始化WebUploader start***************************/
    uploader = WebUploader.create({
        // 不压缩image
        resize: false,
        // swf文件路径，需要用到flash的时候BASE_URL自己根据需要定义 也可写成绝对路径
        swf: ctx + '/assets/common/webuploader-0.1.5/Uploader.swf',
        // 文件接收服务端。此处根据自己的框架写，本人用的是SpringMVC
        server: '/uploaders/webuploads',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        // pick: '#picker',
        pick: {
            id: '#picker',
            label: '选择文件',
            multiple: true  //默认为true，true表示可以多选文件，HTML5的属性
        },
        duplicate: true,//是否可重复选择同一文件
        chunked: true,  //分片处理
        chunkRetry: 10, //如果某个分片由于网络问题出错，允许自动重传的次数
        chunkSize: 1 * 1024 * 1024, //每片20M
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
        //将选择的文件添加进文件数组
        filesArr.push(file);
        uploader.md5File(file).progress().then(function (val) {
            file.fileMd5 = val;
            $.ajax({
                type: "POST",
                url: "/uploaders/selectProgressByFileName",  //先检查该文件是否上传过，如果上传过，上传进度是多少
                data: {
                    fileMd5: file.fileMd5
                },
                cache: false,
                async: false,
                dataType: "json",
                success: function (data) {
                    //上传过
                    if (data > 0) {
                        //上传过的进度的百分比
                        oldJindu = data;
                        //文件总大小，单位：MB(兆)
                        var fileSize = file.size / (1024 * 1024);
                        //计算上传进度百分比
                        var bf = Math.round((oldJindu / fileSize) * 100);
                        //如果上传过 上传了多少
                        var jindutiaoStyle = "width:" + bf + "%";
                        $list.append('<div id="' + file.id + '" class="item">' +
                            '<h4 class="info">' + file.name + '</h4>' +
                            '<p class="state">已上传' + bf + '%</p>' +
                            '<a href="javascript:void(0);" class="btn btn-primary file_btn btnRemoveFile">删除</a>' +
                            '<div class="progress progress-striped active">' +
                            '<div class="progress-bar" role="progressbar" style="' + jindutiaoStyle + '">' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                        //将上传过的进度存入map集合
                        map[file.id] = bf;
                    } else {//没有上传过
                        $list.append('<div id="' + file.id + '" class="item">' +
                            '<h4 class="info">' + file.name + '</h4>' +
                            '<p class="state">等待上传...</p>' +
                            '<a href="javascript:void(0);" class="btn btn-primary file_btn btnRemoveFile">删除</a>' +
                            '</div>');
                    }
                }
            });
            //删除队列中的文件
            $(".btnRemoveFile").bind("click", function () {
                var fileItem = $(this).parent();
                uploader.removeFile($(fileItem).attr("id"), true);
                $(fileItem).fadeOut(function () {
                    $(fileItem).remove();
                });

                //数组中的文件也要删除
                for (var i = 0; i < filesArr.length; i++) {
                    if (filesArr[i].id == $(fileItem).attr("id")) {
                        filesArr.splice(i, 1);//i是要删除的元素在数组中的下标，1代表从下标位置开始连续删除一个元素
                    }
                }
            });
        });

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
        if (percentage < map[file.id] && map[file.id] != 1) {
            //实时更新上传进度
            if (map[file.id] <= Math.round(percentage * 100)) {
                map[file.id] = Math.round(percentage * 100);
                $li.find('p.state').text('上传中，已上传' + map[file.id] + '%');
                $percent.css('width', map[file.id] + '%');
            }
        } else {
            $li.find('p.state').text('上传中，已上传' + Math.round(percentage * 100) + '%');
            $percent.css('width', percentage * 100 + '%');
        }

    });

    //上传成功后执行
    uploader.on('uploadSuccess', function (file) {
        //删除（删除）按钮
        $(".btnRemoveFile").remove();
        //删除进度条
        $(".progress-bar").parent().remove();
    });

    //上传出错后执行的方法
    uploader.on('uploadError', function (file) {
        errorUpload = true;
        $btn.text('开始上传');
        uploader.stop(true);
        $('#' + file.id).find('p.state').text('上传出错，请检查网络连接');
    });

    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').fadeOut();
    });

    //上传按钮状态
    uploader.on('all', function (type) {
        if (type === 'startUpload') {
            state = 'uploading';
        } else if (type === 'stopUpload') {
            state = 'paused';
        } else if (type === 'uploadFinished') {
            state = 'done';
        }

        if (state === 'uploading') {
            $btn.text('暂停上传');
        } else {
            $btn.text('开始上传');
        }
    });

    //上传按钮的onclick事件
    $btn.on('click', function () {
        if (state === 'uploading') {
            uploader.stop(true);
        } else {
            //当前上传文件的文件名
            var currentFileMd5;
            //当前上传文件的文件id
            var currentFileId;
            //当前上传文件总大小
            var currentFileSize;
            //count=0 说明没开始传 默认从文件列表的第一个开始传
            if (count == 0) {
                currentFileMd5 = filesArr[0].fileMd5;
                currentFileId = filesArr[0].id;
                currentFileSize = filesArr[0].size;
            } else {
                if (count <= filesArr.length - 1) {
                    currentFileMd5 = filesArr[count].fileMd5;
                    currentFileId = filesArr[count].id;
                    currentFileSize = filesArr[count].size;
                }
            }
            //先查询该文件是否上传过 如果上传过已经上传的进度是多少
            $.ajax({
                type: "POST",
                url: "/uploaders/selectProgressByFileName",
                data: {
                    fileMd5: currentFileMd5
                },
                cache: false,
                async: false,  // 同步
                dataType: "json",
                success: function (data) {
                    //如果上传过 将进度存入map
                    if (data > 0) {
                        //文件总大小，单位：MB(兆)
                        var fileSize = currentFileSize / (1024 * 1024);
                        //计算上传进度百分比
                        var bf = Math.round((data / fileSize) * 100);
                        //更新该文件上传进度存入map集合
                        map[currentFileId] = bf;
                    }
                    //执行上传
                    uploader.upload(currentFileId);
                }
            });
        }
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
});