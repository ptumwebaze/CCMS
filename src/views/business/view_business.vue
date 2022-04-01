<template>
  <div>
     <CRow>
      
      <CCol sm="12">
        <CDataTable
          :items="BusinessGet"
          :fields="fields"
          striped
          border
          column-filter
          table-filter
          hover
          sorter
          items-per-page-select
          :items-per-page="5"
          pagination
        >
        <!-- <template #complaint="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
          </td>
        </template> -->
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
            { key: 'name'},
            { key: 'branch'},
            { key: 'product'},
            { key: 'email'},
            { key: 'person'},
            { key: 'contact'},
            {
              key: 'complaint',
              label: 'Complaints',
          }
            
        ]
      }
    },
  },
  methods: {
    ...mapActions({
         FetchCustomer:"business/fetchBusiness",
     }),
     getBadge (status) {
      return status === 'Resolved' ? 'success'
          : status === 'Escalated' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    }   
  },
  computed:{
       ...mapGetters('business',['BusinessGet'])
      },
     created(){
  this.FetchCustomer();
      }
}
</script>
