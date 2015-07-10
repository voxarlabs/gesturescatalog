YUI.add("dd-drop",function(e,t){var n="node",r=e.DD.DDM,i="offsetHeight",s="offsetWidth",o="drop:over",u="drop:enter",a="drop:exit",f=function(){this._lazyAddAttrs=!1,f.superclass.constructor.apply(this,arguments),e.on("domready",e.bind(function(){e.later(100,this,this._createShim)},this)),r._regTarget(this)};f.NAME="drop",f.ATTRS={node:{setter:function(t){var n=e.one(t);return n||e.error("DD.Drop: Invalid Node Given: "+t),n}},groups:{value:["default"],getter:function(){return this._groups?e.Object.keys(this._groups):(this._groups={},[])},setter:function(t){return this._groups=e.Array.hash(t),t}},padding:{value:"0",setter:function(e){return r.cssSizestoObject(e)}},lock:{value:!1,setter:function(e){return e?this.get(n).addClass(r.CSS_PREFIX+"-drop-locked"):this.get(n).removeClass(r.CSS_PREFIX+"-drop-locked"),e}},bubbles:{setter:function(e){return this.addTarget(e),e}},useShim:{value:!0,setter:function(t){return e.DD.DDM._noShim=!t,t}}},e.extend(f,e.Base,{_bubbleTargets:e.DD.DDM,addToGroup:function(e){return this._groups[e]=!0,this},removeFromGroup:function(e){return delete this._groups[e],this},_createEvents:function(){var t=[o,u,a,"drop:hit"];e.Array.each(t,function(e){this.publish(e,{type:e,emitFacade:!0,preventable:!1,bubbles:!0,queuable:!1,prefix:"drop"})},this)},_valid:null,_groups:null,shim:null,region:null,overTarget:null,inGroup:function(t){this._valid=!1;var n=!1;return e.Array.each(t,function(e){this._groups[e]&&(n=!0,this._valid=!0)},this),n},initializer:function(){e.later(100,this,this._createEvents);var t=this.get(n),i;t.get("id")||(i=e.stamp(t),t.set("id",i)),t.addClass(r.CSS_PREFIX+"-drop"),this.set("groups",this.get("groups"))},destructor:function(){r._unregTarget(this),this.shim&&this.shim!==this.get(n)&&(this.shim.detachAll(),this.shim.remove(),this.shim=null),this.get(n).removeClass(r.CSS_PREFIX+"-drop"),this.detachAll()},_deactivateShim:function(){if(!this.shim)return!1;this.get(n).removeClass(r.CSS_PREFIX+"-drop-active-valid"),this.get(n).removeClass(r.CSS_PREFIX+"-drop-active-invalid"),this.get(n).removeClass(r.CSS_PREFIX+"-drop-over"),this.get("useShim")&&this.shim.setStyles({top:"-999px",left:"-999px",zIndex:"1"}),this.overTarget=!1},_activateShim:function(){if(!r.activeDrag)return!1;if(this.get(n)===r.activeDrag.get(n))return!1;if(this.get("lock"))return!1;var e=this.get(n);this.inGroup(r.activeDrag.get("groups"))?(e.removeClass(r.CSS_PREFIX+"-drop-active-invalid"),e.addClass(r.CSS_PREFIX+"-drop-active-valid"),r._addValid(this),this.overTarget=!1,this.get("useShim")||(this.shim=this.get(n)),this.sizeShim()):(r._removeValid(this),e.removeClass(r.CSS_PREFIX+"-drop-active-valid"),e.addClass(r.CSS_PREFIX+"-drop-active-invalid"))},sizeShim:function(){if(!r.activeDrag)return!1;if(this.get(n)===r.activeDrag.get(n))return!1;if(this.get("lock"))return!1;if(!this.shim)return e.later(100,this,this.sizeShim),!1;var t=this.get(n),o=t.get(i),u=t.get(s),a=t.getXY(),f=this.get("padding"),l,c,h;u=u+f.left+f.right,o=o+f.top+f.bottom,a[0]=a[0]-f.left,a[1]=a[1]-f.top,r.activeDrag.get("dragMode")===r.INTERSECT&&(l=r.activeDrag,c=l.get(n).get(i),h=l.get(n).get(s),o+=c,u+=h,a[0]=a[0]-(h-l.deltaXY[0]),a[1]=a[1]-(c-l.deltaXY[1])),this.get("useShim")&&this.shim.setStyles({height:o+"px",width:u+"px",top:a[1]+"px",left:a[0]+"px"}),this.region={0:a[0],1:a[1],area:0,top:a[1],right:a[0]+u,bottom:a[1]+o,left:a[0]}},_createShim:function(){if(!r._pg){e.later(10,this,this._createShim);return}if(this.shim)return;var t=this.get("node");this.get("useShim")&&(t=e.Node.create('<div id="'+this.get(n).get("id")+'_shim"></div>'),t.setStyles({height:this.get(n).get(i)+"px",width:this.get(n).get(s)+"px",backgroundColor:"yellow",opacity:".5",zIndex:"1",overflow:"hidden",top:"-900px",left:"-900px",position:"absolute"}),r._pg.appendChild(t),t.on("mouseover",e.bind(this._handleOverEvent,this)),t.on("mouseout",e.bind(this._handleOutEvent,this))),this.shim=t},_handleTargetOver:function(){r.isOverTarget(this)?(this.get(n).addClass(r.CSS_PREFIX+"-drop-over"),r.activeDrop=this,r.otherDrops[this]=this,this.overTarget?(r.activeDrag.fire("drag:over",{drop:this,drag:r.activeDrag}),this.fire(o,{drop:this,drag:r.activeDrag})):r.activeDrag.get("dragging")&&(this.overTarget=!0,this.fire(u,{drop:this,drag:r.activeDrag}),r.activeDrag.fire("drag:enter",{drop:this,drag:r.activeDrag}),r.activeDrag.get(n).addClass(r.CSS_PREFIX+"-drag-over"))):this._handleOut()},_handleOverEvent:function(){this.shim.setStyle("zIndex","999"),r._addActiveShim(this)},_handleOutEvent:function(){this.shim.setStyle("zIndex","1"),r._removeActiveShim(this)},_handleOut:function(e){(!r.isOverTarget(this)||e)&&this.overTarget&&(this.overTarget=!1,e||r._removeActiveShim(this),r.activeDrag&&(this.get(n).removeClass(r.CSS_PREFIX+"-drop-over"),r.activeDrag.get(n).removeClass(r.CSS_PREFIX+"-drag-over"),this.fire(a,{drop:this,drag:r.activeDrag}),r.activeDrag.fire("drag:exit",{drop:this,drag:r.activeDrag}),delete r.otherDrops[this]))}}),e.DD.Drop=f},"patched-v3.16.0",{requires:["dd-drag","dd-ddm-drop"]});
