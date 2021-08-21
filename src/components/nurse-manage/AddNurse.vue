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

          <a-form-model-item label="Joined Date">
            <a-date-picker v-model="nurseForm.joined_date" style="width: 100%"></a-date-picker>
          </a-form-model-item>

          <a-form-model-item label="National ID(NIC)" has-feedback>
            <a-input v-model="nurseForm.NIC" placeholder="xxxxxxxxxV"></a-input>
          </a-form-model-item>

          <a-form-model-item has-feedback label="Age" prop="age">
            <a-input v-model.number="nurseForm.age" placeholder="Age" />
          </a-form-model-item>

          <a-form-model-item label="Gender">
            <a-select v-model="nurseForm.gender" placeholder="select gender">
              <a-select-option value="Female">Female</a-select-option>
              <a-select-option value="Male">Male</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="Phone No">
            <a-input v-model = "nurseForm.phone_no" placeholder=" XXXXXXXXXX" ></a-input>
          </a-form-model-item>

          <a-form-model-item label="E-mail">
            <a-input v-model = "nurseForm.email" placeholder="abc@gmail.com"></a-input>
          </a-form-model-item>

          <a-form-model-item label="Nurse_type">
            <a-select v-model="nurseForm.nurse_type">
              <a-select-option value="Trainee">Trainee</a-select-option>
              <a-select-option value="Full-time">Full-time</a-select-option>
              <a-select-option value="Senior_Nurse">Senior-nurse</a-select-option>
              <a-select-option value="Volunteering">Volunteering</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="Working Hospital">
            <a-input v-model="nurseForm.working_hospital" placeholder="Ex: National Hospital, Colombo"></a-input>
          </a-form-model-item>

          <a-form-model-item label="Residencial Address">
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

          <a-form-item label="Shift" has-feedback validate-status="error" :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-select v-model="nurseForm.Shift" placeholder="select shift">
              <a-select-option value="General">
                General
              </a-select-option>
              <a-select-option value="Morining-shift">
                Morning shift
              </a-select-option>
              <a-select-option value="Evening-shift">
                Evening shift
              </a-select-option>
              <a-select-option value="Night-shift">
                Night shift
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="From" has-feedback validate-status="warning" :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-date-picker v-model="nurseForm.From" style="width: 100%" />
          </a-form-item>

          <a-form-item label="To" has-feedback validate-status="warning" :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-date-picker v-model="nurseForm.To" style="width: 100%" />
          </a-form-item>

          <a-form-item label="Special Note" :label-col="rightLabelCol" :wrapperCol="rightWrapCol">
            <a-input v-model="nurseForm.specialNote" type="textarea" placeholder="Type special notes about the schedule"></a-input>
          </a-form-item>
          
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
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('Please input the Nurse_ID'));
    //   } else {
    //     if (this.nurseForm.name !== '') {
    //       this.$refs.nurseForm.validateField('name');
    //     }
    //     callback();
    //   }
    // };
    // let validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('Please input the Name'));
    //   } else if (value !== this.nurseForm.nurse_no) {
    //     callback(new Error("Two inputs don't match!"));
    //   } else {
    //     callback();
    //   }
    // };
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
        nurse_no: [{ trigger: 'change' }],
        name: [{required: true, trigger: 'change' }],
        age: [{required: true, validator: checkAge, trigger: 'change' }],
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
          this.$http.post('http://localhost:8001/api/nurses/add', this.nurseForm).then(function (response){
            this.openNotificationSuccess("Nurse added successfully!", "Entry added");
            console.log(response);
          }
          );
        } else {//else means form validation is unsuccessful
          this.openNotificationUnsuccess("validation unsuccessful");
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
    max-width: 380px;
    min-width: 350px;
    margin-left: 100px;
    background-color: #d5d4d8;
    border-radius: 8px;
    color: gray;
  }
  .cardTitle{
    margin-left: 130px;
    font-family: Helvetica;
  }
  /* h5{
    color: gray;
    opacity: 0.9;
  } */
  .cardTimes{
    margin-left: 50px;
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