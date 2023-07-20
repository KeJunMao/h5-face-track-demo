

export function useUserCamera() {
  return useUserMedia({
    constraints: { video: { facingMode: "user" }, audio: false },
  });
}
