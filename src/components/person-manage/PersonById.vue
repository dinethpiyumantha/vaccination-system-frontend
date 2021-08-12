<template>
<div class="row">
  <div class="col-8">
  <h4 class="mb-4">Register a New Person</h4>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" style="padding: 0px;">
    <a-form-model-item label="Name">
      <a-input v-model="form.name" :disabled="!updatable"/>
    </a-form-model-item>
    <a-form-model-item label="National ID (NIC)">
      <a-input v-model="form.nic" :disabled="!updatable"/>
    </a-form-model-item>
    <a-form-model-item label="Age">
      <a-input v-model="form.nic" :disabled="!updatable"/>
    </a-form-model-item>
    <a-form-model-item label="Gender">
      <a-select v-model="form.region" placeholder="Please select gender">
        <a-select-option value="male">
          Female
        </a-select-option>
        <a-select-option value="female">
          Male
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Phone No">
      <a-input v-model="form.nic" />
    </a-form-model-item>
    <a-form-model-item label="District">
      <a-select v-model="form.region" placeholder="Please select district">
        <a-select-option value="male">
          Female
        </a-select-option>
        <a-select-option value="female">
          Male
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="MOH area">
      <a-select v-model="form.region" placeholder="Please select MOH area">
        <a-select-option value="male">
          Female
        </a-select-option>
        <a-select-option value="female">
          Male
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="GN area">
      <a-select v-model="form.region" placeholder="Please select GN area">
        <a-select-option value="male">
          Female
        </a-select-option>
        <a-select-option value="female">
          Male
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Serial No">
      <a-input v-model="form.nic" placeholder="Searial no in the register" :disabled="true"/>
    </a-form-model-item>
    <a-form-model-item label="Activity type">
      <a-checkbox-group v-model="form.type">
        <a-checkbox value="1" name="type">
          Online
        </a-checkbox>
        <a-checkbox value="2" name="type">
          Promotion
        </a-checkbox>
        <a-checkbox value="3" name="type">
          Offline
        </a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="Feedback">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
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
  <div class="col-4"></div>
</div>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      updatable: false,
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    updateChange() {
      this.updatable = !this.updatable;
    }
  },
};
</script>
