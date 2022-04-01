<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-bell"/> Profile
    </CDropdownItem>
    <CDropdownItem to="/settings">
      <CIcon name="cil-envelope-open" /> Settings
    </CDropdownItem>
    <CDropdownItem  @click="logout()">
      <CIcon name="cil-task" /> Log Out
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods:{
       ...mapActions({
           Log_Out:"users/logout",
       }),
      logout(){
        this.Log_Out()
      } 
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>