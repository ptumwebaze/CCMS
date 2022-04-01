<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="success" style="font-size:20px; padding-bottom: 15px;" :header="CompGet.totalcomplaints?CompGet.totalcomplaints:'0'" text="Total Complaints">
    
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown style="font-size:20px; padding-bottom: 15px;" color="warning" :header="CompGet.escalated_comp?CompGet.escalated_comp:'0'" text="Escalated Complaints">
      
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="primary"
        style="font-size:20px; padding-bottom: 15px;"
        :header="CompGet.resolved_comp?CompGet.resolved_comp:'0'"
        text="Resolved Complaints"
      >
    
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="danger"
        style="font-size:20px; padding-bottom: 15px;"
        :header="CompGet.escalated_comp?CompGet.escalated_comp:'0'"
        text="Pending Complaints"
      >
    
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'WidgetsDropdown',
  components: { CChartLineSimple, CChartBarSimple },
  data(){
    return{
   ti:700,
    }
  },
  methods:{
       ...mapActions({
           FetchComp:"dashboard/fetchComp",
       }),
},
computed:{
         ...mapGetters('dashboard',['CompGet']),
},
created(){
  // setInterval(() => {
  //   this.ti = this.ti+1
  // }, 1000);
    this.FetchComp()
}
}
</script>
