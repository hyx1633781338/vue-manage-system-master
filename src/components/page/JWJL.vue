<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: 'khtable' }">客户信息表格</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: 'khxq' }">客户信息详情</el-breadcrumb-item>
				<el-breadcrumb-item>交往记录</el-breadcrumb-item>

			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="forma" :model="forma" label-width="70px">
					<el-button-group>
						<el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
						<el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="editVisible=true"></el-button>
					</el-button-group>
					客户编号
					<el-input v-model="forma.name" placeholder="请输入内容" class="handle-input mr10"></el-input>
					客户名称
					<el-input v-model="forma.name" placeholder="请输入内容" class="handle-input mr10"></el-input>
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column type="index" label="ID" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="datea" label="日期" align="center"></el-table-column>
				<el-table-column prop="address" label="地点" align="center"></el-table-column>
				<el-table-column prop="outline" label="概要" align="center"></el-table-column>
				<el-table-column prop="information" label="详细信息" align="center"></el-table-column>
				<el-table-column prop="remark" label="备注" align="center"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="dialogTitle" :visible.sync="editVisible" width="45%" @close="handleDialogClose">
			<el-form :rules="rules" ref="formb" :model="formb" label-width="70px" label-position="left">
				<el-form-item label="时间">
					<el-col :span="10">
						<el-form-item prop="datea">
							<el-date-picker type="date" placeholder="选择日期" v-model="formb.datea" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>地点</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="address">
							<el-input v-model="formb.address"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="概要">
					<el-col :span="10">
						<el-form-item prop="outline">
							<el-input v-model="formb.outline"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>备注</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="formb.remark"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="详细信息">
					<el-form-item prop="information">
						<el-input type="textarea" v-model="formb.information"></el-input>
					</el-form-item>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'basetable',
		data() {
			return {
				page: 1,
				rows: 10,
				total: 2,
				editVisible: false,
				dialogTitle: '添加',
				tableData: [{
						datea: '2019/9/9',
						address: '上海',
						outline: '无',
						information: '无',
						remark: '无'
					},
					{
						datea: '2019/9/9',
						address: '上海',
						outline: '无',
						information: '无',
						remark: '无'
					}
				],
				forma: {
					id: '',
					name: ''
				},
				formb: {
					datea: '',
					address: '',
					outline: '',
					information: '',
					remark: ''
				},
				rules: {
					outline: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					information: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					datea: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
				},
				multipleSelection: [],
				delList: [],
				idx: -1,
				id: -1
			};
		},
		created() {
			this.getData();
		},
		methods: {
			indexMethod(index) {
				return(this.page - 1) * this.rows + (index + 1);
			},
			/* <!--清空文本框 --> */
			resetGergeForm: function() {
				//this.$refs['formb'].resetFields();
				this.dialogTitle = '添加';
				this.formb.datea = null;
				this.formb.address = null;
				this.formb.outline = null;
				this.formb.information = null;
				this.formb.remark = null;
			},
			handleDialogClose: function() {
				this.resetGergeForm();
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				fetchData(this.query).then(res => {
					this.tableData = res.list;
					this.pageTotal = res.pageTotal || 1;
				});
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
				this.formb = row;
				this.dialogTitle = '编辑';
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.$refs['formb'].validate((valid) => {
					if(valid) {
						this.editVisible = false;
						this.$message.success(`修改第 ${this.idx + 1} 行成功`);
						this.$set(this.tableData, this.idx, this.form);
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			//变动每页显示条数
			/*handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.page = 1;
				this.rows = rows;
				this.search();
			},*/
			//分页
			/*handleCurrentChange: function(page) {
				console.log("page=%i", page);
				this.page = page;
				this.search();
			},*/
			//绑定数据方法
			/*search: function() {
				var formData = {
					forma：this.forma
					title: this.title,
					page: this.page,
					rows: this.rows
				};
				var url = this.axios.urls.SYS_ARTICLES_LIST;
				this.axios.post(url, formData).then((response) => {
					this.tableData = response.data.result;
					this.total = response.data.total;
					//console.log(response.data.result);
				}).catch((response) => {

				});
			}*/
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