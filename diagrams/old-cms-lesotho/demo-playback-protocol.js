/**
 * Demo role playback postMessage wire (docs ↔ portal iframes).
 * Demo hosts only.
 */
export const DEMO_PLAYBACK_VERSION = 1
export const DEMO_PLAYBACK_READY = "raisd.demo.playback.ready"
export const DEMO_PLAYBACK_EXECUTE = "raisd.demo.playback.execute"
export const DEMO_PLAYBACK_DONE = "raisd.demo.playback.done"
export const DEMO_PLAYBACK_ERROR = "raisd.demo.playback.error"

export const DEMO_PLAYBACK_PARENT_ORIGINS = [
  "https://docs.raisd.co",
  "http://127.0.0.1:8765",
  "http://localhost:8765",
  "http://127.0.0.1:4173",
  "http://localhost:4173",
]

export function isTrustedPlaybackParent(origin) {
  return DEMO_PLAYBACK_PARENT_ORIGINS.includes(origin)
}

export function isPlaybackReadyMessage(data) {
  return (
    data &&
    typeof data === "object" &&
    data.type === DEMO_PLAYBACK_READY &&
    data.version === DEMO_PLAYBACK_VERSION
  )
}

export function isPlaybackExecuteMessage(data) {
  return (
    data &&
    typeof data === "object" &&
    data.type === DEMO_PLAYBACK_EXECUTE &&
    data.version === DEMO_PLAYBACK_VERSION &&
    typeof data.sceneId === "string" &&
    typeof data.requestId === "string"
  )
}

export function isPlaybackResultMessage(data) {
  return (
    data &&
    typeof data === "object" &&
    (data.type === DEMO_PLAYBACK_DONE || data.type === DEMO_PLAYBACK_ERROR) &&
    data.version === DEMO_PLAYBACK_VERSION &&
    typeof data.requestId === "string" &&
    typeof data.sceneId === "string"
  )
}

export function makeExecuteMessage({ sceneId, roleId, requestId }) {
  return {
    type: DEMO_PLAYBACK_EXECUTE,
    version: DEMO_PLAYBACK_VERSION,
    sceneId,
    roleId: roleId || "",
    requestId,
  }
}
