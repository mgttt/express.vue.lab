//TODO 设计 body_slot，这样可以直接切入.
//TODO 设计 body_data，这样可以把 数据切入和切出... && callback要把form的数据返回...
//@ref https://cn.vuejs.org/v2/guide/components.html#动态组件
function mg_dlg_q(opts){
	var _dfr=Q.defer();
	if(!opts)opts={};
	var _gDialogComponent;
	var _actions = opts.actions ||{ ok:{ label:' O K '} };
	var _body_data = opts.body;
	var _data={
		show:true,
		conf:{
			header:opts.header||"",
			body:_body_data||opts.msg||"???",
			actions:_actions
		}
	};
	var _vm = new Vue({
		template: '<transition name="modal" v-if="show"><div class="mg-dlg-mask"><div class="mg-dlg-wrapper"><div class="mg-dlg-container">'
		+'<div class="mg-dlg-header"><button class="mg-dlg-default-button" @click="callback()">X</button><span class="ui-dialog-title" v-html="conf.header"></span></div>'
		+(opts.template?'<mg-frm/>':'<span v-html="conf.body"/>')+'<div class="mg-dlg-footer" _style="text-align:center"><template v-for="(act,k) in conf.actions"><button @click="callback(k)" v-html="\'&nbsp;\'+act.label+\'&nbsp;\'"></button>&nbsp;</template></div>'
		+'</div></div></div></transition>',
		data: _data,
		components:{ 'mg-frm': {
			template:opts.template,
			data:function(){ return _body_data }
		} },
		methods:{
			callback:function(x){
				var _this=this;
				setTimeout(function(){
					_this.show=false;
				},66);
				setTimeout(function(){
					//let them go:
					if(_gDialogComponent){
						document.body.removeChild(_gDialogComponent.$el);
						_gDialogComponent=null;
						_vm.$destroy();
						_vm=null;
					}
				},222);//其实内存究竟有清掉呢?? 后面还要再研究...
				//TODO 如果有body_slot要把整个结果返回哦...
				//TODO onBeforeConfirm 未做好.
				if(opts.onBeforeConfirm){
					if(opts.onBeforeConfirm(_body_data)){
						//确认
						_dfr.resolve({STS:'OK',choice:x,data:_body_data});
					}else{
						//不做事?
					}
				}else{
					_dfr.resolve({STS:'OK',choice:x,data:_body_data});
				}
				return true;
			}
		}
	});
	_gDialogComponent = _vm.$mount()
	document.body.appendChild(_gDialogComponent.$el)
	return _dfr.promise;
}

