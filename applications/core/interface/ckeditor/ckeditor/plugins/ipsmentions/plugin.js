﻿CKEDITOR.plugins.add("ipsmentions",{init:function(c){new CKEDITOR.plugins.ipsmentions(c)}});
CKEDITOR.plugins.ipsmentions=function(c){this.currentMention=this.listenForDestruct=this.listenWithinMention=this.listenForAtSymbolEvent=null;this.mentionLengthAtLastResult=this.callsWithNoResults=0;this.ajaxObj=this.results=null;this.listenForAtSymbol=function(a){CKEDITOR.tools.setTimeout(function(){var a=c.getSelection();if(a.getType()==CKEDITOR.SELECTION_TEXT)for(var a=a.getRanges(!0),b=0;b<a.length;b++)a[b].collapsed&&a[b].startOffset&&(a[b].setStart(a[b].startContainer,0),"@"==a[b].cloneContents().$.textContent.substr(-1)&&
($(c.element.$).closest("[data-ipsEditor]").trigger("ips.editorMenuOpen",{type:"mention"}),this.respondToAtSymbol(a[b])))},0,this)};this.respondToAtSymbol=function(a){var d=a.cloneContents().$.textContent;if(1<d.length&&!d.substr(-2,1).match(/\s/))$(c.element.$).closest("[data-ipsEditor]").trigger("ips.editorMenuClosed",{type:"mention"});else{this.listenForAtSymbolEvent&&!_.isUndefined(this.listenForAtSymbolEvent)&&c.removeListener("change",this.listenForAtSymbol);this.currentMention=new CKEDITOR.dom.element("span");
this.currentMention.setText("@");if(a.endContainer instanceof CKEDITOR.dom.element){for(var b,f=a.endContainer.getChildren(),d=f.count();0<=d;d--){var e=f.getItem(d);if(e instanceof CKEDITOR.dom.text&&"@"==e.getText()){b=e;break}}if(!b){$(c.element.$).closest("[data-ipsEditor]").trigger("ips.editorMenuClosed",{type:"mention"});return}}else b=a.endContainer.split(a.endOffset-1);b.split(1);this.currentMention.replace(b);b=c.createRange();b.moveToPosition(this.currentMention,CKEDITOR.POSITION_BEFORE_END);
c.getSelection().selectRanges([b]);this.mentionLengthAtLastResult=this.callsWithNoResults=0;this.results=$('\x3cul class\x3d"ipsMenu ipsMenu_auto ipsMenu_bottomLeft" data-mentionMenu\x3e\x3c/ul\x3e').hide();this.results.append('\x3cli class\x3d"ipsLoading ipsLoading_small" style\x3d"height: 40px"\x3e\x26nbsp;\x3c/li\x3e');$("body").append(this.results);this.positionResults(a);this.listenWithinMention=c.on("key",this.listenWithinMentionEvent,this);this.listenForDestruct=c.on("resetOrDestroy",this.listenForDestructEvent,
this)}};this.positionResults=function(a){a={trigger:$(this.currentMention.$),target:this.results,center:!0,above:!1,stemOffset:{left:25,top:0}};a=ips.utils.position.positionElem(a);ips.utils.position.getElemPosition($(this.currentMention.$));this.results.css({left:a.left+"px",top:a.top+"px",position:a.fixed?"fixed":"absolute"});var c=[];$.each("topLeft topRight topCenter bottomLeft bottomRight bottomCenter".split(" "),function(a,b){c[a]="ipsMenu_"+b});this.results.removeClass(c.join(" "));var b;b=
""+a.location.vertical;b+=a.location.horizontal.charAt(0).toUpperCase();b+=a.location.horizontal.slice(1);this.results.addClass("ipsMenu_"+b)};this.listenForDestructEvent=function(a){this.cancelMention();this.closeResults()};this.listenWithinMentionEvent=function(a){if(27==a.data.keyCode)this.cancelMention(),this.closeResults();else if(40==a.data.keyCode||38==a.data.keyCode){var d=this.results.children("[data-selected]");d.length?(d.removeAttr("data-selected"),40==a.data.keyCode?d.next().attr("data-selected",
!0):d.prev().attr("data-selected",!0)):40==a.data.keyCode?this.results.children(":first-child").attr("data-selected",!0):this.results.children(":last-child").attr("data-selected",!0);a.cancel()}else 13==a.data.keyCode||9==a.data.keyCode?(d=this.results.children("[data-selected]"),d.length?(d.click(),a.cancel()):13==a.data.keyCode&&(this.cancelMention(),this.closeResults())):(8==a.data.keyCode&&(this.callsWithNoResults=0),CKEDITOR.tools.setTimeout(function(){if(null!=this.currentMention&&this.currentMention.getText().length){for(var a=
c.getSelection().getRanges(),d=0;d<a.length;d++)if(!a[d].getCommonAncestor(!0,!0).equals(this.currentMention)){this.cancelMention();this.closeResults();return}var e=this.currentMention.getText().substr(1).trim();this.results.show();this.positionResults();if(this.ajaxObj&&_.isFunction(this.ajaxObj.abort))try{this.ajaxObj.abort()}catch(h){}var a=c.config.controller+"\x26do\x3dmention\x26input\x3d"+encodeURIComponent(e),d=$(c.element.$).closest("[data-ipsEditor]").attr("data-ipsEditor-contentClass"),
g=$(c.element.$).closest("[data-ipsEditor]").attr("data-ipsEditor-contentId");_.isUndefined(d)||_.isUndefined(g)||(a=a+"\x26contentClass\x3d"+encodeURIComponent(d)+"\x26contentId\x3d"+g);this.ajaxObj=ips.getAjax()(a,{context:this}).done(function(a){a?(this.mentionLengthAtLastResult=e.length,this.results.removeClass("ipsLoading"),this.results.html(a),this.results.children().click($.proxy(this.selectMentionResult,this))):e.length&&(this.callsWithNoResults++,3<=this.callsWithNoResults?(this.cancelMention(),
this.closeResults()):this.mentionLengthAtLastResult<=e.length-5&&this.results.hide())})}else this.closeResults()},50,this))};this.selectMentionResult=function(a){a=$(a.currentTarget);this.currentMention.renameNode("a");this.currentMention.setAttribute("href",a.attr("data-mentionhref"));this.currentMention.setAttribute("contenteditable","false");this.currentMention.setAttribute("data-ipsHover","");this.currentMention.setAttribute("data-ipsHover-target",a.attr("data-mentionhover"));this.currentMention.setAttribute("data-mentionid",
a.attr("data-mentionid"));this.currentMention.setHtml("@"+a.find('[data-role\x3d"mentionname"]').html());c.focus();a=c.createRange();a.moveToElementEditEnd(this.currentMention);c.getSelection().selectRanges([a]);this.closeResults()};this.cancelMention=function(){this.currentMention&&this.currentMention.remove(!0)};this.closeResults=function(){$(c.element.$).closest("[data-ipsEditor]").trigger("ips.editorMenuClosed",{type:"mention"});this.currentMention=null;this.results&&this.results.remove();this.listenWithinMention&&
!_.isUndefined(this.listenWithinMention)&&c.removeListener("key",this.listenWithinMentionEvent);this.listenForAtSymbolEvent=c.on("change",this.listenForAtSymbol,this)};this.listenForAtSymbolEvent=c.on("change",this.listenForAtSymbol,this)};