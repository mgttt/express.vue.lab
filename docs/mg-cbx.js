Vue.component('mg-cbx',{
	props: ['conf','val'],
	template: '<span :class="cls"><input type="checkbox" :id="conf.id" :name="conf.name" :checked="(conf.value==val)" :value="conf.value" @change="change"/><span class="mg-cbx-icon" @click="change">{{ conf.value==val ? "\u2714":""}}</span><span class="mg-cbx-label" @click="change">{{conf.label}}</span></span>',
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
			if(_conf){
				if(_conf.disabled || _conf.readonly)return;
				this.val = this.val ? null : _conf.value;
				this.$emit('update:val', this.val);
			}
		}
	}
})

