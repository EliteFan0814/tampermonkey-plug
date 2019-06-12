// ==UserScript==
// @name         历史内页扩充插件
// @version      1.0
// @description  域名列表页面插入打开去年历史内页快捷键
// @author       Elite Fan qq:552426811
// @match        https://member.expireddomains.net/*
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// ==/UserScript==
$(function () {
    //修改搜索参数为0
    $("input").mouseover(function () { $("input[name=searchinit]").val(0) })
    //获取前一年年份
    var last_year = new Date().getFullYear() - 1
    //判断和获取当前页数
    //因页面变动，延迟0.5秒显示 var num = parseInt($(".infos strong")[1].innerHTML)
    setTimeout(function () { mainJs() }, 500)
    function mainJs() {
        var now_num = 0
        if ($(".right:last").length != 0) {
            var num_text = $(".right:last").text()
            var numReg = num_text.match(/page ([0-9]*) of ([0-9]*)/i)
            now_num = numReg[1] - 0
        }
        //表格头部插入页数 年份 site
        var $thPrev = $("<th id='fpc_th_prev'><a href='javascript:;' title='打开前一页'>" + (now_num - 1) + "«</a></th>")
        var $thYear = $("<th id='fpc_th_year'><a href='javascript:;' title='点击批量打开所有历史'>" + last_year + "</a></th>")
        var $thNext = $("<th id='fpc_th_next'><a href='javascript:;' title='打开后一页'>»" + (now_num + 1) + "</a></th>")
        var $thSite = $("<th id='fpc_th_site'><a href='javascript:;' title='别点我！'>site</a></th>")
        $("table.base1>thead th:first").after($thPrev, $thYear, $thNext, $thSite)
        //表格头部插入pre 和 next
        var $rightNext = $(".right>.next")
        var $rightPrev = $(".right>.prev")
        if ($rightNext.length != 0) {
            var next_href = $rightNext[0].href
            $("#fpc_th_next>a").attr("href", next_href)
        } else {
            $("#fpc_th_next>a").hide()
        }
        if ($rightPrev.length != 0) {
            var prev_href = $rightPrev[0].href
            $("#fpc_th_prev>a").attr("href", prev_href)
        } else {
            $("#fpc_th_prev>a").hide()
        }
        //遍历tbody所有行
        $("table.base1 tbody tr").each(function () {
            //获取当前行域名名称
            var current_domain = $(this).find("td:first").find("a").attr("title")
            //遍历每行插入上年历史快捷链接
            $(this).find("td:first").after(
                "<td>-</td>",
                "<td><a href=\"https://web.archive.org/web/" + last_year + "/http://" + current_domain + "/\" target=\"_blank\">" + last_year + "</a></td>",
                "<td>-</td>",
                "<td><a href=\"https://www.google.com/search?q=site:" + current_domain + "\" target=\"_blank\">site</a></td>"
            )
        })
        //表格头部一键打开所有历史
        $thYear.find("a").click(function () {
            $("table.base1 tbody tr").each(function () {
                var hrefs = $(this).find("td").eq(2).find("a").attr("href")
                window.open(hrefs)
            })
        })
        //表格头部一键打开所有site
        $thSite.find("a").click(function () {
            if (confirm("不建议批量打开Google site！确定打开全部吗？")) {
                $("table.base1 tbody tr").each(function () {
                    var hrefs = $(this).find("td").eq(4).find("a").attr("href")
                    window.open(hrefs)
                })
            }
        })
    }

})