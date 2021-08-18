<template>
   <div>
   <h1>All Vaccines</h1>

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
      <a-modal v-model="visible" title="Vaccine Details" on-ok="handleOk" :centered="true" width="700px">
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
          <p><b>Vaccine Stock ID :  </b>{{model.id}}</p>
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


const columns = [
  {
    title:'Vaccine Stock ID',
    dataIndex:'id',
    sorter: (a, b) => a.id - b.id,
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
     
    ],
    onFilter: (value, record) => record.country.indexOf(value) === 0,

  },

  {
    title:'Stored Lab',
     dataIndex:'lab',
    sorter: (a, b) => {
      let labA = a.name.toUpperCase();
      let labB = b.name.toUpperCase();
      if (labA < labB) {
        return -1;
      }
      if (labA > labB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },

 
  {
    title:'Arriaval Date',
     dataIndex:'arr_date',
   
  },

   {
    title:'Expiary Date',
     dataIndex:'exp',
   
    
  },

   {
    title:'Quantity',
     dataIndex:'quantity',
     sorter: (a, b) => a.id - b.id,
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
        model:{}
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
  }

}
</script>

<style>

</style>