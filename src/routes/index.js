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

import AddDoctors from '../components/doctor-manage/AddDoctors.vue';
import DoctorsView from '../components/doctor-manage/DoctorsView.vue';
import AppointmentChanges from '../components/doctor-manage/AppointmentChanges.vue';
import AppointmentView from '../components/doctor-manage/AppointmentView.vue';
import UpdateDoctor from '../components/doctor-manage/UpdateDoctor.vue';
import UpdateAppointment from '../components/doctor-manage/UpdateAppointment.vue';

//import components related to Nurse-management
import NursesList from '../components/nurse-manage/ViewNursesList';
import AddNurse from '../components/nurse-manage/AddNurse'; // import AddNurse from '../components/nurse-manage/AddNurse';
import UpdateNurse from '../components/nurse-manage/updateNurse';

//import login component
import Login from '../components/Login'; 
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
        path: '/appointment-doctors',
        name: 'Appointment Changes',
        component: AppointmentChanges
      },
      {
        path: '/appointmentView-doctors',
        name: 'Appointments',
        component: AppointmentView
      },
      {
        path: '/update-doctor/:id',
        name: 'Update Doctor',
        component: UpdateDoctor
      },
      //routes of nurse-manage
      {
        path: '/nurses', //router name that needs to be appeared in the URL when user click on nursesList view component
        name: 'All Nurses', //this name is useful in breadcrumbs(breadcrumb- a secondary navigation system that shows user's location in a website/webapp)
        component: NursesList,
      },
      {
        path: '/add-nurse',
        name: 'Add New Nurse',
        component: AddNurse,
      },
      {
        path: '/update-nurse/:id',
        name: 'Update Nurse', 
        component: UpdateNurse,
      }, 
      
      //route for Login
      {
        path: '/login',
        name: 'Administrator Login',
        component: Login,
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
        path: '/SignUp',
        name: 'Signup',
        component: Signup,
      },
      {
        path: '/update-appointment/:id',
        name: 'Update Appointment',
        component: UpdateAppointment
      },
    ]
});