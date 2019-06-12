// ==UserScript==
// @name         site&whois快捷窗口
// @namespace    site&whois 20181021
// @version      2.5
// @description  域名历史内页生成一个快捷窗口便于查询site和whois.支持大部分域名直接查询whois。
//               不同网站数量和样式巨多，个别网站会出现此工具样式发生变化，极个别网站可能因js冲突无法显示。
// @author       Elite Fan
//@run-at       document-body
// @include      https://web.archive.org/web/*
// ==/UserScript==

//设置插入DIV的style
var quick_style = ".clearfix:before,.clearfix:after{content: '';display: table;clear: both;}#quick_site_g{opacity: 0.5;width: 200px;padding: 5px;background-color:red;position: fixed;top: 120px;right: 5px;z-index: 2147483647;}#quick_site_g:hover{opacity:1;}#quick_site_g #domain_text{width: 196px;font:normal 13px arial;} #quick_site_g .quick_site_btn{margin:0;padding: 1px;float: left;width:200px;color:white;background-color:#0095eb;font:normal 13px arial;}#quick_site_g .quick_site_btn:hover{cursor:pointer;font-weight: bolder;background-color: #ff711b;}";
var style_elem = document.createElement("style");
style_elem.innerHTML = quick_style;
document.getElementsByTagName("head")[0].appendChild(style_elem);
//设置搜索窗口DIV
var search_div = "<input type='text' name='domain_text' id='domain_text' /><button type='button' class='quick_site_btn' id='google_site'>复制&谷歌site</button><button type='button' class='quick_site_btn' id='domain_copy'>复制域名</button><button type='button' class='quick_site_btn' id='whois_serh''>复制&查询whois</button><button type='button' class='quick_site_btn' id='quick_alexa'>排名查询</button><button type='button' class='quick_site_btn' id='quick_collect'>搜索&收藏</button>";
var quick_site_g = document.createElement("div");
//<button type='button' class='quick_site_btn' id='back_top'>返回顶部</button>
quick_site_g.className = "clearfix";
quick_site_g.id = "quick_site_g";
quick_site_g.innerHTML = search_div;
//匹配域名的正则
var reg = /([0-9]{14})\/(\w+):\/\/(www.)?([^/:.]+)(.[^/:]+)(:\d*)?\//;
//函数功能：复制域名到剪切板
function copyDmain(){
    var Url=document.getElementById("domain_text");
    Url.select();
    document.execCommand("Copy");
}
//主函数
function mainObj(){
    //写入搜索窗口DIV
    document.body.appendChild(quick_site_g);
    //获取各项id
    var domain_text = document.getElementById("domain_text");
    var google_site = document.getElementById("google_site");
    var domain_copy = document.getElementById("domain_copy");
    var whois_serh = document.getElementById("whois_serh");
    var back_top = document.getElementById("back_top");
    var quick_alexa = document.getElementById("quick_alexa");
    var quick_collect = document.getElementById("quick_collect");
    var dom_html = document.getElementsByTagName("html")[0];
    //获取url整体信息
    var wmtbURL = window.location.href;
    //将url转换小写并分割
    var wmtb_domain = wmtbURL.toLowerCase().match(reg);
    //判断域名是否捕获成功
    if(wmtb_domain != null){
        var domain_name = wmtb_domain[4]+wmtb_domain[5];
        var domain_main = wmtb_domain[4];
        var domain_type = wmtb_domain[5];
        //输出完整域名到input
        domain_text.value = domain_name;
        //google site
        google_site.onclick = function(){
            copyDmain();
            window.open("https://www.google.com/search?q=site:" + domain_name);
        };
        //复制域名
        domain_copy.onclick = function(){
            copyDmain();
        };
        //whois
        whois_serh.onclick = function(){
            copyDmain();
            switch(domain_type){
                case ".eu":
                    //window.open("https://whois.eurid.eu/en/search?domain=" + domain_name);
                    window.open("https://whois.eurid.eu/en/?domain=" + domain_name);
                    break;
                case ".be":
                    //window.open("https://www.dnsbelgium.be/whois/info/" + domain_name);
                    //window.open("https://www.dnsbelgium.be/en/whois/info/" + domain_name + "/details");
                    window.open("https://api.dnsbelgium.be/whois/registration/" + domain_name);
                    break;
                case ".nl":
                    window.open("https://www.transip.nl/whois/prm/" + domain_name);
                    //window.open("https://en.mk/?s=" + domain_name);
                    break;
                case ".com.mx":
                    //window.open("https://www.whois.com/whois/" + domain_name);
                    window.open("https://en.mk/?s=" + domain_name);
                    break;
                default:
                    window.open("https://whois.marcaria.com/en/Result?SearchDomain=" + domain_name);
            }
        };
        //返回顶部
        //back_top.onclick = function(){
        //    dom_html.scrollTop = 0;
        //}
        //排名查询
        quick_alexa.onclick = function(){
            window.open("https://www.alexa.com/siteinfo/" + domain_name);
        }
        //搜索收藏
       quick_collect.onclick = function(){
            window.open("https://member.expireddomains.net/domain-name-search/?q=" + domain_name);
        }
    }else{
        quick_site_g.style.display = "none";
    }
    //去除捐款
    var donate_banner = document.getElementById("donate_banner");
    if(donate_banner){
        document.body.removeChild(donate_banner);
    }
};
mainObj();