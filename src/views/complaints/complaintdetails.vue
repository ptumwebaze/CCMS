<template>
<div>
    <CRow>
         <div class="text-primary border-bottom border-right text-center"><h4>Complaint Details</h4></div>
         <CCol sm="2">
         </CCol>
        <CCol sm="8" v-for="(complaint, index) in ThisComplaintGet" :key="index">
         <h4>Business</h4><div class="text-warning border-bottom"><h5>{{complaint.business}}</h5></div>
         <h4>Branch</h4><div class="text-warning border-bottom"><h5>{{complaint.branch}}</h5></div>
         <h4>Name</h4><div class="text-warning border-bottom"><h5>{{complaint.name}}</h5></div>
         <h4>Details</h4><div class="text-success border-bottom"><h5>{{complaint.detail}}</h5></div>
         <h4>Advice</h4><div class="text-warning border-bottom"><h5>{{complaint.advice}}</h5></div>
         <h4>Status</h4><div class="text-success border-bottom"><h5>{{complaint.status}}</h5></div>
         <h4>Registered On</h4><div class="text-warning border-bottom"><h5>{{complaint.registeredon}}</h5></div>
         <h4>Forwarded to</h4><div class="text-success border-bottom"><h5>{{complaint.staff}}</h5></div>
        </CCol>
        <CCol sm="2">
         </CCol>
    </CRow>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default { 
  methods:{
       ...mapActions({
           FetchComplaint:"complaints/fetchThisComplaint",
       }),
       getBadge (status) {
      return status === 'Resolved' ? 'success'
          : status === 'Escalated' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
  },
        computed:{
         ...mapGetters('complaints',['ThisComplaintGet']),
        },
     created(){
    this.FetchComplaint(this.$route.params.id)
        }
		
}
</script>
