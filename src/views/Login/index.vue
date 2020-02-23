<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :key="index"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="form-item">
          <label for="username">邮箱</label>
          <el-input
            type="text"
            id="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <label for="password">密码</label>
          <el-input
            type="password"
            id="password"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="password2"
          class="form-item"
          v-if="this.model === 'register'"
        >
          <label for="password2">重复密码</label>
          <el-input
            type="password"
            id="password2"
            v-model="ruleForm.password2"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkCode" class="form-item">
          <label for="checkCode">验证码</label>
          <el-row :gutter="12">
            <el-col :span="15">
              <el-input
                id="checkCode"
                v-model="ruleForm.checkCode"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                size="medium"
                @click="getSms()"
                :disabled="codeButton.status"
                >{{ codeButton.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="form-item">
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            :disabled="loginButtonStatus"
            >{{ model == "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "../../api/login.js"; //3.触发调用接口
import { stripscript, validateEmail, validatePass } from "@/utils/validate.js";
import { reactive, ref, onMounted } from "@vue/composition-api"; //1.导入composition-api

export default {
  name: "login",
  setup(props, { refs, root }) {
    /********************************************************
    表单验证规则
    */

    let checkCode = (rule, value, callback) => {
      ruleForm.checkCode = stripscript(value); //过滤特殊字符
      value = ruleForm.checkCode;
      let reg = /^([A-Za-z0-9]{6})$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validateEmail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value); //过滤特殊字符
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePass(value)) {
        callback(new Error("密码格式为6-20位数字加字母的组合"));
      } else {
        callback();
      }
    };
    let validatePassword2 = (rule, value, callback) => {
      ruleForm.password2 = stripscript(value); //过滤特殊字符
      value = ruleForm.password2;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    /********************************************************
    声明数据
    */
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    const ruleForm = reactive({
      username: "1762030184@qq.com",
      password: "",
      password2: "",
      checkCode: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      password2: [{ validator: validatePassword2, trigger: "blur" }],
      checkCode: [{ validator: checkCode, trigger: "blur" }]
    });
    const codeButton = reactive({
      status: false,
      text: "获取验证码"
    });
    const model = ref("login");
    const timer = ref(null);
    const loginButtonStatus = ref(false);
    const codeButtonStatus = ref(false);

    /********************************************************* 
    声明函数
    */
    //切换tabMenu函数
    const toggleMenu = data => {
      //高光
      menuTab.forEach(item => {
        item.current = false;
      });
      data.current = true;
      //修改模块值
      model.value = data.type;
      // 重置表单
      resetFields();
      //清除验证码按钮状态
      clearCountDown();
    };
    // 函数——重置表单
    const resetFields = () => {
      // context.refs['ruleForm'].resetFields();
      refs.ruleForm.resetFields();
    };
    // 更改验证码按钮状态
    const updataCodeButton = data => {
      codeButton.status = data.status;
      codeButton.text = data.text;
    };
    // 倒计时函数
    const countDown = number => {
      //定时器存在 清除
      if (timer.value) {
        clearInterval(timer.value);
      }

      let time = number + 1;
      timer.value = setInterval(() => {
        time--;
        if (time == 0) {
          clearInterval(timer.value);
          updataCodeButton({ status: false, text: "再次发送" });
        } else if (time != 0) {
          updataCodeButton({ status: true, text: `倒计时${time}秒` });
        }
      }, 1000);
    };
    // 清除倒计时函数
    const clearCountDown = () => {
      clearInterval(timer.value);
      updataCodeButton({ status: false, text: "获取验证码" });
    };
    // 获取验证码函数
    const getSms = () => {
      // 前端校验 —— 获取验证码前是否写入邮箱地址
      if (ruleForm.username == "") {
        root.$message({
          showClose: true,
          message: "错了哦，邮箱地址不能为空",
          type: "error"
        });
        return false;
      }
      if (!validateEmail(ruleForm.username)) {
        root.$message({
          showClose: true,
          message: "错了哦，邮箱地址格式发生错误",
          type: "error"
        });
        return false;
      }

      //切换验证码按钮的状态
      updataCodeButton({ status: true, text: "发送中" });
      //启用登录或者注册按钮
      loginButtonStatus.value = false;

      // 请求的接口
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };

      //模拟延迟5秒 setTimeout (去除)

      GetSms(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            showClose: true,
            message: data.message,
            type: "success"
          });
          //设定定时器 验证码按钮 60秒倒计时
          countDown(60);
        })
        .catch(error => {
          updataCodeButton({ status: false, text: "获取验证码" });
          console.log(error);
        });
    };
    // 提交表单函数
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid && model.value == "register") {
          register();
        } else if (valid && model.value == "login") {
          login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    // 注册状态提交表单——函数
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.checkCode
      };
      Register(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            showClose: true,
            message: data.message,
            type: "success"
          });
          //模拟注册成功，跳转到登录
          toggleMenu(menuTab[0]);
        })
        .catch(error => {
          console.log(error);
        });
    };
    // 登录状态提交表单——函数
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.checkCode
      };
      Login(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            showClose: true,
            message: `用户:${data.data.username},你已经${data.message}`,
            type: "success"
          });
          // 登录成功，用户跳转
          root.$router.push({
            name: "Console"
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**********************************************************  
      生命周期
      */
    onMounted(() => {});
    /********************************************************** 
       导出数据
       */
    return {
      //数据-ref
      model,
      loginButtonStatus,
      //数据-reactive
      menuTab,
      ruleForm,
      rules,
      codeButton,
      //方法
      toggleMenu,
      submitForm,
      getSms
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #344a5f;
  height: 100vh;
  .login-wrap {
    width: 330px;
    margin: 0 auto;
    padding-top: 20vh;
    .menu-tab {
      text-align: center;
      display: flex;
      justify-content: center;
      list-style-type: none;
      padding: 0;
      margin: 0;
      li {
        height: 36px;
        width: 88px;
        font-size: 14px;
        line-height: 36px;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
      .current {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .login-form {
      margin-top: 28px;
      .block {
        display: block;
        width: 100%;
      }
      .form-item {
        margin-bottom: 13px;
        .login-btn {
          margin-top: 19px;
        }
        label {
          height: 36px;
          margin-bottom: 4px;
          display: block;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>
