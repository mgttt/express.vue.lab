//@ref https://vuejs.org/v2/guide/components.html#Customizing-Component-v-model
/** [val_checked],[val_unchecked]
<mg-cbx :val="变量名" @change="v值 => { ... }" :val_checked="Y" :val_unchecked="N" />
 */
Vue.component('mg-cbx',{
	props: ['conf','label','id','name','val_checked','val_unchecked','val'],
	template: '<span :class="cls"><input type="checkbox" :id="id||(conf?conf.id:null)" :name="name||(conf?conf.name:null)" :checked="val_checked?(val_checked==val):(val?true:false)" :value="val" @change="change"/><span class="mg-cbx-icon" @click="change">{{(val_checked?(val_checked==val):(val?true:false))?"\u2714":""}}</span><span class="mg-cbx-label" @click="change">{{label||(conf?conf.label:null)}}</span></span>',
	computed:{
		cls:function(){
			var _prefix='mg-cbx';
			var _cls=_prefix;
			var _conf=this.conf;
			if(_conf){
				if(_conf.cls){ _cls+=' '+_conf.cls; }
				if(_conf.disabled){ _cls+=' '+_prefix+'-disabled'; }
				if(_conf.readonly){ _cls+=' '+_prefix+'-readonly'; }
			}
			return _cls;
		}
	},
	methods: {
		change:function(){
			var _conf=this.conf;
			if(_conf){ if(_conf.disabled || _conf.readonly)return; }
			var _checked = this.val_checked?(this.val_checked==this.val):(this.val?true:false);
			var _new_val = _checked ? (this.val_unchecked||false) : (this.val_checked||true);
			//this.val = _new_val;//不在这里更新,应该在外面@change那里由逻辑自己决定要不要更新.
			this.$emit('change',_new_val);//PlanA 由外面自己判断要不要更新
			this.$emit('update:val', _new_val);//PlanB 当外面用 :val.sync 时，这样可以反向更新外面的值而可以不需要考虑@change事件的处理.
		}
	}
})
