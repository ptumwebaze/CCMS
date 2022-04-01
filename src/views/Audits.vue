<template>
  <CCardBody>
    <CDataTable
      :items="auditGet"
      :fields="fields"
      column-filter
      table-filter
      hover
      sorter
      items-per-page-select
      :items-per-page="5"
      pagination
    >
      
    </CDataTable>
  </CCardBody>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

const fields = [
  { key: 'action', _style:'min-width:200px' },
  { key: 'addedby', _style:'min-width:100px;' },
  { key: 'on', _style:'min-width:100px;' },

]

export default {
  name: 'AdvancedTables',
  data () {
    return {
      fields,
    }
  },
  methods: {
    ...mapActions({
           FetchAudits:"audits/fetchAudits"
       })
 },
        computed:{
         ...mapGetters('audits',['auditGet'])
        },
    created(){
this.FetchAudits();
    }
}
</script>
