<template>
  <CFooter :fixed="false">
    <div>
      <a href="www.nugsoft.com" target="_blank">CCMS</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} Let's do it for you.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="www.nugsoft.com">Nugsoft Technologies Limited</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
