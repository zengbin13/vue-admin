import service from "../utils/request.js";

export function AddFirstCategory(data) {
  return service.request({
    method: "POST",
    url: "/news/addFirstCategory/",
    data
  });
}
export function AddChildrenCategory(data) {
  return service.request({
    method: "POST",
    url: "/news/addChildrenCategory/",
    data
  });
}
export function GetCategoryAll() {
  return service.request({
    method: "POST",
    url: "/news/getCategoryAll/",
  });
}
export function GetCategory() {
  return service.request({
    method: "POST",
    url: "/news/getCategory/",
  });
}
export function DeleteCategory(data) {
  return service.request({
    method: "POST",
    url: "/news/deleteCategory/",
    data
  });
}

