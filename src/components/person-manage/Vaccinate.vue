<template>
  <div class="container">
    <h4 class="mb-4">Vaccinate a Person</h4>
    <div class="row">
      <div class="col-6">
        <!-- Registration form -->
        <a-form-model
          ref="ruleForm"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
        >
          <!-- NIC Input -->
          <a-form-model-item has-feedback ref="nic" prop="nic">
            <a-input
              v-model="form.nic"
              placeholder="National Identity Card No (NIC)"
            >
              <a-tooltip
                slot="suffix"
                title="Can use valid national id card number (It can be 10 (with 'X' or 'V') or 12 digit number"
              >
                <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
              </a-tooltip>
            </a-input>
          </a-form-model-item>

          <a-form-model-item>
            <a-button type="primary" @click="onSubmit()">
                Find
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <a-divider />
        <div class="row">
          <div class="pl-3">
            <div class="row"><div class="col-6"><b>Serial No</b></div><div class="col-6 pl-4"><p>{{result.person.serialno}}</p></div></div>
            <div class="row"><div class="col-6"><b>Name</b></div><div class="col-6 pl-4"><p>{{result.person.name}}</p></div></div>
            <div class="row"><div class="col-6"><b>National ID</b></div><div class="col-6 pl-4"><p>{{result.person.nic}}</p></div></div>
            <div class="row"><div class="col-6"><b>Age</b></div><div class="col-6 pl-4"><p>{{result.person.age}}</p></div></div>
            <div class="row"><div class="col-6"><b>Gender</b></div><div class="col-6 pl-4"><p>{{result.person.gender}}</p></div></div>
            <div class="row"><div class="col-6"><b>Address</b></div><div class="col-6 pl-4"><p>{{result.person.address}}</p></div></div>
            <div class="row"><div class="col-6"><b>Important</b></div><div class="col-6 pl-4"><p>{{result.person.important}}</p></div></div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div v-for="vaccine in result.vaccine" :key="vaccine.id" class="vaccine-card m-1 p-3 rounded" style="background: #52c41a55; border: 2px solid #52c41a; color: #0d2900; width: 100px; height: 100px;">
            <p style="line-height: 10px; font-size: 12px">Vaccinated</p>
            <p style="line-height: 5px; font-size: 15px">{{vaccine.vaccine}}</p>
            <small style="line-height: 5px">{{vaccine.created_at}}</small>
          </div>
          <div class="vaccine-card m-1 p-3 rounded" style="background: #52c41a; border: 2px solid #52c41a; color: #ffffff; width: 100px; height: 100px;">
              <a-icon type="plus-circle" style="font-size: 65px" />
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  
  data() {
    let SLNICValidator = (rule, value, callback) => {
      const regex = new RegExp("^([0-9]{9}[x|X|v|V]|[0-9]{12})$");
      let result = regex.test(value);
      if (!result) {
        callback(new Error("Please valid NIC number again"));
      } else {
        callback();
      }
    };

    return {
      form: {
        nic: "",
      },
      result: {
        person: {
          nic: '',
          serialno: '',
          name: '',
          address: '',
          age: '',
          gender: ''
        },
        vaccine: {
          
        }
      },
      rules: {
        nic: [
          {
            required: true,
            message: "Please insert national ID card number",
            trigger: "blur",
          },
          { validator: SLNICValidator, trigger: "change" },
        ],
      },
    };
  },
  methods: {
      onSubmit() {
        axios.get("http://127.0.0.1:8000/api/person-vaccine/all/" + this.form.nic).then((response) => {
          this.result.person = response.data.person[0];
          this.result.vaccine = response.data.vaccine;
          console.log(this.result);
        });
      }
  }
};
</script>