<template>
  <a-result
    status="404"
    title="404"
    sub-title="当前页面不存在，请检查url地址是否正确"
  >
    <template #extra>
      <router-link to="/login" class="btn">返回首页</router-link>
    </template>
  </a-result>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.btn {
  font-size: 20px;
}
.ant-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<style lang="scss">
.ant-result-title {
  font-size: 50px;
}
.ant-result-subtitle {
  font-size: 20px;
  color: black;
}
</style>
