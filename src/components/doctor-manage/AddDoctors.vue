<template>
<div>
  <h4 class="mb-4">Register a New Doctor</h4>
  
  <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
    
    <a-form-model-item label="Full Name" ref="nameFull" prop="nameFull">
      <a-input v-model="form.nameFull"/>
    </a-form-model-item>

    <a-form-model-item label="SLMC number" ref="slmcNo" prop="slmcNo">
      <a-input v-model="form.slmcNo"/>
    </a-form-model-item>

    <a-form-model-item label="Hospital" ref="hospital" prop="hospital">
      <a-input v-model="form.hospital"/>
    </a-form-model-item>

    <a-form-model-item label="Home Address" ref="address" prop="address">
      <a-input v-model="form.address"/>
    </a-form-model-item>

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

    <a-form-model-item label="Phone No" has-feedback ref="phoneNo" prop="phoneNo">
      <a-input v-model="form.phoneNo">
        <a-tooltip slot="suffix" title="Phone number can enter with contry code or without it">
        <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
      </a-tooltip>
      </a-input>
    </a-form-model-item>

    <a-form-model-item label="Marital Status"  ref="maritalStatus" prop="maritalStatus">
      <a-select v-model="form.maritalStatus" placeholder="Please select marital status">
        <a-select-option value="married">
          Married
        </a-select-option>
        <a-select-option value="unmarried">
          Unmarried
        </a-select-option>
      </a-select>
    </a-form-model-item>

     <a-form-model-item label="Registration Date to System">
      <a-date-picker  v-model="form.date" @change="onChange" />
    </a-form-model-item>

     <a-form-model-item label="Appointed Venue"  ref="venue" prop="venue">
      <a-input v-model="form.venue"/>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit()">
        Register
      </a-button>
      <a-button style="margin-left: 10px;" @click="clearForm()">
        Cancel
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>


<script>


export default {
  data() {

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
    }

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      updatable: false,
      form: {
        nameFull: '',
        slmcNo: '',
        hospital: '',
        address: '',
        gender: undefined,
        phoneNo: '',
        maritalStatus: undefined,
        date: undefined,
        venue: ''
      },

      rules: {
        nameFull: [{required: true, message: 'Please insert person name', trigger: 'blur',},],
        slmcNo: [{required: true, message: 'Please insert SLMC number', trigger: 'blur',},],
        hospital: [{required: true, message: 'Please insert current hospital', trigger: 'blur',},],
        address: [{required: true, message: 'Please insert address', trigger: 'blur',},],
        gender: [{required: true, message: 'Please select gender', trigger: 'blur',},],
        phoneNo: [{validator: SLPhoneValidator, trigger: 'change'}],
        date: [{required: true, message: 'Please insert the date of registering', trigger: 'blur',},],
        venue: [{required: true, message: 'Please insert appointed vaccination place', trigger: 'blur',},],
      }

    };
  },
  methods: {
    onSubmit() {
       this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http.post('http://localhost:8000/api/doctor/add', this.form).then(function (response) { 
        this.openNotificationSuccess("Successfully Added !", "Entry added");
        console.log(response);
      }, (error) => {
        this.openNotificationUnsuccess("Unsuccess !", "Server error : "+ error.status + "  " + error.statusText);
        console.log(error);
      });
        } else {
          this.openNotificationUnsuccess("Unsuccess !", "Validation Error");
          console.log('error submit!!');
          return false;
        }
      });
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
  },
  computed: {
    
  }
};
</script>
