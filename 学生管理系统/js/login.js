new Vue({
    el: "#app",
    data: {
        loginForm: {
            username: "",
            password: ""
        },
        rules: {
            username: {
                required: true, message: "请填写用户名",
                trigger: "blur"
            },
            password: {
                required: true, message: "请填写密码",
                trigger: "blur"
            },
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    //向服务器提交数据
                    let res = true;  //表示服务器返回结果
                    if (res) {
                        this.$message.success("登陆成功");
                        setTimeout(() => {
                            location.replace("main.html")
                        }, 500)
                    } else {
                        this.$message.error("登陆失败")
                    }
                }else{
                    return false;
                }
                
            })


        }
    }
})