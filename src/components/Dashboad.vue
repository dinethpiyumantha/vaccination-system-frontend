<template>
  <div class="row">
    <div class="col-6">
      <h6>Summery</h6>
      <div class="row">
        <div class="col-6">
          <a-card size="small">
            <a-statistic title="Vaccinated People" :value="count" style="margin-right: 50px" />
          </a-card>
        </div>
        <div class="col-6">
          <a-card size="small">
            <a-statistic title="Vaccine Types" :value="112893" style="margin-right: 50px" />
          </a-card>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <a-card size="small">
            <a-statistic title="Registered Doctors" :value="112893" style="margin-right: 50px" />
          </a-card>
        </div>
        <div class="col-6">
          <a-card size="small">
            <a-statistic title="Registered Nurses" :value="112893" style="margin-right: 50px" />
          </a-card>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="carousel">
        <Carousel />
      </div>
      <a-alert
      class="mt-2"
      style="border-radius: 15px;"
      message="COVID-19"
      description="This is a warning notice about copywriting."
      type="warning"
      show-icon
    />
    </div>
    
  </div>
</template>

<script>
import Carousel from "./Carousel.vue";

export default {
  data() {
    return {
      count: ''
    }
  },
  components: {
    Carousel,
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/person/count').then(function (response) {
      this.count = response.data;
      console.log(response.data);
    });
  },
};
</script>

<style>
.carousel {
  width: auto;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  border-bottom: 5px solid #d4d4d4;
}
</style>