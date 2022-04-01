<template>
  <div>
     <FlashMessage></FlashMessage>
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
          :items="MyCompGet"
          :fields="fields"
          column-filter
          table-filter
          hover
          sorter
          striped
          border
          items-per-page-select
          :items-per-page="5"
          pagination
        >
      <template #action="{item}">
          <td>            
            <CButton size="sm" color="warning"  @click="closecomplaint(item)">Close</CButton>
          </td>
        </template>
        <template #view="{item}">
          <td>  
            <router-link :to="{ name: 'Complaint Details', params: {id: item.id }}">
            <a >{{item.name}}</a> 
            </router-link>
          </td>
        </template>
        </CDataTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
data(){
    return{
        close_complaint: false,
        closeData:{
        id:"",
      },
    }
},
props:{
  fields: {
      type: Array,
      default () {
        return [
          { key: 'view', _style: { width: '10%'} },
            { key: 'business', _style: { width: '10%'} },
            { key: 'detail', _style: { width: '20%'} },
            { key: 'advice', _style: { width: '20%'} },
            { key: 'registeredon', _style: { width: '10%'} },
            { key: 'action', _style: { width: '10%'} },
        ]
      }
    },
  },
  methods:{
       ...mapActions({
           FetchComp:"complaints/fetchMyComp",
           Close_Complaint:"complaints/closeComplaint",
       }),
       closecomplaint(item){      
        this.closeData.id = item.id		   
		    this.closeData.name = item.name
        this.close_complaint = true
      },
      closethiscomplaint(){
      this.Close_Complaint(this.closeData),
	    this.close_complaint = false;
    },
       getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    }
        },
        computed:{
         ...mapGetters('complaints',['MyCompGet'])
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
    this.FetchComp();
        }
		
}
</script>

