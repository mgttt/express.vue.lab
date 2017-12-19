Vue.component('mg-dtb',{
	template:"#mg-dtb",//dev tmp
	//template: "<div> <table :class="'mg-grid '+conf.cls"> <th><td v-for="td in conf.table_columns" v-conf:width="td.width" v-conf:align="td.align">{{td.title}}</td></th> <tr v-for="row in conf.table_data"> <td>{{row.prod_code}}</td> </tr> </table> </div> ",
	props: ['conf'],
	computed:{
		cls:function(){
			var _prefix='mg-dtb';
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
})

