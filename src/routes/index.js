import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Dashboad from '../components/Dashboad.vue';
import Reports from '../components/reports/Reports.vue';

import Persons from '../components/person-manage/PersonsView.vue';
import AddPersons from '../components/person-manage/AddPersons.vue';
import UpdatePerson from '../components/person-manage/UpdatePerson.vue';
import DeletedPersons from '../components/person-manage/PersonsViewDeleted.vue';
import Vaccinate from '../components/person-manage/Vaccinate.vue';

//import components related to Nurse-management
import NursesList from '../components/nurse-manage/ViewNursesList';
// import AddNurse from '../components/nurse-manage/AddNurse';

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
      //routes of nurse-manage
      {
        path: '/nurses', //router name that needs to be appeared in the URL when user click on nursesList view component
        name: 'allNurses', //this name is useful in breadcrumbs(breadcrumb- a secondary navigation system that shows user's location in a website/webapp)
        component: NursesList,
      }
    ] 
});