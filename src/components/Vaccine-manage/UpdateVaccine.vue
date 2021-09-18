<template>
  <!-- Vaccine registration -->
  <div>
    <h4 class="mb-4">Update Vaccine</h4>

    <!-- Data Insert form -->
    <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
      


       <!-- Vaccine Stock Number -->
      <a-form-model-item label="Vaccine Stock No">
        <a-input v-model="form.stockno" placeholder="Vaccine stock number" :disabled="true"/>
      </a-form-model-item>


      <!-- Vaccine Name Input -->
      <a-form-model-item label="Vaccine Name" ref="name" prop="name">
        <a-input v-model="form.name" placeholder="Enter vaccine name" :disabled="true"/>
      </a-form-model-item>

      <!-- Made Country Selection Input -->
      <a-form-model-item label="Made Country"  ref="country" prop="country">
        <a-select v-model="form.country" placeholder="Please select the vaccine origin" :disabled="true">
          <a-select-option v-for="country in countries" :key="country">
            {{ country }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <!-- Delivered Agent Input -->
      <a-form-model-item label="Delivered Agent"  ref="agent" prop="agent">
        <a-select v-model="form.agent" placeholder="Please select the vaccine delivered agent" :disabled="true">
          <a-select-option v-for="agent in agents" :key="agent">
            {{ agent }}
          </a-select-option>
        </a-select>
      </a-form-model-item>


       <!-- Quantity Input -->
      <a-form-model-item label="Stock Quantity"  ref="quantity" prop="quantity">
        <a-input v-model="form.quantity" placeholder="Enter stock amount in digits" type="number" :disabled="true">
         <a-tooltip slot="suffix" title="Insert only a positive whole number">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
        </a-input>
      </a-form-model-item>


    <!--Arrival Date input -->
    

    <a-form-model-item label="Vaccine Stock Arrival Date" required prop="arr_date" >
      <a-date-picker
        v-model="form.arr_date"
        type="date"
        valueFormat="YYYY-MM-DD"
        placeholder="Pick vaccine stock arrival date"
        :disabled="true"
        style="width: 100%;"
      />
    </a-form-model-item>

    <!--Manufactured Date input -->

     <a-form-model-item label="Manufactured Date" required prop="mfd">
      <a-date-picker
        v-model="form.mfd"
        type="date"
        valueFormat="YYYY-MM-DD"
        placeholder="Pick manufactured date"
        :disabled="true"
        style="width: 100%;"
      />
    </a-form-model-item>

    <!-- Expiry Date input -->
    <a-form-model-item label="Expiry Date" required prop="exp">
      <a-date-picker
        v-model="form.exp"
        type="date"
        valueFormat="YYYY-MM-DD"
        placeholder="Pick expiry date"
        style="width: 100%;"
      />
    </a-form-model-item>

      <!-- Stored Lab Selection Input -->
      <a-form-model-item label="Storing Lab"  ref="lab" prop="lab">
        <a-select v-model="form.lab" placeholder="Please select the vaccines storing lab">
          <a-select-option v-for="lab in labs" :key="lab">
            {{ lab }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

     <!-- Lab Contact Number Input -->
      <a-form-model-item label="Lab Contact Number" has-feedback ref="lab_contact" prop="lab_contact">
        <a-input v-model="form.lab_contact" placeholder="Enter lab contact number">
          <a-tooltip slot="suffix" title="Phone number can enter with country code or without it">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
        </a-input>
      </a-form-model-item>

 


      <!-- Compositio and other Vaccine's details input text area -->
      <a-form-model-item label="Other Details">
        <a-input v-model="form.description" type="textarea" placeholder="Enter other information">
          <a-tooltip slot="suffix" title="Other Details">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-form-model-item>

     <!-- Buttons -->
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit()">
        Update
      </a-button>
      <a-button style="margin-left: 10px;" @click="redirectToView()">
        Cancel
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>



<script>
// Import local data files
import LocalData from '../../assets/vaccineData.json';
import 'vue-resource';

/**
 * - all data attributes in the form attribute are use for post data
 */
export default {
  data() {
    /**
     * Custom validation rules
     */
  
    let LabContactValidator = (rule, value, callback) => {
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

    // Data attributes/models
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      updatable: false,
      countries : LocalData.data.country,
      agents : LocalData.data.agent,
      labs : LocalData.data.lab,
      form: {
        stockno: 'N/A',
        name: '',
        country: undefined,
        agent: undefined,
        quantity: '',
        arr_date:undefined,
        mfd:undefined,
        exp:undefined,
        lab: undefined,
        lab_contact: '',    
        description: ''
      },
      /**
       * Validation rules assign to props
       */
      rules: {
        name: [{required: true, message: 'Please insert the vaccine name', trigger: 'blur',},],
        country: [{required: true, message: 'Please select the country of origin', trigger: 'blur',},],
        agent: [{required: true, message: 'Please select the vaccine deleivery agent', trigger: 'blur',},],
        quantity: [{required: true, message: 'Please insert the vaccine stock quantity', trigger: 'blur',},],
        arr_date: [{ required: true, message: 'Please pick a stock arrival date', trigger: 'change' }],
        mfd: [{ required: true, message: 'Please pick a manufactured date', trigger: 'change' }],
        exp: [{ required: true, message: 'Please pick an expiry date', trigger: 'change' }],
        lab: [{required: true, message: 'Please select the lab', trigger: 'blur',},],
        lab_contact:[{required: true, message: 'Please insert a valid lab contact number', trigger: 'blur',},
                  {validator: LabContactValidator, trigger: 'change'}]
     
      }
    };
  },

   created() {
    this.$http.get('http://127.0.0.1:8000/api/vaccine/get/'+this.$route.params.id).then(function (response) {
      this.form = response.data.vaccine;
      console.log(response.data.vaccine);
    });
  },
  methods: {
    onSubmit() {
      /**
       * post form data into the database
       * first validate all the fields and post with API request,
       * accoding to the response show notification
       */
    this.$confirm({
        title: 'Are you sure?',
        content: 'Do you really want to update this vaccine stock\'s details?',
        onOk: () => {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.$http.put('http://localhost:8000/api/vaccine/update/'+this.$route.params.id, this.form).then(function (response) { 
                this.openNotificationSuccess("Successful !", " Vaccines Stock-No : "+ this.form.stockno +" Record Updated Successfully.");
                this.$router.push({ path: `/vaccine`});
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
      this.$router.push({ path: `/vaccine`});
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

    serialNoGenerate() {
      /**
       * Genarate a serial no
       */
      let tempSerial = 'N/A';
      if (this.form.name.length >= 3) {
        tempSerial = 'CoVac19'+this.form.name.slice(0, 2) + this.form.quantity.slice(0,1) +  this.form.country.slice(0,1);
      }
      else if (this.form.name.length == 12) {
        tempSerial = 'CoVac19'+this.form.name.slice(0, 2) + this.form.quantity.slice(0,1);
      }
    
      this.form.stockno = tempSerial.toUpperCase();
    },
  },
  computed: {
    
  }
};
</script>
