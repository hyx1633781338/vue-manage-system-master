<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>客户流失管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="query" :model="query" label-width="70px">
					<el-select v-model="query.lstStatus" placeholder="状态" class="handle-select mr10">
						<el-option key="1" label="暂缓流失" value="暂缓流失"></el-option>
						<el-option key="2" label="预警" value="预警"></el-option>
						<el-option key="2" label="确认流失" value="确认流失"></el-option>
						<el-option key="2" label="暂缓客户流失成功" value="暂缓客户流失成功"></el-option>
					</el-select>
					客户
					<el-input v-model="query.lstCustName" placeholder="请输入内容" class="handle-input mr10"></el-input>
					客户经理
					<el-input v-model="query.lstCustManagerName" placeholder="请输入内容" class="handle-input mr10"></el-input>
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="index" label="ID" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="lstCustName" label="客户" align="center"></el-table-column>
				<el-table-column prop="lstCustManagerName" label="客户经理" align="center"></el-table-column>
				<el-table-column prop="lstLastOrderDate" label="上次下单日期" align="center"></el-table-column>
				<el-table-column prop="lstLostDate" label="确认流失日期" align="center"></el-table-column>
				<el-table-column prop="lstStatus" label="状态" align="center"></el-table-column>
				<el-table-column label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="zhls()">暂缓流失</el-button>
						<el-button type="danger" icon="el-icon-delete" class="" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
	import {
		fetchData
	} from '../../api/index';
	export default {
		name: 'basetable',
		data() {
			return {
				query: {
					lstStatus: '',
					lstCustName: '',
					lstCustManagerName: '',
					page: 1,
					rows: 10
				},
				tableData: [],
				delList: [],
				editVisible: false,
				total: 0,
			};
		},
		created() {
			this.handleSearch();
		},
		methods: {
			//暂缓流失
			zhls() {
				this.$router.push({
					path: 'zhls'
				})
			},
			// 触发搜索按钮
			handleSearch() {
				var url = this.axios.urls.LIUSHI;
				this.axios.post(url, this.query).then((response) => {
					//返回数据
					this.tableData = response.data.result;
					//总记录数
					this.total = response.data.total;
				}).catch((response) => {});
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
			indexMethod(index) {
				return(this.query.page - 1) * this.query.rows + (index + 1);
			},
			//变动每页显示条数
			handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.query.page = 1;
				this.query.rows = rows;
				this.handleSearch();
			},
			//分页
			handlePageChange: function(page) {
				console.log("page=%i", page);
				this.query.page = page;
				this.handleSearch();
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