<template>
  <div>
    <h3>Registered People</h3>
    <div class="row px-3 my-4">
      <a-input-search
        placeholder="Search a person"
        style="width: 320px; margin: 0 10px 0 0"
        @search="onSearch"
      />
      <a-select
        show-search
        placeholder="Select a district"
        option-filter-prop="children"
        style="width: 200px; margin: 0 10px 0 0"
        :filter-option="filterOption"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
        <a-select-option value="jack"> Jack </a-select-option>
        <a-select-option value="lucy"> Lucy </a-select-option>
        <a-select-option value="tom"> Tom </a-select-option>
      </a-select>

      <a-select
        show-search
        placeholder="Select a MOH area"
        option-filter-prop="children"
        style="width: 200px; margin: 0 10px 0 0"
        :filter-option="filterOption"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
        <a-select-option value="jack"> Jack </a-select-option>
        <a-select-option value="lucy"> Lucy </a-select-option>
        <a-select-option value="tom"> Tom </a-select-option>
      </a-select>

      <a-select
        show-search
        placeholder="Select a GN area"
        option-filter-prop="children"
        style="width: 200px; margin: 0 10px 0 0"
        :filter-option="filterOption"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
        <a-select-option value="jack"> Jack </a-select-option>
        <a-select-option value="lucy"> Lucy </a-select-option>
        <a-select-option value="tom"> Tom </a-select-option>
      </a-select>

      <a-select
        show-search
        placeholder="By vacciene"
        option-filter-prop="children"
        style="width: 150px; margin: 0 10px 0 0"
        :filter-option="filterOption"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
        <a-select-option value="jack"> Jack </a-select-option>
        <a-select-option value="lucy"> Lucy </a-select-option>
        <a-select-option value="tom"> Tom </a-select-option>
      </a-select>
    </div>

    <a-table
      :columns="columns"
      :row-key="(record) => record.login.uuid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">
        {{ name.first }} {{ name.last }}
      </template>
      <template slot="show" slot-scope="serial">
        <a-button
          type="circle"
          shape="circle"
          v-bind="serial"
          v-on:click="openPersonView()"
        >
          <a-icon type="right" />
        </a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import axios from "axios";

const queryData = (params) => {
  return axios.get("https://randomuser.me/api", { params: params });
};

// const queryData = (params) => {
//   return axios.get("http://127.0.0.1:8000/api/person/all", { params: params });
// };


const columns = [
  {
    title: "Serial No",
    dataIndex: "serialno",
    sorter: true,
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "NIC",
    dataIndex: "nic",
    sorter: true,
    width: "10%",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: true,
    width: "10%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    width: "10%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "20%",
  },
  {
    title: "",
    width: "5%",
    scopedSlots: { customRender: "show" },
  },
];

export default {
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      dataSet: []
    };
  },
  created() {
    console.log(queryData);
  },
  mounted() {
    this.fetch();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch(params = {}) {
      this.loading = true;
      queryData({
        results: 10,
        ...params,
      }).then(({ data }) => {
        console.log(data);
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      });
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    openPersonView() {
      // router.push({ path: '/person/'+1 })
    },
  },
};
</script>
