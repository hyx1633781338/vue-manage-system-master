<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: 'khtable' }">客户信息表格</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: 'khxq' }">客户信息详情</el-breadcrumb-item>
				<el-breadcrumb-item>历史订单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="forma" :model="forma" label-width="70px">
					<el-button-group>
						<el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
						<el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="ofxq()">新增订单</el-button>
					</el-button-group>
					客户编号
					<el-input v-model="forma.id" placeholder="请输入内容" class="handle-input mr10"></el-input>
					客户名称
					<el-input v-model="forma.naFme" placeholder="请输入内容" class="handle-input mr10"></el-input>
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column type="index" label="ID" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="datea" label="日期" align="center"></el-table-column>
				<el-table-column prop="address" label="地址" align="center"></el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')">{{scope.row.state}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="ofxq()">订单详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'basetable',
		data() {
			return {
				page: 1,
				rows: 10,
				total: 1,
				editVisible: false,
				dialogTitle: '添加',
				tableData: [{
						datea: '2019/9/9',
						address: '上海',
						state:'成功'
					},
					{
						datea: '2019/9/9',
						address: '上海',
						state:'失败'
					},
					{
						datea: '2019/9/9',
						address: '上海',
						state:'未通过'
					}
				],
				forma: {
					id: '',
					name: ''
				},
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				},
				idx: -1,
				id: -1
			};
		},
		created() {
		},
		methods: {
			indexMethod(index) {
				return(this.page - 1) * this.rows + (index + 1);
			},
			//联系人
			ofxq() {
				this.$router.push({
					path: 'ofxq'
				})
			},
			// 触发搜索按钮
			handleSearch() {
				this.$set(this.query, 'pageIndex', 1);
				this.getData();
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
						this.tableData.splice(index, 1);
					})
					.catch(() => {});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				const length = this.multipleSelection.length;
				let str = '';
				this.delList = this.delList.concat(this.multipleSelection);
				for(let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error(`删除了${str}`);
				this.multipleSelection = [];
			},
			// 编辑操作
			handleEdit(index, row) {
				this.idx = index;
				this.form = row;
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
			},
			// 分页导航
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
				this.getData();
			}
		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}
	
	.handle-select {
		width: 120px;
	}
	
	.handle-input {
		width: 150px;
		display: inline-block;
	}
	
	.table {
		width: 100%;
		font-size: 14px;
	}
	
	.red {
		color: #ff0000;
	}
	
	.mr10 {
		margin-right: 10px;
	}
	
	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>