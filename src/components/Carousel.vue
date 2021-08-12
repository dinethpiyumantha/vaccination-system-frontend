<template>
  <a-carousel arrows autoplay>
    <div>
        <img src="../assets/slider/1.jpg" class="slider" alt="..."/>
    </div>
    <div>
        <img src="../assets/slider/2.jpg" class="slider" alt="..."/>
    </div>
  </a-carousel>
</template>

<script>
export default {};
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
}

/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 350px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
