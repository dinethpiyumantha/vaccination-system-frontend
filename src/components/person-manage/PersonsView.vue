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
      <!-- <a-button type="primary" @click="showModal">
      Open Modal with customized footer
    </a-button>  -->
      <a-modal v-model="visible" title="Title" on-ok="handleOk">
        <template slot="footer">
          
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
          >
            Edit
          </a-button>
          <a-button
            key="submit"
            type="danger"
            :loading="loading"
            @click="handleOk"
          >
            Delete
          </a-button>
          <a-button key="back" @click="handleCancel"> Close </a-button>
        </template>
        
        <div class="row">
          <div class="col-8">
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

/**
 * Table Columns
 * with sort methods and filters
 */
const columns = [
  {
    title: "Serial No",
    dataIndex: "serialno",
    sorter: (a, b) => a.serialno.length - b.serialno.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "NIC",
    dataIndex: "nic",
    sorter: (a, b) => a.nic.length - b.nic.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    onFilter: (value, record) => record.gender.indexOf(value) === 0,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
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
      }, 3000);
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
    }
  },
};
</script>
