<template>
  <div>
    <!-- <a-breadcrumb style="background: #fff; padding: 10px 24px">
        <a-breadcrumb-item>User</a-breadcrumb-item>
        <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb> -->

    <!--page header-->
    <h3>Nurses List</h3>

    <!--search and filter options-->
    <div class="row px-3 my-4">
        <!--search bar-->
        <a-input-search 
            placeholder="Search nurse by name" 
            style="width: 400px; margin: 0 10px 0 0"
            v-model="search" 
            @search="onSearch" 
        />
        <!--filter dropdowns-->
        <a-tooltip placement="top" class="components-a-tooltip-demo-placement">
            <template slot="title">
                <span>Filter by Nurse_type</span>
            </template>          
            <a-select
                show-search
                placeholder="By Nurse_type"
                option-filter-prop="children"
                style="width: 270px; padding-right: 20px;"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                v-model="nurse_type"
            >
                <!--use the below code to make filter function work-->
                <a-select-option value="">- Not selected - </a-select-option>
                <a-select-option v-for="nurse_type in nurse_types" :key="nurse_type" :value="nurse_type"> {{nurse_type.toLowerCase()}} </a-select-option>
            </a-select>
        </a-tooltip>

        <a-tooltip placement="top" class="components-a-tooltip-demo-placement">
            <template slot="title">
                <span>Filter by Shift type</span>
            </template>          
            <a-select
                show-search
                placeholder="By Shift_type"
                option-filter-prop="children"
                style="width: 270px; padding-right: 20px;"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                v-model="Shift"
            >
                <a-select-option value="">- Not Selected - </a-select-option>
                <a-select-option v-for="Shift in Shifts" :key="Shift" :value="Shift"> {{Shift.toLowerCase()}} </a-select-option>
            </a-select>
        </a-tooltip>

        <!-- <a-select
            show-search
            placeholder="By Gender"
            option-filter-prop="children"
            style="width: 220px; padding-right: 20px;"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            v-model="gender"
        >
            <a-select-option value=""> By Gender</a-select-option>
            <a-select-option v-for="gender in genders" :key="gender" :value="gender"> {{gender.toLowerCase()}} </a-select-option>
        </a-select> -->
    </div>

    <!--table structure-->
    <a-table
        :columns="columns"
        :data-source="searchResult"
        :loading="loading"
        @change="handleTableChange"
        style="padding: 0px"
        :customRow = "customRow" 
    >
        <!--circle arrow button in each row-->
        <a-button slot="action" type="primary" shape="circle" @click="showModal">
            <a-icon type="right" style="padding-bottom: 5px"/>
        </a-button>
    </a-table>
    <!--when 1 row selected-> Model view including it's title-->
    <div>
        <a-modal v-model="visible" :title="'Nurse - '+ model.name" on-ok="handleOk">
            <!--model view content-->
            <div class="row"><div class="col-4"><b>Nurse_ID: </b></div><div class="col-8"><p>{{model.nurse_no}}</p></div></div>
            <div class="row"><div class="col-4"><b>Name: </b></div><div class="col-8"><p>{{model.name}}</p></div></div>
            <div class="row"><div class="col-4"><b>joined_date: </b></div><div class="col-8"><p>{{model.joined_date}}</p></div></div>
            <div class="row"><div class="col-4"><b>National ID(NIC): </b></div><div class="col-8"><p>{{model.NIC}}</p></div></div>
            <div class="row"><div class="col-4"><b>Age: </b></div><div class="col-8"><p>{{model.age}}</p></div></div>
            <div class="row"><div class="col-4"><b>Gender: </b></div><div class="col-8"><p>{{model.gender}}</p></div></div>
            <div class="row"><div class="col-4"><b>Phone No: </b></div><div class="col-8"><p>{{model.phone_no}}</p></div></div>
            <div class="row"><div class="col-4"><b>E-mail: </b></div><div class="col-8"><p>{{model.email}}</p></div></div>
            <div class="row"><div class="col-4"><b>Nurse_type: </b></div><div class="col-8"><p>{{model.nurse_type}}</p></div></div>
            <div class="row"><div class="col-4"><b>Working Hospital: </b></div><div class="col-8"><p>{{model.working_hospital}}</p></div></div>
            <div class="row"><div class="col-4"><b>Residencial Address: </b></div><div class="col-8"><p>{{model.permanent_address}}</p></div></div>
            <hr>
            <div class="row"><div class="col-4"><b>Shift: </b></div><div class="col-8"><p>{{model.Shift}}</p></div></div>
            <div class="row"><div class="col-4"><b>From: </b></div><div class="col-8"><p>{{model.From}}</p></div></div>
            <div class="row"><div class="col-4"><b>To: </b></div><div class="col-8"><p>{{model.To}}</p></div></div>
            <div class="row"><div class="col-4"><b>Special Note: </b></div><div class="col-8"><p>{{model.specialNote}}</p></div></div>
       
            <!--model view footer-->  
            <template slot="footer">
                <!--Edit button-->
                <a-button key="submit" type="primary" :loading="loading" @click="handleUpdate">Edit</a-button>
                <!--Delete button-->
                <a-button key="submit" type="danger" :loading="loading" @click="handleDelete">Delete</a-button>
                <!--cancel button-->
                <a-button key="back" @click="handleCancel">Cancel</a-button>
            </template>
        </a-modal>
    </div>

  </div>
</template>

<script>
    //import libraries used to catch the JSON type data which are retrieved from the backend
    import axios from "axios";
    import 'vue-resource';
    //import local data files ?????

    //get all column fields with their Sort & filter options into one Const Array variable (Title: frontend columnName, dataIndex: DB columnName)
    const columns = [
        {
            title: "Nurse_ID",
            dataIndex: "nurse_no",
            key: 'nurse_no',
            sorter: (a, b) => {
            let nurseNoA = a.nurse_no.toUpperCase();
            let nurseNoB = b.nurse_no.toUpperCase();
            if (nurseNoA < nurseNoB) {
                return -1;
            }
            if (nurseNoA > nurseNoB) {
                return 1;
            }
            return 0;
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Name',
            dataIndex: 'name', //column names in our DB table should be given in dataIndexes
            // sorter: true,  //??
            scopedSlots: { customRender: 'name' }, //??
            sorter: (a,b) => {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if(nameA <nameB){
                    return -1;
                }
                if(nameA > nameB){
                    return 1;
                }
                return 0;
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a,b) => a.age - b.age,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                { text: 'Male', value: 'Male' },
                { text: 'Female', value: 'Female' },
            ],
            onFilter: (value, recordObj) => recordObj.gender.indexOf(value) == 0, //this is a must
        },
        {
            title: 'Contact No',
            dataIndex: 'phone_no',
        },
        {
            title: 'Nurse_type',
            dataIndex: 'nurse_type',
        },
        {
            title: 'Shift',
            dataIndex: 'Shift',
        },
        // {
        //     title: 'From',
        //     dataIndex: 'From',
        // },
        // {
        //     title: 'To',
        //     dataIndex: 'To',
        // },
        {
            title: "",
            key: "id",
            fixed: "right",
            width: 100,
            scopedSlots: { customRender: "action" },
        },
    ];

    export default {
        data() {
            /**
             *data attributes 
             */
            // getAllNurses_path : "http://127.0.0.1:8000/api/nurses/all", //this is the backend route to retrieve all nurse details
            
            return {
                //return nurseData[] array which contains backend data
                nurseData: [],

                buttonWidth: 70,
                pagination: { },
                loading: false, //this is a must 
                visible: false, //this is a must
                //return column variable
                columns,
                //make arrays to show in filter dropdowns
                nurse_types: ["Trainee", "Full-time", "Senior_Nurse", "Volunteering"],
                Shifts: ["General","Morning-shift","Evening-shift","Night-shift"],
                genders: ["Female", "Male"],
                //return the values to v-model attributes that we've set in Search, Filter functions
                search: '',
                gender: '', 
                nurse_type: '', //user selecting option of Filter dropdown will be assigned to this attribute
                Shift: '',
                //return model object(which contains all DB retrieved data as an obj)
                model: { 
                    nurse_no: '',
                    name: '',
                    joined_date: '',
                    NIC: '',
                    age: '',
                    gender: '',
                    phone_no: '',
                    email: '',
                    nurse_type: '',
                    working_hospital:'', 
                    permanent_address: '',
                    Shift: '',
                    From: '',
                    To: '',
                    specialNote:'',
                } //**this model is useful when displaying DB retrieved data in our Modal windows */
            }
        },
        created(){
            /**
             * get all nurse details from the Backend and store in the data array
             * using API request
             */
            axios.get("http://127.0.0.1:8001/api/nurses/all").then((response) => {
                    this.nurseData = response.data.results;
                    console.log(this.nurseData);
                }
            );
        },
        methods: {
            //handleTableChange() method
            handleTableChange(pagination, filters, sorter) {
                // console.log(pagination);
                // const pager = { ...this.pagination };
                // pager.current = pagination.current;
                // this.pagination = pager;
                // this.fetch({
                //     results: pagination.pageSize,
                //     page: pagination.current,
                //     sortField: sorter.field,
                //     sortOrder: sorter.order,
                //     ...filters,
                // });
                console.log("params", pagination, filters, sorter);
            },
            //show Modal view method
            showModal(){
                this.visible = true;
            },
            //what is handleOk() method ???? - this will be called when user click a row in the table
            handleOk() {
            this.loading = true;
            setTimeout(() => {
                this.visible = false;
                this.loading = false;
                }, 
                2000);
            },
            //handleUpdate in modal window method
            handleUpdate(){
                this.loading = true;
                setTimeout(() => {
                    this.visible = false;
                    this.loading = false;
                    this.$router.push({path: '/update-nurse/'+this.model.id});
                }, 500);
            },

            //handleDelete in modal window method
            handleDelete(){
                this.loading = true;
                setTimeout(() => {
                    this.visible =false;
                    this.loading = false;
                    this.showDeleteConfirm(); //to popup a confirmation box prior to deletion
                }, 500);
            },

            //handleCancel in modal window method
            handleCancel(){
                this.visible = false;
            },

            //customRow method
            customRow(recordObj){ //this is an in-built method which pass the record of clicked row in the table
                return{
                    //if user click on a particlular table row;
                    on: {
                        click: event => {
                            this.model = recordObj; //assign the data record of clicked row to this.model object
                            this.showModal();
                            console.log(event);
                        }
                    }
                }
            },

            //search function
            onSearch(value){
                console.log(value);
            },
            //openNotificationSuccess() //for Delete function
            openNotificationSuccess(message, description) {
                /**
                 * Notification toast success
                 */
                this.$notification.open({
                    message: message,
                    duration: 5,
                    icon: <a-icon type="like" theme="filled" style="color: #27ae60"/>,
                    description:description,
                    onClick: () => {
                    console.log('Notification Clicked!');
                    },
                });
                // this.clearForm();
            },
            //openNotificationUnsuccess()
            openNotificationUnsuccess(message, description) {
                /**
                 * Notification toast unsuccess
                 */
                this.$notification.open({
                    message: message,
                    duration: 8,
                    icon: <a-icon type="dislike" theme="filled" style="color: #c0392b"/>,
                    description:description,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            },

            //showConfirm() method to confirm deletion of a row
            showDeleteConfirm() {
                this.$confirm({
                    title: 'Are you sure to delete nurse - '+ this.model.nurse_no+'\n'+'('+ this.model.name+ ')'+ '?',
                    content: "Click 'No' if you don't really want to delete this nurse",
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk: () => {
                        this.$http.delete("http://127.0.0.1:8001/api/nurses/delete/" +this.model.id).then(
                            function(response){
                                //popup successful msg
                                this.openNotificationSuccess('Successfully Deleted', 'Nurse - '+ this.model.nurse_no +' deleted.');
                                // setTimeout("location.reload(true);", 1000); //this will reload the page
                                this.nurseData.splice((this.nurseData.findIndex((e) => e === this.model)), 1);
                                console.log(response);                             
                            }, (error) => {
                                this.openNotificationUnsuccess('Error', 'Nurse'+ this.model.nurse_no +' record cannot delete. Operation occured an error !');
                                console.log(error);
                                alert("delete unsuccesfful");
                            }
                        );
                    },
                    onCancel() {
                    console.log('Cancel');
                    },
                });
            },
            
        },
        computed: {
                searchResult: function(){
                    return this.nurseData.filter((item) => {
                        //dropdown selcted value or the searched value will be matched with the respective data in DB table
                        return (item.gender.toLowerCase().match(this.gender.toLowerCase())) &&(item.Shift.toLowerCase().match(this.Shift.toLowerCase())) && (item.nurse_type.toLowerCase().match(this.nurse_type.toLowerCase())) && (item.name.toLowerCase().match(this.search.toLowerCase()));
                    });
                }
            }

    }
</script>

<style scoped>
    /*styles for Tool tip*/
    .components-a-tooltip-demo-placement .ant-btn {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
    }
</style>