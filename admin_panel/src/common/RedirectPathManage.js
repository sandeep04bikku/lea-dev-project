import { history } from "./helpers";

export function loginRedirectCall() {
  // let path= window.location.protocol+"//"+window.location.host+"/admin"
  //    window.open(path,'mywindow').focus()
  // console.log(path)
  // window.location.pathname = "/";
}

export function logOutRedirectCall() {
  console.log("inside logout redirect");
  localStorage.clear();
  history.navigate("/");
  // window.location.reload();
  // loginRedirectCall();
}

export function loginStoreData(data) {
  //console.log('localhost permi===========',data.permission)
  localStorage.setItem("isLogin", true);
  localStorage.setItem("Atoken", data.token);
  localStorage.setItem("Aid", data._id);
  localStorage.setItem("Aemail", data.email);
  localStorage.setItem("Acountry_code", data.country_code);
  localStorage.setItem("Aphone", data.phone);
  localStorage.setItem("Afirst_name", data.first_name);
  localStorage.setItem("Alast_name", data.last_name);
  localStorage.setItem("Arole", data.role);
}
