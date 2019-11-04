/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
	//服务器
	'SERVER': 'http://localhost:8081/mybatis01',

	//用户管理
	'SYS_USER_DOLOGIN': '/admin/login', //登陆

	//营销机会管理
	'YX_LIST': '/salChanceAction_selSalChance.action', //销售机会查询
	'YX_MERAG': '/salChanceAction_merag.action', //营销机会管理增删
	//客户开发计划
	'KF_LIST': '/salPlanAction_selSalPlan.action', //客户开发计划查询
	'KF_MERAG': '/salPlanAction_merag.action', //客户开发计划
	'KF_EDIT': '/salChanceAction_edit.action', //客户开发计划

	//客户信息管理
	'KH_LIST': '/cstCustomerAction_selCstCustomer.action', //客户信息查询
	'KH_ADD': '/cstCustomerAction_addCstCustomer.action', //客户信息增加
	'KH_UPDATE': '/cstCustomerAction_updCstCustomer.action', //客户信息修改

	//联系人
	'LX_LIST': '/cstLinkmanAction_selCstLinkman.action', //客户信息查询
	//交往记录
	'JW_LIST': '/cstLinkmanAction_selCstLinkman.action', //客户信息查询
	//历史订单
	'LS_LIST': '/cstLinkmanAction_selCstLinkman.action', //客户信息查询


	//查看商品信息
	'SP_CKSP_SEL': '/productAction_list.action',
	//查看仓库信息
	'CK_CKCK_SEL': '/storageAction_selStorage.action',

	//流失信息
	'LIUSHI': '/cstLostAction_selCstLost.action',

	//服务管理
	//添加服务
	'FW_FWCJ_ADD': '/cstServiceAction_addCstService.action',
	//查询服务
	'FW_FWCL_SEL': '/cstServiceAction_selCstService.action',
	//修改
	'FW_FWCL_EDIT': '/cstServiceAction_updCstService.action',
	
	//获得请求的完整地址，用于mockjs测试时使用
	'getFullPath': k => {
		return this.SERVER + this[k];
	}
}