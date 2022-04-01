<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>
   <CHeaderNav style="margin-left:970px">
      {{ getUser.name }}
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  methods: {
			...mapActions({
				fetchUser:"login/authuser"
			}),
		},
		computed:{
			...mapGetters('login',['getUser'])
			},
		created(){
		this.fetchUser();
		},
}
</script>
