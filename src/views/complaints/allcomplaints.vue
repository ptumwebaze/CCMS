

<template>
  <div>

    <CRow>
      <CCol sm="12">
        <CDataTable
          :items="ComplaintGet"
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
         <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
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
  props:{
  fields: {
      type: Array,
      default () {
        return [
          { key: 'view', _style: { width: '10%'} },
            { key: 'business', _style: { width: '10%'} },
            { key: 'detail', _style: { width: '20%'} },
            { key: 'advice', _style: { width: '20%'} },
            { key: 'status', _style: { width: '10%'} },
            { key: 'registeredon', _style: { width: '10%'} },
            { key: 'staff', label:'Forwarded to', _style: { width: '10%'} },
            
        ]
      }
    },
  },
  methods:{
       ...mapActions({
         FetchComp:"complaints/fetchMyComp",
           FetchComplaint:"complaints/fetchComplaint",
       }),
       getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Escalated' ? 'warning'
          : status === 'Resolved' ? 'success'
            : status === 'Banned' ? 'danger' : 'primary'
    }
        },
        computed:{
         ...mapGetters('complaints',['ComplaintGet']),
         ...mapGetters('complaints',['MyCompGet'])
        },
       

     created(){
    this.FetchComplaint(),
    this.FetchComp();
        }
		
}
</script>