<template>
    <div style="margin-left: 490px; margin-right: 458px; background-color: #F8F8F8;">
        <a-form layout="inline" style="padding: 20px;" :form="form" @submit="handleSubmit">

            <div style="background-color: #585858;  width: 300px;">
            <!-- Logo -->
            <img
                src="../assets/logo-white.png"
                class="logo"
                alt="logo"
                height="50px"
                style="background: none"
            />
            <!-- Name -->
            <span class="text-light" style="font-size: 19px; " v-if="!collapsed">Adminstrator Login</span>
            </div><br>

            <strong>Username</strong><br>
            <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
            <a-input
                style="width: 300px; "
                v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your username!' }] },
                ]"
                placeholder="Username"
                v-model="login.username"
            >
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
            </a-form-item><br><br>

            <strong>Password</strong><br>
            <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
            <a-input
                style="width: 300px; "
                v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
                ]"
                type="password"
                placeholder="Password"
                v-model="login.password"
            >
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25) padding-bottom: 9px;" />
            </a-input>
            </a-form-item><br><br>

            <a-form-item>
            <a-button style="width: 300px; height: 40px; " type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
                Log in
            </a-button>
            </a-form-item><br>

            <a-form-item>
                <router-link to="/">Forgot your password?</router-link>
                <br/>
                <router-link to="/SignUp">Create an account</router-link>
            </a-form-item>
        </a-form>
    </div>

</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      login: {
        username: '',
        password: ''
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$http.post('http://127.0.0.1:8000/api/uservalidate', this.login).then(function (response) { 
            console.log(response);
            if(response.bodyText == '[]') {
              alert('Error');
            } else {
              document.cookie = response.bodyText;
              this.$router.push('/');
              location.reload();
            }
          }, (error) => {
            console.log(error);
          });
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>