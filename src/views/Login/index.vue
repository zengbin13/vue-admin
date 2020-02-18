<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li 
          v-for="(item, index) in menuTab" 
          :key="index"
          :class="{current: item.current}"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- 表单 start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        
        <el-form-item prop="username" class="form-item">
          <label for="username">邮箱</label>
          <el-input type="text" id="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <label for="password">密码</label>
          <el-input type="password" id="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="password2" class="form-item" v-if="this.model === 'register'">
          <label for="password2">重复密码</label>
          <el-input type="password" id="password2" v-model="ruleForm.password2" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="checkCode" class="form-item">
          <label for="checkCode">验证码</label>
          <el-row :gutter="12">
            <el-col :span="15">
              <el-input id="checkCode" v-model.number="ruleForm.checkCode" maxlength="6" minlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" size="medium" 
              @click="getSms()"
              :disabled="codeButton.status"
              >{{ codeButton.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="form-item">
          <el-button type="danger" 
          @click="submitForm('ruleForm')" 
          class="block login-btn"
          :disabled="loginButtonStatus"
          >{{ model == 'login' ? "登录" : "注册" }}</el-button>
        </el-form-item>

      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>

<script>
import { GetSms } from '../../api/login.js'  //3.触发调用接口
import { stripscript, validateEmail, validatePass } from '@/utils/validate.js'
import {reactive, ref, onMounted} from '@vue/composition-api' //1.导入composition-api

export default {
    name: 'login',
    setup(props, context) {
      /*表单验证规则*/
      let checkCode = (rule, value, callback) => {
        // ruleForm.checkCode = stripscript(value)  //过滤特殊字符
        // value = ruleForm.checkCode
        let reg = /^[a-z0-9]{6}$/ 
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (!reg.test(value)) {
          callback(new Error('验证码格式错误'));
        } else {
          callback();
        }
      };
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (!validateEmail(value)) {
          callback(new Error('用户名格式错误'));
        } else {
          callback();
        }
      };
      let validatePassword = (rule, value, callback) => {
        ruleForm.password = stripscript(value)  //过滤特殊字符
        value = ruleForm.password
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!validatePass(value)) {
          callback(new Error('密码格式为6-20位数字加字母的组合'));
        } else {
          callback();
        }
      };
      let validatePassword2 = (rule, value, callback) => {
        ruleForm.password2 = stripscript(value)  //过滤特殊字符
        value = ruleForm.password2
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.ruleForm.password) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      };

      /**********************************************************  
      声明数据
      */
      const menuTab = reactive([
        {txt: '登录', current: true, type:'login'},
        {txt: '注册', current: false, type:'register'}
      ])
      const ruleForm = reactive({
        username: '',
        password: '',
        password2: '',
        checkCode: ''
      })
      const rules = reactive({
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePassword2, trigger: 'blur' }
        ],
        checkCode: [
          { validator: checkCode, trigger: 'blur' }
        ]
      })
      const codeButton = reactive({
        status: false,
        text: "获取验证码"
      })
      const model = ref('login')
      const timer = ref(null)
      const loginButtonStatus = ref(true)
      const codeButtonStatus = ref(false)

      /********************************************************* 
      声明函数
      */
     //切换tabMenu函数
      const toggleMenu = (data) => {    
        menuTab.forEach( item => {
          item.current = false
        })
        //高光
        data.current = true
        //修改模块值
        model.value = data.type
        // 重置表单
        // context.refs['loginForm'].resetFields();
        context.refs.loginForm.resetFields();
      }
      //倒计时函数
      const countDown = (number) => {
        let time = number + 1
        timer.value = setInterval(() => {  
          time--
          if (time == 0) {
            clearInterval(timer.value)
            codeButton.text = "再次发送"
            codeButton.status = false
          } else if (time != 0) {
            codeButton.text = `倒计时${time}秒`
          }
        }, 1000);
      }
      //提交表单函数
      const submitForm = (formName) => {
        context.refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      // 获取验证码函数
      const getSms = () => {
        // 前端校验 —— 获取验证码前是否写入邮箱地址
        if (ruleForm.username == '') {
          context.root.$message({
            showClose: true,
            message: '错了哦，邮箱地址不能为空',
            type: 'error'
          })
          return false
        }
        if( !validateEmail(ruleForm.username) ){
          context.root.$message({
            showClose: true,
            message: '错了哦，邮箱地址格式发生错误',
            type: 'error'
          })
          return false
        }

        //切换验证码按钮的状态
        codeButton.status = true
        codeButton.text = "发送中"

        //启用登录或者注册按钮
        loginButtonStatus.value = false

        // 请求的接口
        let requestData = {
          username: ruleForm.username,
          model : model.value
        }
        //模拟延迟5秒
        setTimeout(() => {
          GetSms(requestData).then( response => {
            let data = response.data
            context.root.$message({
              showClose: true,
              message: data.message,
              type: 'success'
            })
            //设定定时器 验证码按钮 60秒倒计时
            countDown(15)
          }).catch( error => {
            console.log(error);
          })
        }, 1000);
        
      }
      /**********************************************************  
      生命周期
      */
      onMounted( ()=> {
      })
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
      }
    },  
}
</script>

<style lang='scss' scoped>
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
          background-color: rgba(0, 0, 0, .1);
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
