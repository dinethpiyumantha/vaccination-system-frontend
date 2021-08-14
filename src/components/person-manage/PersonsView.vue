<template>
  <div>
    <!-- Table View -->
    <a-table
      :columns="columns"
      :data-source="data"
      @change="onChange"
      style="padding: 0px"
      :customRow="customRow"
    >
      <a-button slot="action" type="primary" shape="circle" @click="showModal"
        ><a-icon type="right" style="padding-bottom: 5px"
      /></a-button>
    </a-table>
    <!-- View Model -->
    <div>
      <a-modal v-model="visible" title="Person Details" on-ok="handleOk" :centered="true" width="700px">
        <template slot="footer">
          
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleUpdate"
          >
            Edit
          </a-button>
          <a-button
            key="submit"
            type="danger"
            :loading="loading"
            @click="handleDelete"
          >
            Delete
          </a-button>
          <a-button key="back" @click="handleCancel"> Close </a-button>
        </template>
        
        <div class="row">
          <div class="col-8">
            <div class="row"><div class="col-4"><b>Serial No</b></div><div class="col-8"><p>{{model.serialno}}</p></div></div>
            <div class="row"><div class="col-4"><b>Name</b></div><div class="col-8"><p>{{model.name}}</p></div></div>
            <div class="row"><div class="col-4"><b>National ID</b></div><div class="col-8"><p>{{model.nic}}</p></div></div>
            <div class="row"><div class="col-4"><b>Age</b></div><div class="col-8"><p>{{model.age}}</p></div></div>
            <div class="row"><div class="col-4"><b>Gender</b></div><div class="col-8"><p>{{model.gender}}</p></div></div>
            <div class="row"><div class="col-4"><b>Phone</b></div><div class="col-8"><p>{{model.phone}}</p></div></div>
            <div class="row"><div class="col-4"><b>Address</b></div><div class="col-8"><p>{{model.address}}</p></div></div>
            <div class="row"><div class="col-4"><b>District</b></div><div class="col-8"><p>{{model.district}}</p></div></div>
            <div class="row"><div class="col-4"><b>MOH Area</b></div><div class="col-8"><p>{{model.moh}}</p></div></div>
            <div class="row"><div class="col-4"><b>GN Area</b></div><div class="col-8"><p>{{model.gn}}</p></div></div>
            <div class="row"><div class="col-4"><b>Important</b></div><div class="col-8"><p>{{model.important}}</p></div></div>
          </div>
          <div class="col-4">
            <div class="card p-2">
              <h6>Vaccination</h6>
            </div>
          </div>
        </div>      
      </a-modal>
    </div>
  </div>
</template>

<script>
// Import libraries
import axios from "axios";
import 'vue-resource';

/**
 * Table Columns
 * with sort methods and filters
 */
const columns = [
  {
    title: "Serial No",
    dataIndex: "serialno",
    key: 'serialno',
    sorter: (a, b) => {
      let serialnoA = a.serialno.toUpperCase();
      let serialnoB = b.serialno.toUpperCase();
      if (serialnoA < serialnoB) {
        return -1;
      }
      if (serialnoA > serialnoB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: 'name',
    sorter: (a, b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "NIC",
    dataIndex: "nic",
    key: 'nic',
    sorter: (a, b) => {
      let nicA = a.nic.toUpperCase();
      let nicB = b.nic.toUpperCase();
      if (nicA < nicB) {
        return -1;
      }
      if (nicA > nicB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    key: 'age',
    sorter: (a, b) => a.age - b.age,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: 'gender',
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    onFilter: (value, record) => record.gender.indexOf(value) === 0,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: 'address',
    sorter: (a, b) => {
      let addressA = a.address.toUpperCase();
      let addressB = b.address.toUpperCase();
      if (addressA < addressB) {
        return -1;
      }
      if (addressA > addressB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "",
    key: "id",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}



export default {
  data() {
    /**
     * Data attributes
     */
    return {
      data: [],
      columns,
      loading: false,
      visible: false,
      model: {
        name: '',
        nic: '',
        age: '',
        gender: undefined,
        phone: '',
        address: '',
        district: undefined,
        moh: undefined,
        gn: undefined,
        serialno: '000',
        important: ''
      }
    };
  },
  created() {
    /**
     * Get all persons from database
     * using API request
     */
    axios.get("http://127.0.0.1:8000/api/person/all").then((response) => {
      this.data = response.data.results;
      console.log(this.data);
    });
  },
  methods: {
    onChange,
    showModal(e) {
      this.visible = true;
      console.log(e);
    },
    handleOk() {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 2000);
      
    },
    handleDelete() {
      /**
       * Call to delete a person by 
       * mouse event
       */
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
        this.showConfirm(); // for confirm delete operation, then delete
      }, 500);

    },
    handleUpdate() {
      
      this.loading = true;
      setTimeout(() => {
      this.visible = false;
      this.loading = false;
      this.$router.push({ path: `/update-person/`+this.model.id});
      }, 500);
    },
    handleCancel() {
      this.visible = false;
    },
    
    customRow(record) {
      return {
        on: {
          click: event => {
            /**
             * Can use event and record
             */
            this.model = record;
            this.showModal();
            console.log(event);
            console.log(this.model);
          }
        }
      };
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
    
    showConfirm() {
      this.$confirm({
        title: 'Do you want to delete these items?' + this.model.serialno + '('+this.model.id+')',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk: () => {
          this.$http.delete("http://127.0.0.1:8000/api/person/delete/" + this.model.id).then(
            function(response) {
              this.openNotificationSuccess('Successfully Deleted', 'Person'+ this.model.serialno +' record deleted.')
              this.data.splice((this.data.findIndex((e) => e === this.model)), 1);
              console.log(response);
            }, (error) => {
              this.openNotificationUnsuccess('Error', 'Person'+ this.model.serialno +' record cannot delete. Operation occured an error !');
              console.log(error);
            }
          );
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        },
      });
    },
  },
};
</script>
