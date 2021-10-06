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
      <div class="row mt-4">
        <div class="col-4">
          <a-card>
            <a-statistic
              title="Infected"
              :value="0"
              :precision="0"
              suffix=""
              :value-style="{ color: '#cf1322' }"
              style="margin-right: 50px"
            >
              <template #prefix>
                <a-icon type="arrow-up" />
              </template>
            </a-statistic>
          </a-card>
          <a-card style="margin-top: 20px;">
            <a-statistic
              title="Death"
              :value="0"
              :precision="0"
              suffix=""
              :value-style="{ color: '#cf1322'}"
              style="margin-right: 50px; "
            >
              <template #prefix>
                <a-icon type="arrow-up" />
              </template>
            </a-statistic>
          </a-card>
        </div>
        <div class="col-8">
          <a-result title="Let's Vaccinate!">
            <template #icon>
              <a-icon type="smile" theme="twoTone" />
            </template>
            <template #extra>
              <router-link to="/vaccinate">
                <a-button type="primary">
                  Open
                </a-button>
              </router-link>
            </template>
          </a-result>
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
    if(document.cookie == '') {
      this.$router.push('/login');
    }
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