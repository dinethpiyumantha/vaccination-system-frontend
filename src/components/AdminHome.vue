<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <img
        src="../assets/logo-white.png"
        class="logo"
        alt="logo"
        height="50px"
        style="background: none"
      />
      <span class="text-light" v-if="!collapsed">C19 System</span>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <router-link to="/">
            <a-icon type="home" />
            <span>Home</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub0">
          <span slot="title"><a-icon type="user" /><span>People</span></span>
          <a-menu-item key="2"
            ><router-link to="/persons"> View All </router-link></a-menu-item
          >
          <a-menu-item key="3"
            ><router-link to="/add-person">
              Add New Person
            </router-link></a-menu-item
          >
          <a-menu-item key="4">
            <router-link to="/deleted-persons">
              Deleted People
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="5">
          <a-icon type="desktop" />
          <span>Vaccines</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>Doctors</span></span>
          <a-menu-item key="6"> Tom </a-menu-item>
          <a-menu-item key="7"> Bill </a-menu-item>
          <a-menu-item key="8"> Alex </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>Nurses</span></span>
          <a-menu-item key="9"> Team 1 </a-menu-item>
          <a-menu-item key="10"> Team 2 </a-menu-item>
        </a-sub-menu>
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
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '70vh' }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Vaccination System © {{ new Date().getFullYear() }} Created by Team
        DevAlgo
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>


<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
