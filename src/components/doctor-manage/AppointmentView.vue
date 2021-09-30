<template>
  <div>
    <h3>Appointments</h3>
    <div class="row px-3 my-4">
      <a-input-search
        placeholder="Search"
        style="width: 320px; margin: 0 10px 0 0"
         @search="onSearch"
        v-model="search"
      />

    </div>

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
      <a-modal v-model="visible" title="Doctor Details" on-ok="handleOk" :centered="true" width="700px">
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
            <div class="row"><div class="col-4"><b>Full name</b></div><div class="col-8"><p>{{model.nameFull}}</p></div></div>
            <div class="row"><div class="col-4"><b>SLMC No</b></div><div class="col-8"><p>{{model.slmcNo}}</p></div></div>
            <div class="row"><div class="col-4"><b>Hospital</b></div><div class="col-8"><p>{{model.hospital}}</p></div></div>
            <div class="row"><div class="col-4"><b>Phone No</b></div><div class="col-8"><p>{{model.phoneNo}}</p></div></div>
            <div class="row"><div class="col-4"><b>Appointed Date</b></div><div class="col-8"><p>{{model.Appointeddate}}</p></div></div>
            <div class="row"><div class="col-4"><b>Venue</b></div><div class="col-8"><p>{{model.venue}}</p></div></div>
            <div class="row"><div class="col-4"><b>Reason for changes of appointment</b></div><div class="col-8"><p>{{model.reaon}}</p></div></div>
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
    title: "Full name",
    dataIndex: "nameFull",
    key: 'nameFull',
    sorter: (a, b) => {
      let nameA = a.nameFull.toUpperCase();
      let nameB = b.nameFull.toUpperCase();
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
    title: "SLMC No",
    dataIndex: "slmcNo",
    key: 'slmcNo',
    sorter: (a, b) => a.slmcNo - b.slmcNo,
    sortDirections: ["descend", "ascend"],
  },
   {
    title: "Hospital",
    dataIndex: "hospital",
    key: 'hospital',
    sorter: (a, b) => {
      let hospitalA = a.hospital.toUpperCase();
      let hospitalB = b.hospital.toUpperCase();
      if (hospitalA < hospitalB) {
        return -1;
      }
      if (hospitalA > hospitalB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Venue",
    dataIndex: "venue",
    key: 'venue',
    sorter: (a, b) => {
      let venueA = a.venue.toUpperCase();
      let venueB = b.venue.toUpperCase();
      if (venueA < venueB) {
        return -1;
      }
      if (venueA > venueB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Appointed Date",
    dataIndex: "Appointeddate",
    key: 'Appointeddate',
    sorter: (a, b) => {
      let AppointeddateA = a.Appointeddate.toUpperCase();
      let AppointeddateB = b.Appointeddate.toUpperCase();
      if (AppointeddateA < AppointeddateB) {
        return -1;
      }
      if (AppointeddateA > AppointeddateB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: 'reason',
    sorter: (a, b) => {
      let reasonA = a.reason.toUpperCase();
      let reasonB = b.reason.toUpperCase();
      if (reasonA < reasonB) {
        return -1;
      }
      if (reasonA > reasonB) {
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
        nameFull: '',
        slmcNo: '',
        hospital: '',
        phoneNo: '',
        maritalStatus: undefined,
        Appointeddate: undefined,
        venue: '',
        reason: ''
      }
    };
  },
  created() {
    /**
     * Get all persons from database
     * using API request
     */
    axios.get("http://127.0.0.1:8000/api/appointment/all").then((response) => {
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
      this.$router.push({ path: `/update-appointment/`+this.model.id});
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
          this.$http.delete("http://127.0.0.1:8000/api/appointment/delete/" + this.model.id).then(
            function(response) {
              this.openNotificationSuccess('Successfully Deleted', 'Appointment'+ this.model.serialno +' record deleted.')
              this.data.splice((this.data.findIndex((e) => e === this.model)), 1);
              console.log(response);
            }, (error) => {
              this.openNotificationUnsuccess('Error', 'Appointment'+ this.model.serialno +' record cannot delete. Operation occured an error !');
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
          return (item.slmcNo.toLowerCase().match(this.search.toLowerCase()) || item.nameFull.toLowerCase().match(this.search.toLowerCase()) || item.hospital.toLowerCase().match(this.search.toLowerCase()) || item.venue.toLowerCase().match(this.search.toLowerCase()) || item.reason.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  }
};
</script>