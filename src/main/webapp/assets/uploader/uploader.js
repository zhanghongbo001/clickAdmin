// 文件上传
jQuery(function() {
    var $ = jQuery,
        $list = $('#thelist'),
        $btn = $('#ctlBtn'),
        state = 'pending',
        uploader;
    uploader = WebUploader.create({
        // 不压缩image
        resize: false,
        // swf文件路径，需要用到flash的时候BASE_URL自己根据需要定义 也可写成绝对路径
        swf: ctx + '/assets/common/webuploader-0.1.5/Uploader.swf',
        // 文件接收服务端。此处根据自己的框架写，本人用的是SpringMVC
        server: '/admin/webUploader',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        // pick: '#picker',
        pick: {
            id: '#picker',
            label: '选择文件',
            multiple:true  //默认为true，true表示可以多选文件，HTML5的属性
        },
        duplicate:true,//是否可重复选择同一文件
        chunked: true,  //分片处理
        chunkSize: 20 * 1024 * 1024, //每片20M
        threads:3,//上传并发数。允许同时最大上传进程数。
        prepareNextFile:true,// 在上传当前文件时，准备好下一个文件
        // 禁掉全局的拖拽功能。
        disableGlobalDnd: true
        /*accept: {
            //限制上传文件为MP4
            extensions: 'doc,docx，pdf',
            mimeTypes: 'doc/docx/pdf'
        }*/
    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        $list.append( '<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
            '</div>' );
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中,已上传'+Math.round(percentage*100)+'%');

        //进度条
        $percent.css("width",percentage*100+'%');
    });

    uploader.on( 'uploadSuccess', function( file ) {
        $( '#'+file.id ).find('p.state').text('已上传');
    });

    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('p.state').text('上传出错');
    });

    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').fadeOut();
    });

    uploader.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }

        if ( state === 'uploading' ) {
            $btn.text('暂停上传');
        } else {
            $btn.text('开始上传');
        }
    });

    $btn.on( 'click', function() {
        if ( state === 'uploading' ) {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });
    /**
     * 验证文件格式以及文件大小
     */
    uploader.on("error", function (type) {
        debugger;
        if (type == "Q_TYPE_DENIED") {
            layer.msg("请上传doc,docx，pdf格式文件");
        } else if (type == "Q_EXCEED_SIZE_LIMIT") {
            layer.msg("文件大小不能超过3G");
        }else {
            layer.msg("上传出错！请检查后重新上传！错误代码"+type);
        }

    });
});