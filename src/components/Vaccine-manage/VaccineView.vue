<template>
   <div>
   <h1>All Vaccine</h1>

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
    
  </div>
</template>



<script>



export default {

}
</script>

<style>

</style>