import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Dashboad from '../components/Dashboad.vue';
import Reports from '../components/Reports.vue';

import Persons from '../components/person-manage/PersonsView.vue';
import AddPersons from '../components/person-manage/AddPersons.vue';
import UpdatePerson from '../components/person-manage/UpdatePerson.vue';
import DeletedPersons from '../components/person-manage/PersonsViewDeleted.vue';

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
      
    ]
});