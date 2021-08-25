<template>
   <div>
   <h1>All Vaccines</h1>
   
    <div class="row px-3 my-4">
      <!-- Search input and Filter dropdowns -->
      <!-- Search -->
      <a-input-search
        placeholder="Search a vaccine"
        style="width: 320px; margin: 0 10px 0 0"
        v-model="search"
        @search="onSearch"
      />

     
</div>
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


       <!-- Model -->
    <div>
      <a-modal v-model="visible" :title="model.stockno+' - '+model.name + ' Vaccines\' Details'" on-ok="handleOk" :centered="true" width="700px">
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

        <div>
          <p><b>Vaccine Stock ID :  </b>{{model.stockno}}</p>
          <p><b>Vaccine Name :  </b>{{model.name}}</p>
          <p><b>Made-In :  </b>{{model.country}}</p>
          <p><b>Agent :  </b>{{model.agent}}</p>
          <p><b>Quantity :  </b>{{model.quantity}}</p>
          <p><b>Arrival Date :  </b>{{model.arr_date}}</p>
          <p><b>Manufactured Date :  </b>{{model.mfd}}</p>
          <p><b>Expiry Date :  </b>{{model.exp}}</p>
          <p><b>Stored Lab :  </b>{{model.lab}}</p>
          <p><b>Laboratory Contact No :  </b>{{model.lab_contact}}</p>
          <p><b>Description :  </b>{{model.description}}</p>
        </div>
      

      </a-modal>
    </div>
  </div>
    

</template>



<script>

// Import libraries
import axios from "axios";
import 'vue-resource';



const columns = [
  {
    title:'Vaccine Stock ID',
    dataIndex:'stockno',
   sorter: (a, b) => {
      let StockA= a.stockno.toUpperCase();
      let StockB = b.stockno.toUpperCase();
      if (StockA < StockB) {
        return -1;
      }
      if (StockA > StockB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },

  {
    title:'Vaccine Name',
    dataIndex:'name',
    sorter: (a, b) => {
      let VaccineA = a.name.toUpperCase();
      let VaccineB = b.name.toUpperCase();
      if (VaccineA < VaccineB) {
        return -1;
      }
      if (VaccineA > VaccineB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],

  },

   {
    title:'Made-In',
     dataIndex:'country',
    filters: [
      { text: "China", value: "China" },
      { text: "UK", value: "UK" },
      { text: "USA", value: "USA" },
      { text: "France", value: "France" },
      { text: "India", value: "India" },
      { text: "Pakistan", value: "Pakistan" },
      { text: "Russia", value: "Russia" },
       { text: "Germany", value: "Germany" },
     
    ],
    onFilter: (value, record) => record.country.indexOf(value) === 0,

  },

  {
    title:'Stored Lab',
     dataIndex:'lab',
   filters: [
      { text: "State Pharmaceuticals Corporation of Sri Lanka", value: "State Pharmaceuticals Corporation of Sri Lanka" },
      { text: "Battramulla National Covid Vaccine laboratory", value: "Battramulla National Covid Vaccine laboratory" },
      { text: "Sri Lanka Ayurvedic Department", value: "Sri Lanka Ayurvedic Department" },
     
    ],
    onFilter: (value, record) => record.lab.indexOf(value) === 0,
  },

 
  {
    title:'Arrival Date',
     dataIndex:'arr_date',

     sorter: (a, b) => {
      let dateA = a.arr_date;
      let dateB = b.arr_date;
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  
  },

   {
    title:'Expiry Date',
     dataIndex:'exp',

      sorter: (a, b) => {
      let dateA = a.exp;
      let dateB = b.exp;
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  
   
    
  },

   {
    title:'Quantity',
     dataIndex:'quantity',
     sorter: (a, b) => a.quantity - b.quantity,
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

  data(){
    return{
        data: [],
        columns,
        loading: false,
        visible: false,
        model:{
          search: '',
        }
    }
  },

   created() {
    /**
     get all vaccine details from API*/

    axios.get("http://127.0.0.1:8000/api/vaccine/all").then((response) => {
      this.data = response.data.results;
      console.log(this.data);
    });
  },

  methods:{
    onChange,
     showModal(e) {
          this.visible = true;
          console.log(e);
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
  },

}
</script>

<style>

</style>