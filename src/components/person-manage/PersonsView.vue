<template>
  <a-table :columns="columns" :data-source="data" @change="onChange" />
</template>
<script>
import axios from "axios";
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
  },{
    title: "NIC",
    dataIndex: "nic",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
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
];

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

export default {
  data() {
    return {
      data: [],
      columns,
    };
  },
  created() {
    axios.get("http://127.0.0.1:8000/api/person/all").then((response) => {
      this.data = response.data.results;
      console.log(this.data);
    });
  },
  methods: {
    onChange,
  },
};
</script>
