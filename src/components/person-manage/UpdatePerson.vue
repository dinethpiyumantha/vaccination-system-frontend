<template>
<!-- Person registration component -->
<div>
  <h4 class="mb-4">Register a New Person</h4>

  <!-- Registration form -->
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
<!-- Name Input -->
    <a-form-model-item label="Name">
      <a-input v-model="form.name" :disabled="!updatable"/>
    </a-form-model-item>
<!-- NIC Input -->
    <a-form-model-item label="National ID (NIC)">
      <a-input v-model="form.nic" :disabled="!updatable"/>
    </a-form-model-item>
    <!-- Age Input -->
    <a-form-model-item label="Age">
      <a-input v-model="form.age" :disabled="!updatable"/>
    </a-form-model-item>
    <!-- Gender Selection Input -->
    <a-form-model-item label="Gender">
      <a-select v-model="form.gender" placeholder="Please select gender">
        <a-select-option value="male">
          Female
        </a-select-option>
        <a-select-option value="female">
          Male
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- Phone Number Input -->
    <a-form-model-item label="Phone No">
      <a-input v-model="form.phone" />
    </a-form-model-item>
    <!-- District Selection Input -->
    <a-form-model-item label="District">
      <a-select v-model="form.district" placeholder="Please select district">
        <a-select-option v-for="dis in districts" :key="dis">
          {{ dis }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- MOH Area Selection Input -->
    <a-form-model-item label="MOH area">
      <a-select v-model="form.moh" placeholder="Please select MOH area">
        <a-select-option value="male">
          Female
        </a-select-option>
        <a-select-option value="female">
          Male
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- GN Area Selection Input -->
    <a-form-model-item label="GN area">
      <a-select v-model="form.gn" placeholder="Please select GN area">
        <a-select-option value="male">
          Female
        </a-select-option>
        <a-select-option value="female">
          Male
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- Serial No Input -->
    <a-form-model-item label="Serial No">
      <a-input v-model="form.serial" placeholder="Searial no in the register" :disabled="true"/>
    </a-form-model-item>
    <!-- Important Details Input Text Area -->
    <a-form-model-item label="Important">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    
    <!-- Buttons -->
    <a-form-model-item v-if="!updatable" :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="updateChange()">
        Edit
      </a-button>
      <a-button style="margin-left: 10px;">
        Back
      </a-button>
    </a-form-model-item>
    <a-form-model-item v-if="updatable" :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="updateChange()">
        Save
      </a-button>
      <a-button style="margin-left: 10px;" @click="updateChange()">
        Cancel
      </a-button>
      <a-button style="margin-left: 10px;">
        Back
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>


<script>
// Import local data files
import LocalData from '../../assets/data.json';

/**
 * - all data attributes in the form attribute are use for post data
 */
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      updatable: false,
      districts : LocalData.data.districts,
      form: {
        name: '',
        nic: '',
        age: '',
        gender: undefined,
        phone: '',
        district: undefined,
        gn: undefined,
        serial: '',
        desc: '',
      },
    };
  },
  methods: {
    onSubmit() {
      /**
       * when click on submit, execute this function
       */
      console.log('submit!', this.form);
    },
    updateChange() {
      this.updatable = !this.updatable;
    }
  },
};
</script>
