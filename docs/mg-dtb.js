Vue.component('mg-dtb',{
	props: ['conf'],
	template:'<table :class="table_css" :style="conf.style"><thead>'
	+'<tr v-for="colRow in ((conf.cols&&conf.cols.length>0&&conf.cols[0].length>0)?conf.cols:[conf.cols])"><component v-for="headData in colRow" :tableConf="conf" :headData="headData" :is="headData.head_component||head_component"/></tr>'
	+'</thead><tbody>'
	+'<tr v-for="rowData in conf.rows"><component v-for="headData in ((conf.cols&&conf.cols.length>0&&conf.cols[0].length>0)?conf.cols.slice(-1)[0]:conf.cols)" :tableConf="conf" :cellData="rowData[headData.dataIndx]" :rowData="rowData" :headData="headData" :is="headData.cell_component||cell_component"/></tr>'
	+'<tbody></table>',
	computed:{
		head_component:function(){return{
			props: ['headData','tableConf'],
			template:
			//'<th :colspan="headData.colspan" v-html="headData.title||headData.dataIndx||headData"></th>',
			'<th :colspan="headData.colspan" :rowspan="headData.rowspan" v-html="headData.title||headData.dataIndx||headData"></th>',
		}},
		cell_component:function(){return{
			props: ['cellData','rowData','headData','tableConf'],
			template:
			//'<td :width="headData.width" :align="headData.align" :colspan="(tableConf.calcColSpan||function(){})(headData)||headData.colspan" :rowspan="(tableConf.calcRowSpan||function(){})(headData)||headData.rowspan">'
			'<td :width="headData.width" :align="headData.align">'
			+'<template v-if="tableConf.acts&&tableConf.acts[headData.dataIndx]">'
			+'<template v-for="(act,k) in tableConf.acts[headData.dataIndx]">'
			+'<template v-if="act.type==\'a\'"><a href="#" :class="act.cls" @click="(act.click||tableConf.rowAction||function(){alert(\'TODO \'+k)})({rowData:rowData,dataIndx:headData.dataIndx,action:k})" v-html="act.html||act.text||k"></a></template>'
			+'<template v-else-if="act.type==\'button\'"><button :class="act.cls" v-html="act.html||act.text||k" @click="(act.click||tableConf.rowAction||function(){alert(\'TODO \'+k)})({rowData:rowData,dataIndx:headData.dataIndx,action:k})"></button></template>'
			+'<template v-else-if="act.type==\'mg-cbx\'"><mg-cbx :val="rowData[k]" :val_checked="true" :val_uncheck="false" @change="val=>{(tableConf.rowAction||function(){alert(\'TODO \'+headData.dataIndx)})({rowData:rowData,dataIndx:headData.dataIndx,action:k,value:val})}"/></template>'
			+'<template v-else><span v-html="act.html||act.text||k"></span></template>'
			+'&nbsp;</template></template>'//for+if
			+'<span v-else v-html="cellData"></span>'
			+'</td>',
		}},
		table_css:function(){
			var _prefix=this.cls_prefix || 'mg-dtb';
			var _cls=_prefix;
			var _conf=this.conf;
			if(_conf){
				if(_conf.cls){ _cls+=' '+_conf.cls; }
				if(_conf.disabled){ _cls+=' '+_prefix+'-disabled'; }
				if(_conf.readonly){ _cls+=' '+_prefix+'-readonly'; }
			}
			return _cls;
		}
	}
})
