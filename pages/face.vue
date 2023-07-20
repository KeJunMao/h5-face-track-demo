<script setup lang="ts">
const { init, tips, tracker, video } = useFaceTrack();
/**
 * 人脸结果
 */
const faceResultList = useState<string[]>("face-list", () => []);
faceResultList.value = [];
/**
 * 获取 9 个人头
 */
const maxResultCount = 9;
/**
 * 已经获取了的人脸数
 */
const currentResultCount = computed(() => faceResultList.value.length);
/**
 * 随便写的颜色
 */
const colors = ["bg-white", "bg-red", "bg-blue", "bg-yellow", "bg-green"];
/**
 * 模拟自动换颜色
 */
const currentColor = computed(
  () => colors[currentResultCount.value % colors.length]
);

/**
 * 调用初始化
 */
init();

/**
 * 节流使用 canvas 保存人脸
 */
const saveFace = useThrottleFn(() => {
  const canvas = document.createElement("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(video.value!, 0, 0);
  faceResultList.value.push(canvas.toDataURL("image/png", 0.3));
}, 500);

/**
 * 人脸数够了就停止并跳转到结果页
 */
watchEffect(() => {
  if (faceResultList.value.length >= maxResultCount) {
    stop();
    navigateTo("/result", {
      replace: true,
    });
  }
});

onMounted(() => {
  tracker.value?.on("track", (event) => {
    // 检测到人脸就保存
    if (event.data.length) {
      saveFace();
    }
  });
});
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col justify-center items-center space-y-8 box-border pb-30"
    :class="currentColor"
  >
    <p class="text-xl px-6 text-center">{{ tips }}</p>
    <div class="relative">
      <video
        ref="video"
        muted
        autoplay
        webkit-playsinline
        playsinline
        x5-video-player-type="h5-page"
        class="w-50 h-50 rounded-full object-cover rotate-y-180 bg-black"
      />
      <van-circle
        :current-rate="(currentResultCount / maxResultCount) * 100"
        layer-color="#eee"
        :rate="maxResultCount"
        class="w-50! h-50! absolute! left-0 top-0"
      />
    </div>
  </div>
</template>
