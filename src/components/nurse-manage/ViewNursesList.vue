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
            placeholder="Search a nurse" 
            style="width: 400px; margin: 0 10px 0 0"
            enter-button
            @search="onSearch" 
        />
        <!--filter dropdowns-->
        <a-select
            show-search
            placeholder="By Nurse_type"
            option-filter-prop="children"
            style="width: 220px; padding-right: 20px;"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        >
            <a-select-option value="trainee">Trainee</a-select-option>
            <a-select-option value="fullTime">Full-time</a-select-option>
            <a-select-option value="seniorNurse">Senior_Nurse</a-select-option>
            <a-select-option value="volunteering">Volunteering</a-select-option>
        </a-select>

        <a-select
            show-search
            placeholder="By Shift_type"
            option-filter-prop="children"
            style="width: 220px; padding-right: 20px;"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        >
            <a-select-option value="general">General</a-select-option>
            <a-select-option value="night">Morning-shift</a-select-option>
            <a-select-option value="evening">Evening-shift</a-select-option>
            <a-select-option value="morining">Night-shift</a-select-option>
        </a-select>

        <a-select
            show-search
            placeholder="By Gender"
            option-filter-prop="children"
            style="width: 220px; padding-right: 20px;"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        >
            <a-select-option value="male">Male</a-select-option>
            <a-select-option value="female">Female</a-select-option>
        </a-select>
    </div>

    <!--table structure-->
    <a-table
        :columns="columns"
        :data-source="nurseData"
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
        <a-modal v-model="visible" title="Nurse-xxxx" on-ok="handleOk">
            <!--model view content-->
            <div class="row"><div class="col-4"><b>Name: </b></div><div class="col-8"><p>{{model.name}}</p></div></div>
            <hr>
            <div class="row"><div class="col-4"><b>Gender: </b></div><div class="col-8"><p>{{model.gender}}</p></div></div>
       
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
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
            ],
            onFilter: (value, recordObj) => recordObj.gender.indexOf(value) == 0, //this is a must
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

                pagination: { },
                loading: false, //this is a must 
                visible: false, //this is a must
                //return column variable
                columns,
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

            //handleDelete in modal window method

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
            //openNotificationSuccess() ???

            //openNotificationUnsuccess() ???

            //showConfirm() method to confirm deletion of a row
        }

    }
</script>

<style>

</style>