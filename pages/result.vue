<script lang="ts" setup>
const faceList = useState<string[]>("face-list", () => []);
</script>
<template>
  <div class="container mx-auto">
    <div class="box-border px-6">
      <van-empty>
        <div class="flex flex-col items-center space-y-2 justify-center">
          <div>验证成功</div>
          <div class="text-sm color-stone">验证已通过，点击下一步继续操作</div>
        </div>
        <template #image>
          <div
            class="flex h-full text-9xl color-green items-center justify-center"
          >
            <div class="i-tabler:discount-check-filled"></div>
          </div>
        </template>
      </van-empty>
      <van-button type="primary" block to="/">下一步</van-button>
      <div class="flex flex-wrap items-center justify-between my-8">
        <div v-for="(item, index) in faceList" class="my-1" :key="item">
          <van-image
            width="100"
            height="134"
            fit="cover"
            :src="item"
            @click="showImagePreview(faceList, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
