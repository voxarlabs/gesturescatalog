YUI.add("aui-video",function(e,t){var n=e.Lang,r=e.UA,i=e.getClassName,s=i("video"),o=i("video","node"),u=e.config.base+"aui-video/assets/player.swf?t="+n.now(),a=e.config.doc,f='<video id="{id}" controls="controls" class="'+o+'" {height} {width}></video>',l='<div class="'+o+'"></div>',c=e.Component.create({NAME:"video",ATTRS:{url:{value:""},ogvUrl:{value:""},swfUrl:{value:u},poster:{value:""},fixedAttributes:{value:{}},flashVars:{value:{}},render:{value:!0}},BIND_UI_ATTRS:["url","poster","ogvUrl","swfUrl","fixedAttributes","flashVars"],SYNC_UI_ATTRS:["url","poster","ogvUrl"],prototype:{renderUI:function(){var t=this;t._renderVideoTask=e.debounce(t._renderVideo,1,t),t._renderSwfTask=e.debounce(t._renderSwf,1,t),t._renderVideo(!t.get("ogvUrl"))},bindUI:function(){var e=this;e.publish("videoReady",{fireOnce:!0})},load:function(){var e=this;e._video.hasMethod("load")&&e._video.invoke("load")},pause:function(){var e=this;e._video.hasMethod("pause")&&e._video.invoke("pause")},play:function(){var e=this;e._video.hasMethod("play")&&e._video.invoke("play")},_createSource:function(t){var n=this,r=new e.Node(a.createElement("source"));return r.attr("type",t),r},_renderSwf:function(){var t=this,n=t.get("swfUrl");if(n){var i=t.get("url"),s=t.get("poster"),o=t.get("flashVars");e.mix(o,{controls:!0,src:i,poster:s});var u=e.QueryString.stringify(o);t._swfId?t._video.removeChild(e.one("#"+t._swfId)):t._swfId=e.guid();var a='<object id="'+t._swfId+'" ';r.ie?a+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':a+='type="application/x-shockwave-flash" data="'+n+'" ',a+='height="100%" width="100%">',r.ie&&(a+='<param name="movie" value="'+n+'"/>');var f=t.get("fixedAttributes");for(var l in f)a+='<param name="'+l+'" value="'+f[l]+'" />';u&&(a+='<param name="flashVars" value="'+u+'" />'),s!=""&&(a+='<img src="'+s+'" alt="" />'),a+="</object>",t._video.append(a)}},_renderVideo:function(t){var i=this,s,o,u,a,c,h,p;a=f,r.gecko&&t?a=l:(s="",o="",u=i.get("height"),p=i.get("width"),u&&(s='height="'+u+'"'),p&&(o='width="'+p+'"')),c=n.sub(a,{height:s,id:e.guid(),width:o}),h=e.Node.create(c),i.get("contentBox").append(h),i._video=h},_uiSetFixedAttributes:function(e){var t=this;t._renderSwfTask()},_uiSetFlashVars:function(e){var t=this;t._renderSwfTask()},_uiSetOgvUrl:function(e){var t=this;if(r.gecko||r.opera){var n=t._video,i=t._usingVideo();if(!e&&i||e&&!i)n.remove(!0),t._renderVideoTask(!e);if(!e)t._renderSwfTask();else{var s=t._sourceOgv;s||(s=t._createSource('video/ogg; codecs="theora, vorbis"'),n.append(s),t._sourceOgv=s),s.attr("src",e)}}},_uiSetPoster:function(e){var t=this,n=t._video;t._usingVideo()&&n.setAttribute("poster",e),t._renderSwfTask()},_uiSetSwfUrl:function(e){var t=this;t._renderSwfTask()},_uiSetUrl:function(e){var t=this,n=t.get("ogvUrl"),i=t._video,s=t._sourceMp4;if(r.gecko&&!t._usingVideo())s!=null&&(s.remove(!0),t._sourceMp4=null);else if(i||!n)s||(s=t._createSource("video/mp4;"),i.append(s),t._sourceMp4=s),s.attr("src",e);t._renderSwfTask()},_usingVideo:function(){var e=this;return e._video.get("nodeName").toLowerCase()==="video"}}});e.Video=c},"2.5.0",{requires:["querystring-stringify-simple","aui-node","aui-component","aui-debounce"],skinnable:!0});
