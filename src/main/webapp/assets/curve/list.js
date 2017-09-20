/*!function ($) {
 "use strict";
 var ChartJs = function () {
 };
 ChartJs.prototype.respChart = function respChart(selector, type, data) {
 var ctx = selector.get(0).getContext("2d");
 var container = $(selector).parent();
 $(window).resize(generateChart);
 /// 动画效果
 var options = {
 //Boolean - 显示图表数据上面的刻度
 scaleOverlay: false,
 //Boolean - 重写一个硬编码的规模
 scaleOverride: false,
 //!** Required if scaleOverride is true **
 //Number - 硬编码尺度中的步骤数
 scaleSteps: null,
 //Number - 硬编码尺度上的值跳转
 scaleStepWidth: 20,
 // Y 轴的起始值
 scaleStartValue: null,
 // Y/X轴的颜色
 scaleLineColor: "rgba(0,0,0,0.1)",
 // X,Y轴的宽度
 scaleLineWidth: 1,
 // 刻度是否显示标签, 即Y轴上是否显示文字
 scaleShowLabels: true,
 // Y轴上的刻度,即文字
 scaleLabel: "<%=value%>",
 // 字体
 scaleFontFamily: "'Arial'",
 // 文字大小
 scaleFontSize: 12,
 // 文字样式
 scaleFontStyle: "normal",
 // 文字颜色
 scaleFontColor: "#666",
 // 是否显示网格
 scaleShowGridLines: false,
 // 网格颜色
 scaleGridLineColor: "rgba(0,0,0,0.5)",
 // 网格宽度
 scaleGridLineWidth: 2,
 // 是否使用贝塞尔曲线? 即:线条是否弯曲
 bezierCurve: false,
 // 是否显示点数
 pointDot: true,
 // 圆点的大小
 pointDotRadius: 5,
 // 圆点的笔触宽度, 即:圆点外层白色大小
 pointDotStrokeWidth: 2,
 // 数据集行程
 datasetStroke: true,
 // 线条的宽度, 即:数据集
 datasetStrokeWidth: 2,
 // 是否填充数据集
 datasetFill: false,
 // 是否执行动画
 animation: true,
 // 动画的时间
 animationSteps: 60,
 // 动画的特效
 animationEasing: "easeOutQuart",
 // 动画完成时的执行函数
 onAnimationComplete: null
 };
 // 这个函数产生的响应图JS
 function generateChart() {
 // make chart width fit with its container
 var ww = selector.attr('width', $(container).width());
 new Chart(ctx).Line(data, options);
 }

 // 第一次加载时的函数绘制图表
 generateChart();
 };


 //init
 ChartJs.prototype.init = function () {
 var num = [];
 $(":button").click(function () {
 if ($(this).attr("id") == "today") {
 $("#today").css("background", "#a79e9e");
 $("#yesterday").css("background", "#1e88e5");
 $("#beforeYesterday").css("background", "#1e88e5");
 } else if ($(this).attr("id") == "yesterday") {
 $("#today").css("background", "#1e88e5");
 $("#yesterday").css("background", "#a79e9e");
 $("#beforeYesterday").css("background", "#1e88e5");
 } else if ($(this).attr("id") == "beforeYesterday") {
 $("#today").css("background", "#1e88e5");
 $("#yesterday").css("background", "#1e88e5");
 $("#beforeYesterday").css("background", "#a79e9e");
 }
 //筛选条件
 var time = $(this).attr("id");
 if ($("#keyword").val() == "" || $("#account").val() == "") {
 layer.alert('请输入你要搜索的用户名与关键词！', {icon: 5});
 $("#today").css("background", "#1e88e5");
 $("#yesterday").css("background", "#1e88e5");
 $("#beforeYesterday").css("background", "#1e88e5");
 return false;
 }
 //异步获取
 $.ajax({
 url: ctx + "/curve/curveList",
 type: "post",
 dataType: "json",
 data: {time: time, keyword: $("#keyword").val(), account: $("#account").val()},
 success: function (result) {
 if (result.success == false) {
 layer.alert(result.errorMsg, {icon: 5});
 return false;
 } else {
 if (result.length != 0) {
 $("#lineChart").css('display', 'block');
 //初始化数据
 for (var i = 0; i < result.length; i++) {
 var item = result[i];
 if (i < (result.length - 1)) {
 num.push(item.num);
 } else {
 num.push(item.num);
 }
 }
 alert("num:"+num+"/type:"+typeof(num) );

 }
 }
 },
 error: function (result) {
 alert("系统出现问题，请及时联系管理员！");
 return false;
 }
 });
 return false;
 });

 //creating lineChart
 var data = {
 labels: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00"],
 datasets: [
 {
 // 颜色的使用类似于CSS，你也可以使用RGB、HEX或者HSL
 // rgba颜色中最后一个值代表透明度
 // 填充颜色
 fillColor: "rgba(220,220,220,0.5)",
 // 线的颜色
 strokeColor: "rgba(0,102,51,1)",
 // 点的填充颜色
 pointColor: "rgba(220,220,220,1)",
 // 点的边线颜色
 pointStrokeColor: "#339933",
 pointHighlightFill: "#339933",
 pointHighlightStroke: "rgba(220,220,220,0)",
 // 与x轴标示对应的数据
 data: [num]
 }

 ]
 };
 this.respChart($("#lineChart"), 'Line', data);
 };
 $.ChartJs = new ChartJs;
 $.ChartJs.Constructor = ChartJs;

 }(window.jQuery);

 //初始化
 !function ($) {
 "use strict";
 $.ChartJs.init()
 }(window.jQuery);*/

$(function () {
    var num = [];
    var table=[];
    $(":button").click(function () {
        if ($(this).attr("id") == "today") {
            $("#today").css("background", "#a79e9e");
            $("#yesterday").css("background", "#1e88e5");
            $("#beforeYesterday").css("background", "#1e88e5");
        } else if ($(this).attr("id") == "yesterday") {
            $("#today").css("background", "#1e88e5");
            $("#yesterday").css("background", "#a79e9e");
            $("#beforeYesterday").css("background", "#1e88e5");
        } else if ($(this).attr("id") == "beforeYesterday") {
            $("#today").css("background", "#1e88e5");
            $("#yesterday").css("background", "#1e88e5");
            $("#beforeYesterday").css("background", "#a79e9e");
        }
        //筛选条件
        var time = $(this).attr("id");
        if ($("#keyword").val() == "" || $("#account").val() == "") {
            layer.alert('请输入你要搜索的用户名与关键词！', {icon: 5});
            $("#today").css("background", "#1e88e5");
            $("#yesterday").css("background", "#1e88e5");
            $("#beforeYesterday").css("background", "#1e88e5");
            return false;
        }
        //异步获取
        $.ajax({
            url: ctx + "/curve/curveList",
            type: "post",
            dataType: "json",
            data: {time: time, keyword: $("#keyword").val(), account: $("#account").val()},
            success: function (result) {
                if (result.success == false) {
                    layer.alert(result.errorMsg, {icon: 5});
                    return false;
                } else {
                    if (result.length != 0) {
                        $("#lineChart").css('display', 'block');
                        //初始化数据
                        num = [];table=[];
                        for (var i = 0; i < result.length; i++) {
                            var item = result[i];
                            num.push(item.num);
                            table.push('time.time');
                        }
                        alert("num:" + num + "/type:" + typeof(num));
                        var ctx = $("#lineChart").get(0).getContext("2d");
                        new Chart(ctx).Line(lineChartData, options, { //重点在这里
                            responsive : true
                        });
                    }
                }
            },
            error: function (result) {
                alert("系统出现问题，请及时联系管理员！");
                return false;
            }
        });
        return false;
    });
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                // 颜色的使用类似于CSS，你也可以使用RGB、HEX或者HSL
                // rgba颜色中最后一个值代表透明度
                // 填充颜色
                fillColor: "rgba(220,220,220,0.5)",
                // 线的颜色
                strokeColor: "rgba(0,102,51,1)",
                // 点的填充颜色
                pointColor: "rgba(220,220,220,1)",
                // 点的边线颜色
                pointStrokeColor: "#339933",
                pointHighlightFill: "#339933",
                pointHighlightStroke: "rgba(220,220,220,0)",
                data: [15,16,17,18,10,12,15]
            }
        ]
    };
    /// 动画效果
    var options = {
        responsive: true,
        //Boolean - 显示图表数据上面的刻度
        scaleOverlay: false,
        //Boolean - 重写一个硬编码的规模
        scaleOverride: false,
        //!** Required if scaleOverride is true **
        //Number - 硬编码尺度中的步骤数
        scaleSteps: null,
        //Number - 硬编码尺度上的值跳转
        scaleStepWidth: 20,
        // Y 轴的起始值
        scaleStartValue: null,
        // Y/X轴的颜色
        scaleLineColor: "rgba(0,0,0,0.1)",
        // X,Y轴的宽度
        scaleLineWidth: 1,
        // 刻度是否显示标签, 即Y轴上是否显示文字
        scaleShowLabels: true,
        // Y轴上的刻度,即文字
        scaleLabel: "<%=value%>",
        // 字体
        scaleFontFamily: "'Arial'",
        // 文字大小
        scaleFontSize: 12,
        // 文字样式
        scaleFontStyle: "normal",
        // 文字颜色
        scaleFontColor: "#666",
        // 是否显示网格
        scaleShowGridLines: false,
        // 网格颜色
        scaleGridLineColor: "rgba(0,0,0,0.5)",
        // 网格宽度
        scaleGridLineWidth: 2,
        // 是否使用贝塞尔曲线? 即:线条是否弯曲
        bezierCurve: false,
        // 是否显示点数
        pointDot: true,
        // 圆点的大小
        pointDotRadius: 5,
        // 圆点的笔触宽度, 即:圆点外层白色大小
        pointDotStrokeWidth: 2,
        // 数据集行程
        datasetStroke: true,
        // 线条的宽度, 即:数据集
        datasetStrokeWidth: 2,
        // 是否填充数据集
        datasetFill: false,
        // 是否执行动画
        animation: true,
        // 动画的时间
        animationSteps: 60,
        // 动画的特效
        animationEasing: "easeOutQuart",
        // 动画完成时的执行函数
        onAnimationComplete: null
    };
});

