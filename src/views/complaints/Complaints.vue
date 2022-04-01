<style>
  #compedit{
          height:80px
  }
</style>
<template>
  <div>    
        <CRow class="mb-xl-4">
          <!-- <router-link :> -->
      <CButton to="/add_complaints" class="btn btn-primary" style="width:150px; margin-left:1000px" >Add Complaint</CButton>
          <!-- </router-link> -->
</CRow>
  <FlashMessage></FlashMessage>

<!-- Edit_Complaint Modal -->
 <CModal
      title="Edit complaint details"
      :show.sync="edit_complaint"
      color="success"
      footer="false"
      size = "lg"
    >
      <CRow>
              <CCol sm="6">
                <CInput
                v-model="editData.business"
                  label="Business Name"
                  placeholder="Please enter the business name"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                v-model="editData.branch"
                  label="Branch Name"
                  placeholder="Please enter the branch name"
                />
              </CCol>
      </CRow>
      <CRow>
              <CCol sm="6">
                <CInput
                v-model="editData.name"
                  label="Complaint Name"
                  placeholder="Please enter the complaint name"
                />
              </CCol>
              <CCol sm="6">
                <CSelect
                  v-model="editData.status"
                  label="Status"
                  :searchable="true"
                  :selected="selected"
                  :options="[
                  'Resolved',
                  'Escalated',
                  ]"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">                
              <h5>Details</h5>
                <vue-editor
                v-model="editData.detail"
                  label="Details"
                  id="compedit"                 
                >
                </vue-editor>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <h5>Advice</h5>
                <vue-editor
                  v-model="editData.advice"
                  label="Advice"
                  id="compedit"
                  placeholder="Please enter the advice given"
                >
                </vue-editor>
              </CCol>
            </CRow>             
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="edit_complaint = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:600px" color="primary"  @click="EditComplaints" aria-pressed="true">Submit</CButton>
            </div>
 </CModal>
 <!-- Edit_Complaint Modal End -->

<!-- Delete_Complaint Modal -->
 <CModal
      title="Delete complaint"
      :show.sync="del_complaint"
      color="danger"
      footer="false"
    >      
    <CRow>
      <CCol sm="12">
        <h3>Your are deleting complaint {{delData.name}}</h3>
      </CCol>
    </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="del_complaint = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:320px" color="primary"  @click="deletecomplaint" aria-pressed="true">Delete</CButton>
            </div>
 </CModal>
 <!-- Delete_Complaint Modal End -->

<!-- Close_Complaint Modal -->
 <CModal
      title="Close complaint"
      :show.sync="close_complaint"
      color="warning"
      footer="false"
    >      
    <CRow>
      <CCol sm="12">
        <h3>Your are closing complaint {{closeData.name}}</h3>
      </CCol>
    </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="close_complaint = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:320px" color="primary"  @click="closethiscomplaint" aria-pressed="true">Close</CButton>
            </div>
 </CModal>
 <!-- Close_Complaint Modal End -->
    <CRow>
      <CCol sm="12">
        <CDataTable
          :items="ComplaintGet"
          :fields="fields"
          hover
          striped
          border
          items-per-page-select
          :items-per-page="5"
          pagination
          
        >
        <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
          </td>
        </template>
        <template #action="{item}">
          <td>            
            <CButton v-if="item.status !='Resolved'" size="sm" color="warning"  @click="closecomplaint(item)">Close</CButton>
            <CButton color="success" size="sm" @click="editcomplaint(item)">Edit</CButton>
            <CButton color="danger" size="sm" @click="delcomplaint(item)">Delete</CButton>
          </td>
        </template>

        </CDataTable>
      </CCol>
    </CRow>
    
  </div>
</template>
<style>
#editor{
  min-height: 200px;
}
</style>
<script>
import {mapActions,mapGetters,mapState} from 'vuex'
import { VueEditor } from "vue2-editor";

export default {  
  components: {
    VueEditor
  },
  name: 'Tables',
    data () {
    return {
      edit_complaint: false,
      del_complaint: false,
      close_complaint: false,
      editData:{},
      delData:{
        id:"",
      },
      closeData:{
        id:"",
      },
    }
  },
  props:{
  items: Array,
  fields: {
      type: Array,
      default () {
        return [
            { key: 'business', _style: { width: '5%'} },
            { key: 'branch', _style: { width: '5%'} },
            { key: 'name', _style: { width: '5%'} },
            { key: 'detail', _style: { width: '15%'} },
            { key: 'status',  _style: { width: '5%'} },
            { key: 'staff', label:'Forwarded to', _style: { width: '10%'} },
            {
              key: 'action',
              label: 'Action',
              _style: { width: '40%' },
          }
        ]
      }
    }
  },
  methods:{
       ...mapActions({
           FetchComplaint:"complaints/fetchComplaint",
           AddComplaint:"complaints/addComplaint",
           EditThisComplaint:"complaints/updateComplaint",
           Delete_Complaint:"complaints/delComplaint",
           Close_Complaint:"complaints/closeComplaint",
           FetchStaff:"staff/fetchStaff"

       }),
       getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Escalated' ? 'warning'
          : status === 'Resolved' ? 'success'
            : status === 'Banned' ? 'danger' : 'primary'
    },
       EditComplaints(){
         this.EditThisComplaint(this.editData)
         this.edit_complaint = false
    },

    delcomplaint(item){      
        this.delData.id = item.id		   
			  this.delData.name = item.name
        this.del_complaint = true
      },  
    closecomplaint(item){      
        this.closeData.id = item.id		   
			  this.closeData.name = item.name
        this.close_complaint = true
      },  
    deletecomplaint(){
      this.Delete_Complaint(this.delData),
			this.del_complaint = false;
    }, 
    closethiscomplaint(){
      this.Close_Complaint(this.closeData),
			this.close_complaint = false;
    }, 
    editcomplaint(item){
      let editObject ={
                business:item.business,
                branch:item.branch,
                name:item.name,
                detail:item.detail,
                advice:item.advice,
                status:item.status,
                staff_id:item.staff_id,
                id:item.id,
      }
    this.editData = editObject
    this.edit_complaint = true
    }
  },
        computed:{
         ...mapGetters('complaints',['ComplaintGet']),
         ...mapGetters('staff',['staffGet']),
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
    this.FetchComplaint(),
    this.FetchStaff()
        }
		
}
</script>
