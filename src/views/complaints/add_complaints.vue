<style>
  #comparea{
          height:80px
  }
</style>
<template>
  <div> 
  <FlashMessage></FlashMessage>
  <CRow>
      <CCol class="shadow bg-white" style="border-radius: 20px;" sm="7">
        <CRow>
          <CCol class="mt-3" sm="6">
            <div>
            Business Name<br>
            <model-list-select :list="BusinessGet?BusinessGet:[]"
                     v-model="userinputs.business"
                     option-value="id"
                     option-text="name"
                     @input="check_business"
                     placeholder="select item">
            </model-list-select>
            </div> 
          </CCol>
              <CCol class="mt-3" sm="6">
              <label for="complaintname">Presented Complaint:</label>
              <input list="complaintname" class="form-control" v-model="userinputs.name">
              <datalist id="complaintname">
                <option v-for="(complaint, index) in ComplaintGet" :key="index" v-bind:value="complaint.name"></option>
              </datalist><br>
              </CCol>
            </CRow>    
            <CRow>
              <CCol sm="12">
                <vue-editor
                v-model="userinputs.detail"
                  label="Details"
                  id="comparea"
                  placeholder="Please enter the complaint details"
                >
                </vue-editor>                
              </CCol>
            </CRow> <br>          
            <CRow>
              <CCol sm="12">
                <vue-editor
                v-model="userinputs.advice"
                  label="Advice"
                  id="comparea"
                  placeholder="Please enter the advice given"
                >
                </vue-editor>
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="12">
                <CSelect
                  v-model="userinputs.status"
                  label="Action"
                  :searchable="true"
                  :options="[
                  'Resolved',
                  'Escalated',
                  ]"
                />
              </CCol>
            </CRow>
            <div v-if="userinputs.status == 'Escalated'">
            Staff Name
                <select :searchable="true" v-model="userinputs.staff_id" style="width:635px; height:35px; margin-bottom:20px; margin-top:10px">
                  <option v-for="(staff, index) in staffGet" :key="index" v-bind:value="staff.id">{{ staff.name }}</option>
                </select>
            </div>
            <div slot="footer" class="w-100">
              <CButton type="submit" class="float-right mb-3 mt-5" color="primary" @click="addNewComplaint" aria-pressed="true">Submit</CButton>
            </div> 
            
      </CCol>
      <CCol sm="5" class="shadow border-top border-left border-right bg-white" v-if="userinputs.business" style="border-radius: 20px;"> 
         <div class="text-primary text-center border-bottom mt-3"><h4>Last submitted complaint</h4></div>
         <h2 class="text-center">Name</h2><div class="text-center text-warning border-bottom"><h5>{{ThisBusinessGet?ThisBusinessGet.name:"No complaints"}}</h5></div>
         <h4>Details</h4><div class="text-success border-bottom"><h5>{{ThisBusinessGet?ThisBusinessGet.detail:"No complaints"}}</h5></div>
         <h4>Advice</h4><div class="text-warning border-bottom"><h5>{{ThisBusinessGet?ThisBusinessGet.advice:"No complaints"}}</h5></div>
         <h4>Status</h4><div class="text-success border-bottom"><h5>{{ThisBusinessGet?ThisBusinessGet.status:"No complaints"}}</h5></div><br>
         <div class="text-primary border-bottom"><h4>This business complaint summary</h4></div>
         <h4>Total complaints</h4><div class="text-warning border-bottom"><h5>{{CountMyComplaints?CountMyComplaints.totalcomplaints:'0'}}</h5></div>
         <h4>Escalated complaints</h4><div class="text-success border-bottom"><h5>{{CountMyComplaints?CountMyComplaints.escalated_comp:0}}</h5></div>
         <h4>Resolved complaints</h4><div class="text-warning border-bottom"><h5>{{CountMyComplaints?CountMyComplaints.resolved_comp:0}}</h5></div>
      </CCol>
  </CRow> 
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
import { VueEditor } from "vue2-editor";
import { ModelListSelect  } from 'vue-search-select'
export default { 
  components: {
    VueEditor,
    ModelListSelect,
  },
    data () {
    return {
      userinputs:{
                name:"",
                business:"",
                detail:"",
                advice:"",
                status:"",
                staff_id:"",
      } ,
    }
  },
 
  methods:{
       ...mapActions({
           AddComplaint:"complaints/addComplaint",
           FetchComplaint:"complaints/fetchComplaint",
           FetchCountComplaint:"business/fetchComplaintCount",
           FetchStaff:"staff/fetchStaff",
           FetchBusiness:"business/fetchBusiness",
           CheckBusiness:"business/fetchMyBusiness",
           FetchComp:"dashboard/fetchComp",


       }),
       getBadge (status) {
      return status === 'Resolved' ? 'success'
          : status === 'Escalated' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    check_business(){
      this.CheckBusiness(this.userinputs)
      this.FetchCountComplaint(this.userinputs)
  
    },
       addNewComplaint(){
         this.AddComplaint(this.userinputs)
         this.userinputs.business = "";
         this.userinputs.name = "";
         this.userinputs.detail = "";
         this.userinputs.advice = "";
         this.userinputs.status = "";
         this.userinputs.staff_id = "";
    },
  },
        computed:{
         ...mapGetters('complaints',['ComplaintGet']),
         ...mapGetters('business',['BusinessGet','ThisBusinessGet','CountMyComplaints']),
         ...mapGetters('customers',['CustomerGet']),
         ...mapGetters('staff',['staffGet']),
         ...mapGetters('dashboard',['CompGet']),
          ...mapState('notification',['notificationtype','notification_message','notification_show']),
        },
       
watch:{
          notification_message(newval){
            if(newval && this.notificationtype=='success'){
      this.flashMessage.success({title: 'Success', position: 'top-right', message: newval});
            }else if(newval && this.notificationtype=='danger'){

this.flashMessage.error({title: 'Error', message: newval});
            }else{
              
            }
          }

        },
     created(){
    this.FetchStaff(),
    this.FetchBusiness(),
    this.FetchComplaint(),
    this.FetchComp(),
    this.CheckBusiness(),
    this.FetchCountComplaint()
        }
		
}
</script>
