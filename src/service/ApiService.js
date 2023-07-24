import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  console.log(
    "headers: ",
    options.headers,
    "url: ",
    options.url,
    "methods: ",
    options.method
  );

  if (request) {
    console.log("first Request -> ", request);
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      if (!response.ok) {
        // 403 상태 코드인 경우 에러를 생성하여 반환
        if (response.status === 403 || response.status === 400) {
          return Promise.reject({
            status: response.status,
            message: "Access forbidden",
          });
        }
        return response.json().then((json) => Promise.reject(json));
      }
      return response.json();
    })
    .catch((error) => {
      // 추가된 부분
      console.log();
      if (error.status === 403) {
        window.location.href = "/login"; // redirect
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    console.log(response);
    if (response.token) {
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
      // token이 존재하는 경우 Todo 화면으로 리디렉트
      window.location.href = "/";
    }
  });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}
