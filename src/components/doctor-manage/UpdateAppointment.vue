<template>
<!-- Doctor registration component -->
<div>
  <h4 class="mb-4">Update Appointment</h4>

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

    <a-form-model-item label="Phone No" has-feedback ref="phoneNo" prop="phoneNo">
      <a-input v-model="form.phoneNo">
        <a-tooltip slot="suffix" title="Phone number can enter with contry code or without it">
        <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
      </a-tooltip>
      </a-input>
    </a-form-model-item>

     <a-form-model-item label="Appointment Date Prefered">
      <a-date-picker  v-model="form.date" @change="onChange" />
    </a-form-model-item>

     <a-form-model-item label="Appointed Venue"  ref="venue" prop="venue">
      <a-input v-model="form.venue"/>
    </a-form-model-item>

    <a-form-model-item label="Reason to change the appointment"  ref="reason" prop="reason">
      <a-input v-model="form.reason"/>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit()">
        Update
      </a-button>
      <a-button style="margin-left: 10px;" @click="clearForm()">
        Cancel
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>


<script>
        /**
         * Phone number validatoion
         */
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
        maritalStatus: '',
        date: undefined,
        venue: '',
        reason: ''
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
        reason: [{required: true, message: 'Please write the reason here', trigger: 'blur',},],
      }
    };
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/appointment/get/'+this.$route.params.id).then(function (response) {
      this.form = response.data.appointment;
      console.log(response.data.appointment);
    });
  },
        /**
         * Submit method
         */
  methods: {
    onSubmit() {
      /**
       * post form data into the database
       * first validate all the fields and post with API request,
       * accoding to the response show notification
       */
      this.$confirm({
        title: 'Are you sure?',
        content: 'Do you really want to update these item?',
        onOk: () => {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.$http.put('http://localhost:8000/api/appointment/update/' +this.$route.params.id, this.form).then(function (response) { 
                this.openNotificationSuccess("Successfull !", "SLMC No : "+ this.form.serialno +" Record updated successfully.");
                this.$router.push({ path: `/appointments`});
                console.log(response);
              }, (error) => {
                this.openNotificationUnsuccess("Server Error !", error.status + " " + error.statusText);
                console.log(error);
              });
            } else {
              this.openNotificationUnsuccess("Unsuccess !", "Please fill all required fields with valid details..");
              console.log('error submit!');
              return false;
            }
          });
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        },
      });
    },
    redirectToView() {
      this.$router.push({ path: `/appointments`});
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