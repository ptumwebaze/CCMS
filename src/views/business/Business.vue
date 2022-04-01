
<template>
  <div>
    <FlashMessage></FlashMessage>
<CRow col="6" sm="6" md="2" class="mb-xl-4">
      <CButton class="btn btn-primary" style="width:150px; margin-left:1000px"  @click="add_business = true" aria-pressed="true">Add Business</CButton>
</CRow>

<!-- Add staff modal -->
 <CModal
      title="Register Business"
      :show.sync="add_business"
      color="primary"
      :hide-footer="true"
    >           
            <CRow>
              <CCol sm="6">
                <CInput
                v-model="userinputs.name"
                  label="Business Name"
                  placeholder="Please enter business name"
                />
              </CCol>
              <CCol sm="6">
                <CSelect
                v-model="userinputs.product"
                  label="Product"
                  :options="[
                  'Select the product',
                  'Poscream sales',
                  'School Monitor',
                  'Mfuko Plus',
                  'Clinic Plus',]"
                />
              </CCol>
            </CRow> 
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="userinputs.branchnumber"
                  label="No. of Branches"
                  type="number"
                  placeholder="Please enter the no. of branch"
                />
              </CCol>
            </CRow>
            <CRow v-if="userinputs.branchnumber>1">
              <CCol sm="12">
                <CInput
                v-model="userinputs.branch"
                  label="Branches"
                  placeholder="Please enter the branches"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="userinputs.email"
                  label="Business Email"
                  placeholder="Please enter the business email"
                />
              </CCol>
            </CRow>            
            <CRow>
              <CCol sm="6">
                <CInput
                v-model="userinputs.person"
                  label="Contact Person"
                  placeholder="Please enter the contact person"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                v-model="userinputs.contact"
                  label="Contact"
                  placeholder="Please enter the contact"
                />
              </CCol>
            </CRow>            
            <CRow>
              <CCol sm="6">
                <CInput
                v-model="userinputs.startdate"
                  label="Start Date"
                  type="date"
                  placeholder="Please enter the contact person"
                />
              </CCol>
              <CCol sm="6">
                <CSelect
                  v-model="userinputs.priority"
                  label="Priority"                  
                  :options="[
                  'Select the priority level',
                  'High',
                  'Medium',
                  'Low',
                  ]"
                />
              </CCol>
            </CRow>            
            <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="add_business = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:290px" color="primary"  @click="addNewBusiness" aria-pressed="true">Submit</CButton>
            </div>
           
 </CModal>
 <!-- Add staff modal end -->

<!-- Edit staff modal -->
 <CModal
      title="Edit Business Details"
      :show.sync="edit_business"
      color="success"
      :hide-footer="true"
    >
         <CRow>
              <CCol sm="6">
                <CInput
                v-model="editData.name"
                  label="Business Name"
                  placeholder="Please enter the business name"
                />
              </CCol>
              <CCol sm="6">
                <CSelect
                selected="selected"
                v-model="editData.product"
                  label="Product"
                  :options="[
                  'Select the product',
                  'Poscream sales',
                  'School Monitor',
                  'Mfuko Plus',
                  'Clinic Plus',
                  ]"
                />
              </CCol>
            </CRow> 
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="editData.branchnumber"
                  label="No. of Branches"
                  placeholder="Please enter the no. of branch"
                />
              </CCol>
            </CRow>
            <CRow v-if="editData.branchnumber>1">
              <CCol sm="12">
                <CInput
                v-model="editData.branch"
                  label="Branches"
                  placeholder="Please enter the branches"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="editData.email"
                  label="Business Email"
                  placeholder="Please enter the business email"
                />
              </CCol>
            </CRow>            
            <CRow>
              <CCol sm="6">
                <CInput
                v-model="editData.person"
                  label="Contact Person"
                  placeholder="Please enter the contact person"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                v-model="editData.contact"
                  label="Contact"
                  placeholder="Please enter the contact"
                />
              </CCol>
            </CRow>   
            <CRow>
              <CCol sm="6">
                <CInput
                v-model="editData.startdate"
                  label="Start Date"
                  typr="date"
                  placeholder="Please enter the contact person"
                />
              </CCol>
              <CCol sm="6">
                <CSelect
                  v-model="editData.priority"
                  label="Priority"                  
                  :options="[
                  'Select the priority level',
                  'High',
                  'Medium',
                  'Low',
                  ]"
                />
              </CCol>
            </CRow>           
            <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="edit_business = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:290px" color="primary"  @click="EditBusiness" aria-pressed="true">Submit</CButton>
            </div>
 </CModal>
 <!-- Edit staff modal end -->

<!-- Delete_Complaint Modal -->
 <CModal
      title="Delete Business"
      :show.sync="del_business"
      color="danger"
      footer="false"
    >      
    <CRow>
      <CCol sm="12">
        <h3>Your are deleting Business {{delData.name}}</h3>
      </CCol>
    </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="del_business = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:320px" color="primary"  @click="deletethisbusiness" aria-pressed="true">Delete</CButton>
            </div>
 </CModal>
 <!-- Delete_Complaint Modal End -->

    <CRow>
      
      <CCol sm="12">
        <CDataTable
          :items="BusinessGet"
          :fields="fields"
          striped
          border
          items-per-page-select
          :items-per-page="5"
          pagination
        >
        <template #action="{item}">
          <td>
            <CButton color="success"  @click="editbusiness(item)">Edit</CButton>
            <CButton color="danger"  @click="delbusiness(item)">Delete</CButton>
          </td>
        </template>
        </CDataTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'


export default {
  name: 'Modals',
  data () {
    return {
      add_business: false,
      edit_business: false,
      del_business: false,
      userinputs:{
                name:"",
                product:"",
                branchnumber:"",
                branch:"",
                email:"",
                person:"",
                contact:"",
                startdate:"",
                priority:"",
      },
      editData:{},
      delData:{
        id:"",
      },  
    }
  },
  props:{
  fields: {
      type: Array,
      default () {
        return [
          { key: 'name', _style: { width: '10%'} },
            { key: 'branch', _style: { width: '20%'} },
            { key: 'product', _style: { width: '20%'} },
            { key: 'email', _style: { width: '10%'} },
            { key: 'person', _style: { width: '20%'} },
            { key: 'contact', _style: { width: '20%'} },
            {
              key: 'action',
              label: 'Action',
              _style: { width: '20%' },
          }
        ]
      }
    },
  },
  name: 'Tables',
  methods: {

    ...mapActions({
         FetchBusiness:"business/fetchBusiness",
         AddBusiness:"business/addbusiness",
         Edit_Business:"business/updatebusiness",
         Delete_Business:"business/delBusiness"
     }),
     addNewBusiness(){
         this.AddBusiness(this.userinputs),
         this.add_business = false
        
    },
   EditBusiness(){
         this.Edit_Business(this.editData)
         this.edit_business = false
    },

    delbusiness(item){      
        this.delData.id = item.id		   
			  this.delData.name = item.name
        this.del_business = true
      },  
    deletethisbusiness(){
      this.Delete_Business(this.delData),
			this.del_business = false;
    }, 
    editbusiness(item){
      let editObject ={
                name:item.name,
                product:item.product,
                branchnumber:item.branchnumber,
                branch:item.branch,
                business:item.business,
                branch:item.branch,
                email:item.email,
                person:item.person,
                contact:item.contact,
                startdate:item.startdate,
                priority:item.priority,
                id:item.id,
      }
    this.editData = editObject
    this.edit_business = true
    }
  },
  computed:{
       ...mapGetters('business',['BusinessGet']),
        ...mapState('notification',['notificationtype','notification_message','notification_show']),
      },
     
watch:{
          notification_message(newval){
            if(newval && this.notificationtype=='success'){
      this.flashMessage.success({title: 'Success', message: newval});
            }else if(newval && this.notificationtype=='danger'){

this.flashMessage.error({title: 'Error', message: newval});
            }else{
              
            }
          }

        },
   created(){
  this.FetchBusiness();
      }
}
</script>
