Vue.component('mg-ipt',{
	props: ['conf','val'],
	template: '<span :class="cls"><span class="mg-ipt-label">{{conf.label}}</span><input type="input" :id="conf.id" :name="conf.name" :value="value" @blur="change" :readonly="conf.readonly" :disabled="conf.disabled" :size="conf.size" :maxlength="conf.maxlength||conf.maxsize"/></span>',
	computed:{
		value:function(){
			return this.val || this.conf.value;
		},
		cls:function(){
			var _prefix='mg-ipt';
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
		change:function(evt){
			var _conf=this.conf;
			if(_conf){
				if(_conf.disabled || _conf.readonly)return;
				this.conf.value = this.val = evt.target.value;
				this.$emit('update:val', this.val);
			}
		}
	}
})


