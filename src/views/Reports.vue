<template>

  <CCardBody>
    <!-- <vue-excel-xlsx
        :data="ComplaintGet"
        :columns="fields"
        :file-name="'Complaints report'"
        :file-type="'xlsx'"
        :sheet-name="'report_1'"
        >
        Download
    </vue-excel-xlsx> -->
    <CDataTable
      :items="ComplaintGet"
      :fields="fields"
      column-filter
      table-filter
      items-per-page-select
      :items-per-page="5"
      hover
      sorter
      pagination
    >
        <template #status="{item}">
              <td>
                <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
              </td>
        </template>
    </CDataTable>
  </CCardBody>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
// import { CSmartTable } from '@coreui/vue-pro'
// import CSmartTable from '@coreui/vue-pro/src/components/smart-table/CSmartTable'


const fields = [
  { key: 'name', _style:'min-width:50px' },
  { key: 'business', _style:'min-width:50px;' },
  { key: 'branch', _style:'min-width:50px;' },
  { key: 'detail', _style:'min-width:70px;' },
  { key: 'advice', _style:'min-width:70px;' },
  { key: 'status', _style:'min-width:30px;' },
  { key: 'addedon', _style:'min-width:30px;' },

]

export default {
  name: 'AdvancedTables',
  data () {
    return {
      fields,
    }
  },
  methods:{
       ...mapActions({
           FetchComplaint:"complaints/fetchComplaint",
       }),
       getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    }
        },
        computed:{
         ...mapGetters('complaints',['ComplaintGet'])
        },
       

     created(){
    this.FetchComplaint();
        }
		
}
</script>
