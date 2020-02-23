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
          <label for="">邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <label for="">密码</label>
          <el-input
            type="password"
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
          <label for="">重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkCode" class="form-item">
          <label for="">验证码</label>
          <el-row :gutter="12">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.checkCode"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" size="medium"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="form-item">
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>

<script>
import { stripscript, validateEmail, validatePass } from "@/utils/validate.js";
export default {
  name: "login",
  data() {
    var checkCode = (rule, value, callback) => {
      this.ruleForm.checkCode = stripscript(value); //过滤特殊字符
      value = this.ruleForm.checkCode;
      let reg = /^[a-z0-9]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validateEmail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value); //过滤特殊字符
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePass(value)) {
        callback(new Error("密码格式为6-20位数字加字母的组合"));
      } else {
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      this.ruleForm.password2 = stripscript(value); //过滤特殊字符
      value = this.ruleForm.password2;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      //模块值
      model: "login",
      //表单数据
      ruleForm: {
        username: "",
        password: "",
        password2: "",
        checkCode: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: validatePassword2, trigger: "blur" }],
        checkCode: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(item => {
        item.current = false;
      });
      data.current = true;
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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
