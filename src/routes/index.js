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

import AddDoctors from '../components/doctor-manage/AddDoctors.vue';
import DoctorsReport from '../components/doctor-manage/DoctorsReport.vue';
import DoctorsView from '../components/doctor-manage/DoctorsView.vue';
import AppointmentChanges from '../components/doctor-manage/AppointmentChanges.vue';
import UpdateDoctor from '../components/doctor-manage/UpdateDoctor.vue';

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
        path: '/add-doctors',
        name: 'Add Doctors',
        component: AddDoctors
      },
      {
        path: '/view-doctors',
        name: 'Doctors View',
        component: DoctorsView
      },
      {
        path: '/report-doctors',
        name: 'Doctors Report',
        component: DoctorsReport
      },
      {
        path: '/appointment-doctors',
        name: 'Appiontment Changes',
        component: AppointmentChanges
      },
      {
        path: '/update-doctor/:id',
        name: 'Update Doctor',
        component: UpdateDoctor
      },
    ]
});