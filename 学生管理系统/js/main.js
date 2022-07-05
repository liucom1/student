// const { axios } = require("./axios.min");

new Vue({
    el: "#app",
    data: {
        tableData: [],
        active: "show",
        addForm: {
            name: "",
            age: ""
        },
        rules: {
            name: { required: true, message: "请填写姓名", trigger: "blur" },
            age: { required: true, message: "请填写年龄", trigger: "blur" }
        },
        editForm: {},
        dialogVisible: false,
        total: 0,
        page: 1
    },
    methods: {
        handleSubmit() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    axios.post("http://localhost:6868/student", this.addForm).then(
                        res => {
                            if (res.data.affectedRows == 1) {
                                this.$refs.addForm.resetFields();
                                this.$message.success("添加成功");
                            } else {
                                this.$message.error("添加失败");
                            }
                        })
                } else {
                    return false;
                }
            })
        },
        handleDelete(id) {
            this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete("http://localhost:6868/student/"+id).then(res => {
                    if (res.data.affectedRows === 1) {
                        this.$message({
                            type: 'success',
                            message: "删除成功！"
                        });
                        this.fetchData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleEdit(obj) {
            this.editForm = Object.assign({}, obj);
            this.dialogVisible = true;
        },
        handleUpdate() {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    axios.put("http://localhost:6868/student/" + this.editForm.id, this.editForm).then(res => {
                        if (res.data.affectedRows === 1) {
                            this.$message({
                                type: 'success',
                                message: "修改成功！"
                            });
                            this.fetchData();
                            this.dialogVisible = false;
                            this.$message.success("修改成功");
                            
                        } else {
                            this.$message({
                                type: 'error',
                                message: '修改失败!'
                            });
                        }
                    })

                } else {
                    return false;
                }
            })
        },
        fetchData() {
            axios.get("http://localhost:6868/student", {
                params: {
                    page: this.page,
                    limit: 5
                }
            }).then(res => {
                this.tableData = res.data;
            });
            axios.get("http://localhost:6868/count").then(res => {
                this.total = res.data[0].total;
            });
        }
    },
    mounted() {
        // if(this.default-openeds == "2"){
        // print(this.default-active);
        this.fetchData();
    // }
    }
})