<template>
  <div class="container mx-auto">
    <div class="px-6">
      <div class="flex mt-8 items-center justify-center color-blue-600">
        <div class="i-tabler:face-id text-6xl"></div>
      </div>
      <div class="mt-8 mb-2 text-xl">您即将进行实名核身验证</div>
      <div class="text-sm mb-12">
        为了您顺利的通过认证，请先确认认证设备与环境满足以下条件：
      </div>
      <div class="flex flex-col space-y-8 mb-12 text-base">
        <div class="flex items-center">
          <div class="i-tabler:device-mobile-star mr-1 color-blue-600"></div>
          手机屏幕亮度调制最大
        </div>
        <div class="flex items-center">
          <div class="i-tabler:sun mr-1 color-blue-600"></div>
          避免环境光过强或过暗
        </div>
        <div class="flex items-center">
          <div class="i-tabler:user-circle mr-1 color-blue-600"></div>
          正面对准手机拍摄
        </div>
      </div>
      <van-button type="primary" block to="/face">开始识别</van-button>
    </div>
  </div>
</template>
