<template>
  <div>

    <CRow>
      <CCol sm="12">
        <CDataTable
          :items="GetUsers"
          :fields="fields"
          hover
          striped
          border
          items-per-page-select
          :items-per-page="5"
          pagination
          column-filter
          table-filter
          sorter
          caption="Combined All Table"
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
        return ['name', 'email', 'createdon']
      }
    },
  },
  methods:{
       ...mapActions({
           FetchUser:"users/fetchUsers",
           AddUser:"users/adduser"
       }),
        },
        computed:{
         ...mapGetters('users',['GetUsers'])
        },
       

     created(){
    this.FetchUser();
        }
		
}
</script>
