<template>
  <!-- Person registration component -->
  <div>
    <h4 class="mb-4">SignUp</h4>

    <!-- Registration form -->
    <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" :onFieldsChange="whenFieldChanged()">
      
      <!-- Name Input -->
      <a-form-model-item label="Name" ref="name" prop="name">
        <a-input v-model="form.name"/>
      </a-form-model-item>

      <!-- NIC Input -->
      <a-form-model-item label="National ID (NIC)" has-feedback ref="nic" prop="nic">
        <a-input v-model="form.nic">
          <a-tooltip slot="suffix" title="Can use valid national id card number (It can be 10 (with 'X' or 'V') or 12 digit number">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-form-model-item>

      <!-- Gender Selection Input -->
      <a-form-model-item label="Gender" ref="gender" prop="gender">
        <a-select v-model="form.gender" placeholder="Please select gender">
          <a-select-option value="male">
            Male
          </a-select-option>
          <a-select-option value="female">
            Female
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <!-- Age Input -->
      <a-form-model-item label="Age"  ref="age" prop="age">
        <a-input v-model="form.age"/>
      </a-form-model-item>

      <!-- Phone Number Input -->
      <a-form-model-item label="Phone No" has-feedback ref="phone" prop="phone">
        <a-input v-model="form.phone">
          <a-tooltip slot="suffix" title="Phone number can enter with contry code or without it">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
        </a-input>
      </a-form-model-item>


            <!-- Role Selection Input -->
      <a-form-model-item label="Role" ref="role" prop="role">
        <a-select v-model="form.role" placeholder="Please select the role">
          <a-select-option value="Doctor">
            Doctor
          </a-select-option>
          <a-select-option value="Nurse">
            Nurse
          </a-select-option>
           <a-select-option value="Medical-Officer">
            Medical-Officer
          </a-select-option>
        </a-select>
      </a-form-model-item>

      
      <!-- User ID -->
      <a-form-model-item label="User Name">
        <a-input v-model="form.userId" placeholder="userId" :disabled="true"/>
      </a-form-model-item>


            <!-- password Input -->
      <a-form-model-item label="Password" has-feedback ref="pwd1" prop="pwd1">
        <a-input-password v-model="form.pwd1">
           <a-tooltip slot="suffix" title="Minimum eight characters, at least one letter, one number and one special character:">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
        </a-input-password>
      </a-form-model-item>

       <!-- Retype password Input -->
      <a-form-model-item label="Re-Enter Password" has-feedback ref="pwd2" prop="pwd2">
        <a-input-password v-model="form.pwd2">
           <a-tooltip slot="suffix" title="Enter previously entered password">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
        </a-input-password>
      </a-form-model-item>





      <!-- Buttons -->
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit()">
          Register
        </a-button>
        <a-button style="margin-left: 10px;" @click="clearForm()">
          Clear
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>


<script>
// Import local data files
//import LocalData from '../../assets/data.json';

/**
 * - all data attributes in the form attribute are use for post data
 */
export default {
  data() {
    /**
     * Custom validation rules
     */
    let SLNICValidator = (rule, value, callback) => {
      const regex = new RegExp("^([0-9]{9}[x|X|v|V]|[0-9]{12})$");
      let result = regex.test(value);
      if (!result) {
        callback(new Error('Please valid NIC number again'));
      } else {
        callback();
      }
    };
    let SLPhoneValidator = (rule, value, callback) => {
      const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
      let result = regex.test(value);
      if (!result) {
        callback(new Error('Please input valid phone number again'));
      } else if (value === ''){
        callback();
      } else {
        callback();
      }
    };
     let passwordValidator = (rule, value, callback) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      let result = regex.test(value);
      if (!result) {
        callback(new Error('Please input a valid password with minimum eight characters, at least one letter, one number and one special character:'));
      } else if (value === ''){
        callback();
      } else {
        callback();
      }
    };

    let pwdCompare = (rule, value, callback) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      let result = regex.test(value);
      if (!result) {
        callback(new Error('Please retype the same password'));
      } else if (value === ''){
        callback();
      } else if(!(this.form.pwd1===this.form.pwd2)){
         callback(new Error('Please retype the same password'));
      }else {
        callback();
      }
    }

    // Data attributes/models
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      updatable: false,
    
      form: {
        name: '',
        nic: '',
        gender: undefined,
        age: '',
        phone: '',
        role: undefined,
        userId: 'N/A',
        pwd1:'',
        pwd2:''
      },
      /**
       * Validation rules assign to props
       */
      rules: {
        name: [{required: true, message: 'Please insert person name', trigger: 'blur',},],
        nic: [{required: true, message: 'Please insert national ID card number', trigger: 'blur',},
              {validator: SLNICValidator, trigger: 'change'}],
        gender: [{required: true, message: 'Please select gender', trigger: 'blur',},],
        age: [{required: true, message: 'Please insert age (This will automatically calculate with NIC)', trigger: 'blur',},],
        phone: [{validator: SLPhoneValidator, trigger: 'change'}],
        role: [{required: true, message: 'Please select the role', trigger: 'blur',},],
        pwd1: [{required: true,validator: passwordValidator, trigger: 'change',},],
        pwd2: [{required: true,validator: pwdCompare, trigger: 'change',},],
       
      }
    };
  },
  methods: {

   
    onSubmit() {
      /**
       * post form data into the database
       * first validate all the fields and post with API request,
       * accoding to the response show notification
       */
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http.post('http://localhost:8000/api/admin/add', this.form).then(function (response) { 
        this.openNotificationSuccess("Successfully Added !", "Entry added");
        console.log(response);
      }, (error) => {
        this.openNotificationUnsuccess("Unsuccess !", "Entry added1");
        console.log(error);
      });
        } else {
          this.openNotificationUnsuccess("Unsuccess !", "Entry added2");
          console.log('error submit!!');
          return false;
        }
      });
    },
    whenFieldChanged() {
      if(this.form.nic == '' || this.form.gender === undefined) {
        console.log('No NIC or Gender');
      }
      else {
        this.birthDayExtractorI();
        this.serialNoGenerate();
        console.log('Have NIC or Gender');
      }
    },
    openNotificationSuccess(message, description) {
      /**
       * Notification toast success
       */
      this.$notification.open({
        message: message,
        duration: 5,
        icon: <a-icon type="like" theme="filled" style="color: #27ae60"/>,
        description:
          description,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      this.clearForm();
    },
    openNotificationUnsuccess(message, description) {
      /**
       * Notification toast unsuccess
       */
      this.$notification.open({
        message: message,
        duration: 8,
        icon: <a-icon type="dislike" theme="filled" style="color: #c0392b"/>,
        description:
          description,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    },
    clearForm() {
      /**
       * Clear form
       */
      Object.assign(this.$data, this.$options.data.call(this));
    },
    birthDayExtractorI() {
      /**
       * Extract age from NIC
       */
      let tempAge = '';
      if (this.form.nic.length == 10) {
        tempAge = new Date().getFullYear() - ('19'+this.form.nic.slice(0, 2));
      }
      else if (this.form.nic.length == 12) {
        tempAge = new Date().getFullYear() - this.form.nic.slice(0, 4);
      }
      this.form.age = tempAge;
    },
    serialNoGenerate() {
      /**
       * Genarate a serial no
       */
      let userId = 'N/A';
      if (this.form.nic.length == 10) {
        userId = 'User'+this.form.nic.slice(0, 11);
      }
      else if (this.form.nic.length == 12) {
        userId = 'User'+this.form.nic.slice(0, 13);
      }
      this.form.userId = userId.toUpperCase();
    },

    
  },
  computed: {
    
  }
};
</script>
