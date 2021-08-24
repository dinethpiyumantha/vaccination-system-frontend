<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>

      <!-- Logo -->
      <img
        src="../assets/logo-white.png"
        class="logo"
        alt="logo"
        height="50px"
        style="background: none"
      />

      <!-- Name -->
      <span class="text-light" v-if="!collapsed">C19 System</span>

      <!-- Side Menu -->
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">

        <!-- Home -->
        <a-menu-item key="1">
          <router-link to="/">
            <a-icon type="home" />
            <span>Home</span>
          </router-link>
        </a-menu-item>

        <!-- People -->
        <a-sub-menu key="sub0">
          <span slot="title">
            <a-icon type="team" />
            <span>People</span>
          </span>
          <!-- View All -->
          <a-menu-item key="2">
            <router-link to="/persons"> View All People</router-link>
          </a-menu-item>
          <!-- Add New Person -->
          <a-menu-item key="3">
            <router-link to="/add-person">Add New Person</router-link>
          </a-menu-item>
          <!-- Deleted People -->
          <a-menu-item key="4">
            <router-link to="/deleted-persons">Deleted People</router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- Vaccines -->
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="medicine-box" />
            <span>Vaccines</span>
          </span>
          <!-- View All Vaccines -->
          <a-menu-item key="5">
            <router-link to="/persons"> View All Vaccines</router-link>
          </a-menu-item>
          <!-- Add New Vaccine -->
          <a-menu-item key="6">
            <router-link to="/add-person">Add New Vaccine</router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- Doctors -->
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="user" />
            <span>Doctors</span>
          </span>
          <!-- View All Doctors -->
          <a-menu-item key="7">
            <router-link to="/persons"> View All Doctors</router-link>
          </a-menu-item>
          <!-- Add New Doctor -->
          <a-menu-item key="8">
            <router-link to="/add-person">Add New Doctor</router-link>
          </a-menu-item>
        </a-sub-menu>


        <!-- Nurses -->
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="user" />
            <span>Nurses</span>
          </span>
          <!-- View All Nurses -->
          <a-menu-item key="9">
            <router-link to="/persons"> View All Nurses</router-link>
          </a-menu-item>
          <!-- Add New Nurse -->
          <a-menu-item key="10">
            <router-link to="/add-person">Add New Nurse</router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- Reports -->
        <a-menu-item key="11">
          <router-link to="/reports">
            <a-icon type="file" />
            <span>Reports</span>
          </router-link>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff;" class="px-3">
        <a-popover title="Title">
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-button
            type="circle"
            shape="circle"
            v-bind="serial"
            v-on:click="openPersonView()"
            style="padding-top: 0px"
          >
            <a-icon type="setting" />
          </a-button>
        </a-popover>
      </a-layout-header>
      <a-layout-content style="margin: 0">
        <a-breadcrumb style="background: #fff; padding: 10px 24px">
          
          <a-breadcrumb-item v-for="(item, index) in items" :key="index">
            <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '70vh' }"
        >
        <!-- Components changing -->
          <router-view /> 
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Vaccination System © {{ new Date().getFullYear() }} Created by Team
        DevAlgo

        <div>
          <router-link to="/vaccine">Vaccines All</router-link>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>


<script>
export default {
  data() {
    return {
      collapsed: false,
      items: []
    };
  },
  watch: {
    $route() {
      this.getRoute();
    }
  },
  methods: {
    getRoute() {
      this.items = this.$route.matched;
      console.log(this.$route);
    }
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
