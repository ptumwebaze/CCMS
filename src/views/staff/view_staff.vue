<template>
  <div>
    <CRow>      
      <CCol sm="12">
        <CDataTable
          :items="staffGet"
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
        />
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
          { key: 'name', _style: { width: '10%'} },
            { key: 'email', _style: { width: '10%'} },
            { key: 'contact', _style: { width: '20%'} },
            { key: 'position', _style: { width: '20%'} },
            
        ]
      }
    },
  },
  methods: {
    ...mapActions({
         FetchStaff:"staff/fetchStaff",
     }),
  },
  computed:{
       ...mapGetters('staff',['staffGet'])
      },
   created(){
  this.FetchStaff();
      }
}
</script>
