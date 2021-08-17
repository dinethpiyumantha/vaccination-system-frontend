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
      </div>
      <div class="col-6"></div>
    </div>
  </div>
</template>

<script>
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
          alert('submit');
      }
  }
};
</script>

<style>
</style>