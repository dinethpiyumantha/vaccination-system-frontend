<template>
  <div class="row">
    <div class="col-6">Content</div>
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
  components: {
    Carousel,
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