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
        :data-source="searchResult"
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
        hello: 'Hello',
        data: [],
        columns,
        loading: false,
        visible: false,
        search: '',
        model:{
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
      this.$router.push({ path: `/update-vaccine/`+this.model.id});
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
        title: 'Do you want to delete this ' + this.model.stockno + '('+this.model.id+')' +' vaccine stock details?',
        content: 'Press OK button to Confirm',
        onOk: () => {
          this.$http.delete("http://127.0.0.1:8000/api/vaccine/delete/" + this.model.id).then(
            function(response) {
              this.openNotificationSuccess('Successfully Deleted', 'Vaccine'+ this.model.stockno +' record deleted.')
              this.data.splice((this.data.findIndex((e) => e === this.model)), 1);
              console.log(response);
            }, (error) => {
              this.openNotificationUnsuccess('Error', 'Vaccine'+ this.model.stockno +' record cannot delete. Operation occured an error !');
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

  computed: {
    searchResult: function() {
      return this.data.filter((item)=> {
          return (item.stockno.toLowerCase().match(this.search.toLowerCase()) || item.name.toLowerCase().match(this.search.toLowerCase())
          ||item.country.toLowerCase().match(this.search.toLowerCase()) ||item.lab.toLowerCase().match(this.search.toLowerCase())
           || item.arr_date.toLowerCase().match(this.search.toLowerCase())|| item.exp.toLowerCase().match(this.search.toLowerCase())
           ||item.quantity.toString().match(this.search.toString()));
      });
    },
  }
  }


</script>
<style >

</style>
