﻿CKEDITOR.plugins.add("ipsautolink",{init:function(f){f.widgets.add("ipsembedded",{inline:!1,upcast:function(f){if("div"==f.name&&f.hasClass("ipsEmbeddedVideo")||"iframe"==f.name&&!_.isUndefined(f.attributes["data-embedcontent"]))return!0}});ips.utils.emoji.getEmoji(function(g,l){new CKEDITOR.plugins.ipsautolink(f,g)})}});
CKEDITOR.plugins.ipsautolink=function(f,g){this.urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:localhost)|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i;var l=
Object.keys(g);l.sort(function(a,c){return-1=="smileys_emotion people_body animals_nature food_drink activities travel_places objects symbols flags".split(" ").indexOf(a)?-1=="smileys_emotion people_body animals_nature food_drink activities travel_places objects symbols flags".split(" ").indexOf(c)?0:-1:-1=="smileys_emotion people_body animals_nature food_drink activities travel_places objects symbols flags".split(" ").indexOf(c)?1:0});this.handleKey=function(a){13==a.data.keyCode?CKEDITOR.tools.setTimeout(function(){this._handleKey(a)},
0,this):32==a.data.keyCode&&this._handleKey(a)};this._handleKey=function(a){var c=f.getSelection();if(null!==c)for(var c=c.getRanges(!0),d=0;d<c.length;d++)if(c[d].collapsed){if(32==a.data.keyCode)var e=c[d].getCommonAncestor(!0,!0);else(e=c[d].getCommonAncestor(!0,!0).getPrevious())||(e=c[d].getCommonAncestor(!0,!0).getParent().getPrevious());e&&e instanceof CKEDITOR.dom.element&&this.replaceInElement(e)}};f.on("key",this.handleKey,this);this.handlePaste=function(a){if(a.data.dataTransfer.getTransferType(f)!=
CKEDITOR.DATA_TRANSFER_INTERNAL){var c=a.data.dataValue;if(-1<c.indexOf("\x3c")){if(matches=c.match(/^<a href="([^\"]+?)">(.+?)<\/a>$/))c=c.replace(matches[0],"\x3ca href\x3d'"+matches[1]+"' ipsNoEmbed\x3d'false'\x3e"+decodeURI(matches[2])+"\x3c/a\x3e");a.data.dataValue=c}else{for(var d=f.getSelection().getRanges(!0),e=0;e<d.length;e++)if(d[e].startOffset){var b=d[e].getPreviousEditableNode();if(b&&(b=b.getText(),"[url\x3d"==b.substr(-5)||"[img]"==b.substr(-5)||"[img\x3d"==b.substr(-5)||"[code]"==
b.substr(-6)))return}if(c=this.replaceTextWithLink(c))a.data.dataValue=c.getOuterHtml()}}};f.on("paste",this.handlePaste,this,{},11);this.handleAfterPaste=function(a){a=f.editable().find('a[ipsNoEmbed\x3d"false"]');for(var c=0;c<a.count();c++)this.replaceLinkWithEmbed(a.getItem(c))};f.on("afterPaste",this.handleAfterPaste,this);f.on("contentDom",function(){var a=this,c=f.editable();$("."+f.id).closest("form").on("submit",function(){for(var d=c.getChildren(),e=0;e<d.count();e++)d.getItem(e)&&d.getItem(e)instanceof
CKEDITOR.dom.element&&a.replaceInElement(d.getItem(e));f.updateElement()})},this);this.replaceInElement=function(a){if("a"!=a.getName()&&"pre"!=a.getName()&&!a.getAttribute("ipsnoautolink")){a=a.getChildren();for(var c=0;c<a.count();c++){var d=a.getItem(c);if(d instanceof CKEDITOR.dom.text){var e=[],b="",k=!1,h=d.getText().split(" ");for(word in h){if("[url\x3d"==h[word]||"[img]"==h[word]||"[code]"==h[word])return;var p=this.replaceWord(h[word].trim());p?("a"==p.getName()&&this.replaceLinkWithEmbed(p),
b.length&&(e.push(new CKEDITOR.dom.text(b)),b=""),e.push(p),k=!0):b+=h[word];word<h.length-1&&(b+=" ")}b.length&&e.push(new CKEDITOR.dom.text(b));if(1<e.length||k){for(b=0;b<e.length;b++)e[b].insertBefore(d),e[b]instanceof CKEDITOR.dom.element&&"span"==e[b].getName()&&e[b].hasClass("ipsEmoji")&&f.widgets.initOn(e[b],"ipsemoji");d.remove()}}else d&&d instanceof CKEDITOR.dom.element&&this.replaceInElement(d)}}};this.replaceWord=function(a){var c=this.replaceTextWithLink(a);return c?c:(a=this.replaceTextWithEmoticon(a))?
a:null};this.replaceTextWithLink=function(a){if(XRegExp.exec(a,this.urlRegex)){var c=new CKEDITOR.dom.element("a");c.setAttribute("ipsNoEmbed","false");c.setAttribute("href",$("\x3ctextarea /\x3e").html(a).text());c.appendText(decodeURI(_.unescape(a)));return c}return null};this.replaceTextWithEmoticon=function(a){if(ips.getSetting("emoji_shortcodes")&&a.match(/^:.*:$/i)||ips.getSetting("emoji_ascii")){var c=null;ips.getSetting("emoji_shortcodes")&&a.match(/^:.*:$/i)&&(c=a.substr(1,a.length-2));for(var d=
0;d<l.length;d++){for(var e=l[d],b=null,k=0;k<g[e].length;k++)c&&-1!=g[e][k].shortNames.indexOf(c)&&(b=g[e][k].code,g[e][k].skinTone&&ips.utils.cookie.get("emojiSkinTone")&&(b=ips.utils.emoji.tonedCode(b,ips.utils.cookie.get("emojiSkinTone")))),ips.getSetting("emoji_ascii")&&-1!=g[e][k].ascii.indexOf(a)&&(b=g[e][k].code);if(b)if(a=ips.utils.emoji.editorElement(b),"img"==a.getName()&&75<=$("\x3cdiv\x3e"+f.getData()+"\x3c/div\x3e").find("img[data-emoticon]").length){var h=$("."+f.id).closest("[data-ipsEditor]").find('[data-role\x3d"emoticonMessage"]');
h.slideDown();setTimeout(function(){instance.once("key",function(){h.slideUp()});instance.once("setData",function(){h.slideUp()})},2500);break}else return ips.utils.emoji.logUse(b),a}}return null};this.replaceLinkWithEmbed=function(a){if(f.config.ipsAutoEmbed&&"true"!=a.getAttribute("ipsNoEmbed")&&".pdf"!=a.getAttribute("href").substr(-4)){var c=this,d=new Image;d.onerror=function(){c._replaceLinkWithEmbed(a,!1)};d.onload=function(){c._replaceLinkWithEmbed(a,!0,d.width,d.height)};d.src=a.getAttribute("href")}};
this._replaceLinkWithEmbed=function(a,c,d,e){d=d||0;e=e||0;ips.getAjax()(f.config.controller+"\x26do\x3dvalidateLink",{data:{url:a.getAttribute("href").replace(/&amp;/g,"\x26"),image:c,width:d,height:e},type:"post"}).done(function(b){if(b.embed){var c,e,d,g=CKEDITOR.dom.element.createFromHtml(b.preview);if("img"==g.getName())g.replace(a),ips.utils.lazyLoad.applyLazyLoadAttributes(g.$),ips.utils.lazyLoad.loadContent(g.$);else{$(g.$).find(ips.utils.lazyLoad.contentSelector).length&&ips.utils.lazyLoad.loadContent(g.$);
b=a.getParents();for(i in b.reverse())if("p"==b[i].getName()){a.breakParent(b[i]);(b=a.getPrevious())&&0==b.getChildCount()?b.remove():e=b;if((b=a.getNext())&&(b.getChildCount(0)||b.getChildCount(1)&&b.getChild(0).is("br"))){var n=b.getNext();n&&(b.getChildCount(0)||b.getChildCount(1)&&b.getChild(0).is("br"))&&(b.remove(),b=n)}d=b;n=f.createRange();n.moveToElementEditEnd(b);f.getSelection().selectRanges([n]);break}g.replace(a);c=f.widgets.initOn(g,"ipsembedded");$(document).trigger("contentChange",
[$("."+f.id).closest("[data-ipsEditor]")])}var m=$("."+f.id).closest("[data-ipsEditor]").find('[data-role\x3d"embedMessage"]');m.slideDown();var l=function(){m.slideUp();m.find('[data-action\x3d"keepEmbeddedMedia"]').off("click.ipsEmbed");m.find('[data-action\x3d"removeEmbeddedMedia"]').off("click.ipsEmbed")};setTimeout(function(){f.once("key",function(){l()});f.once("setData",function(){l()})},2500);m.find('[data-action\x3d"keepEmbeddedMedia"]').on("click.ipsEmbed",function(){f.focus();l()});m.find('[data-action\x3d"removeEmbeddedMedia"]').on("click.ipsEmbed",
function(){c&&c.destroy();a.replace(g);a.setAttribute("ipsNoEmbed","true");if(d&&e)a.move(d,!0),d.moveChildren(e);else if(d){var b=new CKEDITOR.dom.element("p");b.insertBefore(a);a.move(b)}f.focus();l()})}else if(a.setAttribute("ipsNoEmbed","true"),b.errorMessage){var q=$("."+f.id).closest("[data-ipsEditor]").find('[data-role\x3d"embedFailMessage"]');q.find("p").html(b.errorMessage);q.slideDown();setTimeout(function(){f.once("key",function(){q.slideUp()});f.once("setData",function(){q.slideUp()})},
2500)}}).fail(function(b){a.setAttribute("ipsNoEmbed","true");var c=$("."+f.id).closest("[data-ipsEditor]").find('[data-role\x3d"embedFailMessage"]');c.find("p").html(ips.getString("embed_error_message_admin",{error:b.statusText+": "+b.responseText}));c.slideDown();setTimeout(function(){f.once("key",function(){c.slideUp()});f.once("setData",function(){c.slideUp()})},2500)})}};