Vue.component('mg-dtb',{
	template:"#mg-dtb",//dev tmp
	//template: "<div> <table :class="'mg-grid '+conf.cls"> <th><td v-for="td in conf.table_columns" v-conf:width="td.width" v-conf:align="td.align">{{td.title}}</td></th> <tr v-for="row in conf.table_data"> <td>{{row.prod_code}}</td> </tr> </table> </div> ",
	props: ['conf']
})

