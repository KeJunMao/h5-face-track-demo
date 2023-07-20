export enum TIPS {
  DEFAULT = "未检测到人脸, 请将正面对准手机",
  SCANING = "正在识别，请保持姿势不变",
}

function mediaErrorCaptured(error: any) {
  const nameMap = {
    AbortError: "操作中止",
    NotAllowedError: "打开设备权限不足，原因是用户拒绝了媒体访问请求",
    NotFoundError: "找不到满足条件的设备",
    NotReadableError:
      "系统上某个硬件、浏览器或网页层面发生的错误导致设备无法被访问",
    OverConstrainedError: "指定的要求无法被设备满足",
    SecurityError: "安全错误，使用设备媒体被禁止",
    TypeError: "类型错误",
    NotSupportedError: "不支持的操作",
    NetworkError: "网络错误发生",
    TimeoutError: "操作超时",
    UnknownError: "因未知的瞬态的原因使操作失败)",
    ConstraintError: "条件没满足而导致事件失败的异常操作",
  };
  const messageMap = {
    "permission denied": "麦克风、摄像头权限未开启，请检查后重试",
    "requested device not found": "未检测到摄像头",
    "could not start video source": "无法访问到摄像头",
  };

  let nameErrorMsg = nameMap[error.name as keyof typeof nameMap];
  if (!nameErrorMsg) {
    nameErrorMsg =
      messageMap[error.message.toLowerCase() as keyof typeof messageMap] ??
      "未知错误";
  }
  return nameErrorMsg;
}

export function useFaceTrack() {
  const video = ref<HTMLVideoElement>();
  const { stream, start, stop } = useUserCamera()
  const tips = ref<string>(TIPS.DEFAULT);
  const tracker = shallowRef<tracking.ObjectTracker>();
  function initTracker() {
    tracker.value = new tracking.ObjectTracker("face");
    tracker.value.setInitialScale(4);
    tracker.value.setStepSize(2);
    tracker.value.setEdgesDensity(0.1);
    tracking.track(video.value!, tracker.value);
    tracker.value.on("track", (event) => {
      if (event.data.length) {
        tips.value = TIPS.SCANING;
      } else {
        tips.value = TIPS.DEFAULT;
      }
    });
  }

  async function init() {
    try {
      await start();
    } catch (error) {
      tips.value = mediaErrorCaptured(error);
    }
  }

  async function tryPlay() {
    try {
      await video.value?.play();
    } catch (error) {}
  }

  watchEffect(() => {
    if (video.value) {
      video.value.srcObject = stream.value!;
      nextTick(async () => {
        await tryPlay();
        video.value?.addEventListener(
          "loadeddata",
          async () => {
            await tryPlay();
          },
          {
            once: true,
          }
        );
      });
    }
  });

  onMounted(initTracker.bind(window));
  onUnmounted(() => {
    tracker.value?.removeAllListeners();
    stop();
  });

  return {
    video,
    stream,
    tips,
    init,
    tracker,
  };
}
