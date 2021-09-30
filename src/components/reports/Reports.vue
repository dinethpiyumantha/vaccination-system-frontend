<template>
    <div>
        <div class="row">
            <div class="col-6">
                <a-card>
                    <div class="row">
                        <div class="col-3">
                            <svg style="height: 100px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#001529" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                        </div>
                        <div class="col-9">
                            <h3>Persons Report</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, placeat quibusdam commodi itaque eaque id qui aliquam autem. Veritatis est illo corporis voluptatem. Praesentium, suscipit.</p>
                        <div class="row px-3">
                        <a-button type="primary" icon="download" @click="getPersonReport" :size="large" :loading="loading"> Generate Full Report </a-button>
                        </div>
                            </div>
                        </div>
                </a-card>
            </div>
            <div class="col-6">
                <a-card>
                    <div class="row">
                        <div class="col-3">
                            <svg style="height: 100px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-md" class="svg-inline--fa fa-user-md fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#001529" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zM104 424c0 13.3 10.7 24 24 24s24-10.7 24-24-10.7-24-24-24-24 10.7-24 24zm216-135.4v49c36.5 7.4 64 39.8 64 78.4v41.7c0 7.6-5.4 14.2-12.9 15.7l-32.2 6.4c-4.3.9-8.5-1.9-9.4-6.3l-3.1-15.7c-.9-4.3 1.9-8.6 6.3-9.4l19.3-3.9V416c0-62.8-96-65.1-96 1.9v26.7l19.3 3.9c4.3.9 7.1 5.1 6.3 9.4l-3.1 15.7c-.9 4.3-5.1 7.1-9.4 6.3l-31.2-4.2c-7.9-1.1-13.8-7.8-13.8-15.9V416c0-38.6 27.5-70.9 64-78.4v-45.2c-2.2.7-4.4 1.1-6.6 1.9-18 6.3-37.3 9.8-57.4 9.8s-39.4-3.5-57.4-9.8c-7.4-2.6-14.9-4.2-22.6-5.2v81.6c23.1 6.9 40 28.1 40 53.4 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.3 16.9-46.5 40-53.4v-80.4C48.5 301 0 355.8 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-72-56.8-130.3-128-133.8z"></path></svg>                        </div>
                        <div class="col-9">
                            <h3>Doctors Report</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, placeat quibusdam commodi itaque eaque id qui aliquam autem. Veritatis est illo corporis voluptatem. Praesentium, suscipit.</p>
                        <div class="row px-3">
                        <a-button type="primary" icon="download" @click="getDoctorReport" :size="large"> Generate Full Report </a-button>
                    </div>
                        </div>
                    </div>
                </a-card>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-6">
                <a-card>
                    <div class="row">
                        <div class="col-3">
                            <svg style="height: 100px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="first-aid" class="svg-inline--fa fa-first-aid fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#001529" d="M0 80v352c0 26.5 21.5 48 48 48h48V32H48C21.5 32 0 53.5 0 80zm128 400h320V32H128v448zm64-248c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48zM528 32h-48v448h48c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path></svg>                        </div>
                        <div class="col-9">
                            <h3>Vaccines Report</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, placeat quibusdam commodi itaque eaque id qui aliquam autem. Veritatis est illo corporis voluptatem. Praesentium, suscipit.</p>
                        <div class="row px-3">
                 
                        <a-button type="primary" icon="download" @click="getVaccineReport" :size="large" :loading="loading"> Generate Full Report </a-button>
                       
                    </div>
                        </div>
                    </div>
                </a-card>
            </div>
            <div class="col-6">
                <a-card>
                    <div class="row">
                        <div class="col-3">
                            <svg style="height: 100px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-nurse" class="svg-inline--fa fa-user-nurse fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#001529" d="M319.41,320,224,415.39,128.59,320C57.1,323.1,0,381.6,0,453.79A58.21,58.21,0,0,0,58.21,512H389.79A58.21,58.21,0,0,0,448,453.79C448,381.6,390.9,323.1,319.41,320ZM224,304A128,128,0,0,0,352,176V65.82a32,32,0,0,0-20.76-30L246.47,4.07a64,64,0,0,0-44.94,0L116.76,35.86A32,32,0,0,0,96,65.82V176A128,128,0,0,0,224,304ZM184,71.67a5,5,0,0,1,5-5h21.67V45a5,5,0,0,1,5-5h16.66a5,5,0,0,1,5,5V66.67H259a5,5,0,0,1,5,5V88.33a5,5,0,0,1-5,5H237.33V115a5,5,0,0,1-5,5H215.67a5,5,0,0,1-5-5V93.33H189a5,5,0,0,1-5-5ZM144,160H304v16a80,80,0,0,1-160,0Z"></path></svg>                        </div>
                        <div class="col-9">
                            <h3>Nurses Report</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, placeat quibusdam commodi itaque eaque id qui aliquam autem. Veritatis est illo corporis voluptatem. Praesentium, suscipit.</p>
                        <div class="row px-3">
                        <a-button type="primary" icon="download"  :href="`http://127.0.0.1:8001/api/nurses/report/pdf`" :size="large" :loading="loading"> Generate Full Report </a-button>
                    </div>
                        </div>
                    </div>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //loading: false,

        }
    },
    methods: {
        
        getPersonReport: function() {
            this.loading = true;
            setTimeout(() => {

            this.$http.get('http://127.0.0.1:8000/api/person/report/pdf')
            .then(function (response) {
                console.log(response);
            });

            this.loading = false;
            }, 2000);
        },
        getVaccineReport: function() {
            this.loading = true;
            setTimeout(() => {

            this.$http.get('http://127.0.0.1:8000/api/vaccine/report/pdf')
            .then(function (response) {
                console.log(response);
            });

            this.loading = false;
            }, 2000);
        },
        getDoctorReport: function() {
            this.loading = true;
            setTimeout(() => {

            this.$http.get('http://127.0.0.1:8000/api/doctor/report/pdf')
            .then(function (response) {
                console.log(response);
            });

            this.loading = false;
            }, 2000);
        }, 
        getNurseReport: function() {
           this.loading = true;
            setTimeout(() => {

            // this.$http.get('http://127.0.0.1:8001/api/nurses/report/pdf')
            // .then(function (response) {
            //     //response.loading = true;
            //     console.log(response);
            // });
            this.$router.push({
                path: '/reports'
            })

            this.loading = false; //loading will stop in 2seconds
            }, 2000);
        },
    }
}
</script>

<style>

</style>