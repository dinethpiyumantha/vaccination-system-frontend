<template>
  <!--Nurse registration component-->
  <div>
    <!--form title-->
    <h3 class="mb-4">Add Nurse</h3>

    <!--form input items-->
    <a-form-model ref="ruleForm" :model="nurseForm"  :label-col="labelCol" :wrapperCol="wrapperCol" :rules="rules" v-bind="layout" >
      <div class="row">
        <div class="col-6">
          <!--form left side-->
          <a-form-model-item  has-feedback label="Nurse_ID" prop="nurse_no">
            <a-input v-model="nurseForm.nurse_no" type="text" placeholder="N_XX" />
          </a-form-model-item>

          <a-form-model-item has-feedback label="Name" prop="name">
            <a-input v-model="nurseForm.name" type="text" autocomplete="off" />
          </a-form-model-item>

          <a-form-model-item has-feedback label="Joined Date" prop="joined_date">
            <a-date-picker v-model="nurseForm.joined_date" style="width: 100%"></a-date-picker>
          </a-form-model-item>

          <a-form-model-item label="National ID(NIC)" has-feedback prop="NIC">
            <a-input v-model="nurseForm.NIC" placeholder="xxxxxxxxxV"></a-input>
          </a-form-model-item>

          <a-form-model-item has-feedback label="Age" prop="age">
            <a-input v-model.number="nurseForm.age" placeholder="Age" />
          </a-form-model-item>

          <a-form-model-item label="Gender" prop="gender" has-feedback>
            <a-select v-model="nurseForm.gender" placeholder="select gender" >
              <a-select-option value="Female">Female</a-select-option>
              <a-select-option value="Male">Male</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="Phone No" prop="phone_no" has-feedback>
            <a-input v-model = "nurseForm.phone_no" placeholder=" XXXXXXXXXX" ></a-input>
          </a-form-model-item>

          <a-form-model-item label="E-mail" prop="email" has-feedback>
            <a-input v-model = "nurseForm.email" placeholder="abc@gmail.com"></a-input>
          </a-form-model-item>

          <a-form-model-item label="Nurse_type" prop="nurse_type" has-feedback>
            <a-select v-model="nurseForm.nurse_type">
              <a-select-option value="Trainee">Trainee</a-select-option>
              <a-select-option value="Full-time">Full-time</a-select-option>
              <a-select-option value="Senior_Nurse">Senior-nurse</a-select-option>
              <a-select-option value="Volunteering">Volunteering</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="Working Hospital" prop="working_hospital" has-feedback>
            <a-input v-model="nurseForm.working_hospital" placeholder="Ex: National Hospital, Colombo"></a-input>
          </a-form-model-item>

          <a-form-model-item label="Residencial Address" prop="permanent_address" has-feedback>
            <a-input v-model="nurseForm.permanent_address" type="textarea" placeholder="Type Residencial address here"></a-input>
          </a-form-model-item>
        </div>

        <!--form right side-->
        <div class="col-6 pl-0">
          <!--shift timing card-->
          <div class="timeCard card p-2 " style="background-color: #F9F9F9">
            <h5 class="cardTitle" style="color: gray; opacity: 0.9;"><u>Shift Timings</u></h5><br>
            <strong>
            <div class="row"><div class="cardTimes"><span class="col-5">Morning Shift:</span><span class="col-7">7.00 am - 1.00 pm</span></div></div><br>
            <div class="row"><div class="cardTimes"><span class="col-5">Evening Shift:</span><span class="col-7">1.00 pm - 7.00 pm</span></div></div><br>
            <div class="row"><div class="cardTimes"><span class="col-5">Night Shift:</span><span class="col-7 ml-4">7.00 pm - 7.00 pm</span></div></div><br>
            </strong>
          </div><br>

          <a-form-model-item label="Shift" prop="Shift" has-feedback :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-select v-model="nurseForm.Shift" placeholder="select shift">
              <a-select-option value="General">
                General
              </a-select-option>
              <a-select-option value="Morning-shift">
                Morning shift
              </a-select-option>
              <a-select-option value="Evening-shift">
                Evening shift
              </a-select-option>
              <a-select-option value="Night-shift">
                Night shift
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="From" prop="From" has-feedback validate-status="warning" :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-date-picker v-model="nurseForm.From" style="width: 100%" />
          </a-form-model-item>

          <a-form-model-item label="To" prop="To" has-feedback validate-status="warning" :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-date-picker v-model="nurseForm.To" style="width: 100%" />
          </a-form-model-item>

          <a-form-model-item label="Special Note" :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-input v-model="nurseForm.specialNote" type="textarea" placeholder="Type special notes about the schedule"></a-input>
          </a-form-model-item>
          
          <!--form buttons-->
          <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
            <!--submit button-->
            <a-button type="primary" @click="submitForm()">
              Submit
            </a-button>
            <!--Reset button-->
            <a-button style="margin-left: 10px" @click="resetForm()">
              Reset
            </a-button>
          </a-form-model-item>
        </div>
      </div><!--row-->

    </a-form-model>
  </div>
</template>
<script>

export default {
  data() {
    //checkAge() function to validate Age input
    let checkPending;
    let checkAge = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error('Please input the age'));
      }
      checkPending = setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    //function to validate NIC
    let NICValidator = (rule, value, callback) => {
      const regex = new RegExp("^([0-9]{9}[x|X|v|V]|[0-9]{12})$");
      let result = regex.test(value);
      if(result){
        callback();
      }else{
        callback(new Error('Please enter valid NIC number'));
      }
    };
    //function to validate phone no
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
    //function to validate E-mail
    let emailValidator = (rule, value, callback) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let result = regex.test(value);
      if(result){
        callback();
      }else{
        callback(new Error('Please enter valid E-mail address'));
      }
    };

    return {
      labelCol: { span: 7},
      wrapperCol: { span: 12},
      rightLabelCol: { span: 3},
      rightWrapCol: { span: 11},
      nurseForm: {
            nurse_no: '',
            name: '',
            joined_date: '',
            NIC: '',
            age: '',
            gender: '',
            phone_no: '',
            email: '',
            nurse_type: '',
            working_hospital:'', 
            permanent_address: '',
            Shift: '',
            From: '',
            To: '',
            specialNote:'',
      },
      rules: {
        nurse_no: [{ required: true, trigger: 'change' }],
        name: [{required: true, trigger: 'change' }],
        age: [{required: true, validator: checkAge, trigger: 'change' }],
        joined_date: [{required: true, trigger: 'change' }],
        NIC: [{required: true, validator: NICValidator, trigger: 'change' }],
        gender: [{required: true, trigger: 'change' }],
        phone_no: [{required: true, validator: SLPhoneValidator, trigger: 'change' }],
        email: [{required: true, validator: emailValidator, trigger: 'change'}],
        nurse_type: [{required: true, trigger: 'change' }],
        working_hospital: [{required: true, trigger: 'change' }],
        permanent_address: [{required: true, trigger: 'change' }],
        Shift: [{required: true, trigger: 'change' }],
        To: [{required: true, trigger: 'change' }],
        From: [{required: true, trigger: 'change' }],

      },
      // layout: {
      //   labelCol: { span: 4 },
      //   wrapperCol: { span: 14 },
      // },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert('submit!');
          //POST form data into DB
          this.$http.post('http://127.0.0.1:8001/api/nurses/add', this.nurseForm).then(function (response){
            this.openNotificationSuccess("Nurse added successfully!", "Entry added");
            console.log(response);
            this.resetForm();
          }, (error)=> {
            this.openNotificationUnsuccess("insert unsuccessful" , "There can be another nurse with the same Nurse_no.");//server error
            console.log(error);
          });
        } else {//else means form validation is unsuccessful
          this.openNotificationUnsuccess("validation unsuccessful", "");
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      Object.assign(this.$data, this.$options.data.call(this));
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
      // this.clearForm();
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
  },
};
</script>


<style>

  .timeCard{
    max-width: 350px;
    min-width: 350px;
    margin-left: 30px;
    background-color: #d5d4d8;
    border-radius: 8px;
    color: gray;
  }
  .cardTitle{
    margin-left: 110px;
    font-family: Helvetica;
  }
  /* h5{
    color: gray;
    opacity: 0.9;
  } */
  .cardTimes{
    margin-left: 30px;
    opacity: 0.9;
  }
  span{
    font-family: Helvetica;
    font-size: 16px;
    font-style: strong;
  }
  a-input{
    border-color: black;
    background-color: red;
  }

</style>