import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Dashboad from '../components/Dashboad.vue';
import Reports from '../components/reports/Reports.vue';
import Signup from '../components/Signup.vue';

import Persons from '../components/person-manage/PersonsView.vue';
import AddPersons from '../components/person-manage/AddPersons.vue';
import UpdatePerson from '../components/person-manage/UpdatePerson.vue';
import DeletedPersons from '../components/person-manage/PersonsViewDeleted.vue';
import Vaccinate from '../components/person-manage/Vaccinate.vue';

import VaccineView from '../components/Vaccine-manage/VaccineView.vue';
import AddVaccines from '../components/Vaccine-manage/AddVaccines.vue';
import UpdateVaccine from '../components/Vaccine-manage/UpdateVaccine.vue';

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Dashboad',
        component: Dashboad
      },
      {
        path: '/reports',
        name: 'Reports',
        component: Reports
      },
      {
        path: '/persons',
        name: 'Persons',
        component: Persons
      },
      {
        path: '/deleted-persons',
        name: 'Deleted Persons',
        component: DeletedPersons
      },
      {
        path: '/add-person',
        name: 'Add Persons',
        component: AddPersons
      },
      {
        path: '/update-person/:id',
        name: 'Update Persons',
        component: UpdatePerson
      },
      {
        path: '/vaccinate',
        name: 'Vaccinate',
        component: Vaccinate,
      },
      

      {
        path: '/vaccine',
        name: 'vaccine',
        component: VaccineView,
      },

      {
        path: '/add-vaccine',
        name: 'Add Vaccines',
        component: AddVaccines,
      },

      {
        path: '/update-vaccine/:id',
        name: 'Update Vaccines',
        component: UpdateVaccine,
      },


      {
        path: '/Signup',
        name: 'Signup',
        component: Signup
      },
 
    ]
});