Vue.component('mg-rdo',{
	props: ['conf','val'],
	//template: '<span :class="cls"><input type="radio" :id="conf.id" :name="conf.name" :checked="(conf.value==val)" :value="conf.value" @change="change"><span class="mg-rdo-icon" @click="click">{{ conf.value==val ? "\u2726":""}}</span><span class="mg-rdo-label" @click="click"><transition name="fade"><span v-if="conf.show">{{conf.label}}</span><span v-else="!conf.show">{{conf.label}}</span></transition></span></span>',//未搞好click的动画...
	template: '<span :class="cls"><input type="radio" :id="conf.id" :name="conf.name" :checked="(conf.value==val)" :value="conf.value" @change="change"><span class="mg-rdo-icon" @click="click">{{ conf.value==val ? "\u2726":""}}</span><span class="mg-rdo-label" @click="click">{{conf.label}}</span></span>',
	//<transition name="bounce">
	computed:{
		cls:function(){
			var _prefix='mg-rdo';
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
	methods:{
		//拆出来想做动画...
		click:function(){
			//var _conf=this.conf;
			//if(_conf){
			//	this.conf.show=!this.conf.show;
			//}
			this.change();
		},
		change:function(){
			var _conf=this.conf;
			if(_conf){
				if(_conf.disabled || _conf.readonly)return;
				this.val = _conf.value;
				this.$emit('update:val', this.val);
			}
		}
	}
})

