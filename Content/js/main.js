//<![CDATA[
imgr = new Array();
imgr[0] = "~/Content/images/noimage.png";
showRandomImg = true;
aBold = true;
var classicMode = false;
var summary = 40;
var indent = 3;
numposts8 = 7; // số lượng bài viết Tin tức

function removeHtmlTag(strx, chop) {
    var s = strx.split("<");
    for (var i = 0; i < s.length; i++) {
        if (s[i].indexOf(">") != -1) {
            s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length);
        }
    }
    s = s.join("");
    s = s.substring(0, chop - 1);
    return s;
}
function showrecentposts8(json) {
    j = (showRandomImg) ? Math.floor((imgr.length + 1) * Math.random()) : 0;
    img = new Array();

    for (var i = 0; i < numposts8; i++) {
        var entry = json.feed.entry[i];
        var posttitle = entry.title.$t;
        var pcm;
        var posturl;
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                posturl = entry.link[k].href;
                break;
            }
        }

        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
                pcm = entry.link[k].title.split(" ")[0];
                break;
            }
        }
        if ("content" in entry) {
            var postcontent = entry.content.$t;
        }
        else
            if ("summary" in entry) {
                var postcontent = entry.summary.$t;
            }
            else var postcontent = "";

        postdate = entry.published.$t;

        if (j > imgr.length - 1) j = 0;
        img[i] = imgr[j];

        s = postcontent; a = s.indexOf("<img"); b = s.indexOf("src=\"", a); c = s.indexOf("\"", b + 5); d = s.substr(b + 5, c - b - 5);

        if ((a != -1) && (b != -1) && (c != -1) && (d != "")) img[i] = d;

        //cmtext = (text != 'no') ? '<i><font color="'+acolor+'">('+pcm+' '+text+')</font></i>' : '';
        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var month2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var day = postdate.split("-")[2].substring(0, 2);
        var m = postdate.split("-")[1];
        var y = postdate.split("-")[0];

        for (var u2 = 0; u2 < month.length; u2++) {
            if (parseInt(m) == month[u2]) {
                m = month2[u2]; break;
            }
        }
        var daystr = day + ' ' + m + ' ' + y;
        var trtd = '<div class="big-news-content-8"><a href="' + posturl + '"><img alt="' + posttitle + '" src="' + img[i] + '"/></a><h4><a href="' + posturl + '">' + posttitle + '</a></h4></div>';
        document.write(trtd);
        j++;
    }
}
function stripHtmlTags(s, max) { return s.replace(/<.*?>/ig, '').split(/\s+/).slice(0, max - 1).join(' ') }
function createSummaryAndThumb(pID, title, url, date, comment) {
    var posturl = url;
    var title = title;
    var date = date;
    var comment = comment;
    var div = document.getElementById(pID);
    var content = div.innerHTML;
    if (/<!--\s*more\s*-->/.test(content)) {
        div.innerHTML = getSummaryLikeWP(pID);
        div.style.display = "block";
    }
    else {
        var imgtag = "";
        var img = div.getElementsByTagName("img");
        var summ = summary;
        if (img.length >= 1) {
            imgtag = '<p class="left"><a href="' + posturl + '"><img  alt="' + title + '" title="' + title + '" src="' + img[0].src + '.pagespeed.ic.GSLMcHP-fl.png"></a></p>';
        }
        var summary1 = '' + imgtag + '<h2><a href="' + posturl + '">' + title + '</a></h2><div class="entrybaiviet">' + stripHtmlTags(content, summary) + '...<div class="clear"></div>';

        div.innerHTML = summary1;
        div.style.display = "block";
    }
}
$(function () { var a = $("#LinkList55 ul"), i = "menu", s = "parent", l = "child-item", n = "grandchild-item", e = "level-two", t = "level-three"; a.find("li").css("opacity", "1"); var g = $('li a:contains("__")'), d = $('li a:contains("_")'); if (null == a.attr("class")) { a.addClass("nav"); var c = "nav" } else c = a.attr("class"); d.parent().addClass(l); for (var f = $("." + l), h = 0; h < f.length;)h += f.eq(h).nextUntil(":not(." + l + ")").andSelf().wrapAll("<ul></ul>").length; f.parent().addClass(e), g.parent().addClass(n); var o = $("." + n); for (h = 0; h < o.length;)h += o.eq(h).nextUntil(":not(." + n + ")").andSelf().wrapAll("<ul></ul>").length; o.parent().addClass(t), $("." + c + " > li").addClass(s), $("." + c + " a").each(function () { $(this).text($(this).text().replace(/_/g, " ")) }), $("." + e + " > ." + l).each(function () { $(this).next().is("." + t) && $(this).next().appendTo($(this)) }), $("." + c + " > ." + s).each(function () { $(this).next().is("." + e) && $(this).next().appendTo($(this)) }), $("." + c).wrap('<div class="menu"></div>'), $("." + i).before('<span class="navtoggle outside"><i class="fa fa-navicon"></i> </span>'), $("." + i).prepend('<span class="navtoggle"><i class="fa fa-close"></i></span>'), $("." + e).before('<i class="fa fa-fw fa-angle-down"></i>'), $("." + t).before('<i class="fa fa-fw fa-angle-right"></i>'), $(".fa-angle-down").click(function () { $(this).siblings("." + e).is(":hidden") ? ($(".menu ." + e).slideUp(), $(this).siblings("." + e).slideToggle()) : $(this).siblings("." + e).slideUp() }), $(".fa-angle-right").click(function () { $(this).siblings("." + t).is(":hidden") ? ($(".menu ." + t).slideUp(), $(this).siblings("." + t).slideToggle()) : $(this).siblings("." + t).slideUp() }), $(".navtoggle").click(function () { $("." + i).toggleClass("active"), $("." + e + " .fa").toggleClass("fa-angle-right, fa-angle-down") }), $("li > .fa-angle-right").length > 0 && $("li > .fa-angle-right").parent().addClass("sharewidth"); $("." + i).outerHeight() });

        //]]>