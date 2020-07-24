//使用cookie

import cookie from 'cookie_js'

//token
export function getToKen() {
  return cookie.get("admin_toKen")
}

export function setToKen(value) {
  return cookie.set("admin_toKen", value)
}

export function removeToKen() {
  return cookie.remove("admin_toKen")
}

//username
export function setUserName(value) {
  return cookie.set("userName", value)
}

export function getUserName() {
  return cookie.get("userName")
}

export function removeUserName() {
  return cookie.remove("userName")
}