<template>
  <div>
    <p>
      <label style="margin-right: 16px;">切换 Loading</label>
      <el-switch v-model="loading" />
    </p>
    <el-skeleton style="width: 1000px" :loading="loading" animated :throttle="500">
      <template slot="template">
        <el-skeleton-item variant="image" style="width: 1000px; height: 300px;" />
        <div style="padding: 14px;">
          <el-skeleton-item variant="p" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between;">
            <el-skeleton-item variant="text" style="margin-right: 16px;" />
            <el-skeleton-item variant="text" style="width: 30%;" />
          </div>
        </div>
      </template>
      <!-- <template>
        <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom card-header">
              <span class="time">123</span>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </template> -->
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"/>
    </el-skeleton>
  </div>
</template>
<script>
export default {
  name: 'BlogLoading',
  data(){
    return {
    loading: true
  }
  }
}
</script>