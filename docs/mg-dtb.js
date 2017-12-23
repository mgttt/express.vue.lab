//TODO 数据变更时给点效果 //watch cellData.lmt .... 然后做个淡入?
Vue.component('mg-dtb-cell',{
	props: ['cellData','rowData','headData','tableConf'],
	template:'<td :rowData="rowData" :width="headData.width" :align="headData.align" :colspan="(tableConf.calcColSpan||function(){})(headData)||headData.colspan" :rowspan="(tableConf.calcRowSpan||function(){})(headData)||headData.rowspan">'
	+'<template v-if="tableConf.acts&&tableConf.acts[headData.dataIndx]">'
	+'<template v-for="(act,k) in tableConf.acts[headData.dataIndx]">'
	+'<template v-if="act.type==\'a\'"><a href="#" :class="act.cls" @click="(act.click||tableConf.rowAction||function(){alert(\'TODO \'+k)})({rowData:rowData,dataIndx:headData.dataIndx,action:k})">{{k}}</a></template>'
	+'<template v-else="act.type==\'button\'"><button :class="act.cls" v-html="act.html||act.text||k" @click="(act.click||tableConf.rowAction||function(){alert(\'TODO \'+k)})({rowData:rowData,dataIndx:headData.dataIndx,action:k})"></button></template>&nbsp;</template></template>'
	+'<span v-else v-html="(tableConf.renderCell||function(){})({cellData:cellData,rowData:rowData,dataIndx:headData.dataIndx})||cellData"></span>'
	+'</td>',
});
Vue.component('mg-dtb',{
	props: ['conf'],
	template:'<table :class="cls" :style="conf.style"><thead><tr><th v-for="headData in conf.cols" :width="headData.width" :align="headData.align" v-html="(conf.renderHead||function(){})(headData)||headData.title||headData.dataIndx"></th></tr></thead><tbody><tr v-for="rowData in conf.rows"><mg-dtb-cell v-for="headData in conf.cols" :tableConf="conf" :cellData="rowData[headData.dataIndx]" :rowData="rowData" :headData="headData"/></tr><tbody></table>',
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

