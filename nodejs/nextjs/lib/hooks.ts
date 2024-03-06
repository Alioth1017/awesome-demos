import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import useSWR, { mutate } from "swr";

async function fetcher<T>(options: AxiosRequestConfig): Promise<T> {
  let response: AxiosResponse;
  response = await axios.request(options);
  return response.data;
}

export function useAuthLogin(username: string, password: string) {
  const request = {
    url: "/api/auth/login",
    method: "POST",
    data: { username, password },
  };

  const { data, error, isLoading } = useSWR(request.url, fetcher, {
    revalidateOnMount: false, // 禁用页面加载时触发请求
    revalidateOnFocus: false, // 禁用页面聚焦时触发请求
    revalidateIfStale: false, // 避免触发过时数据的重新验证
    shouldRetryOnError: false, // 禁用错误重试
  });
  const run = async () => {
    // 发起请求获取数据
    const newData = await fetcher(request);
    // 更新 SWR 缓存
    mutate(request, newData, false);
  };
  return { data, run, error, isLoading };
}

export function useAuthRegister(username: string, password: string) {
  const request = {
    url: "/api/auth/register",
    method: "POST",
    data: { username, password },
  };

  const { data, error, isLoading } = useSWR(request.url, fetcher, {
    revalidateOnMount: false, // 禁用页面加载时触发请求
    revalidateOnFocus: false, // 禁用页面聚焦时触发请求
    revalidateIfStale: false, // 避免触发过时数据的重新验证
    shouldRetryOnError: false, // 禁用错误重试
  });
  const run = async () => {
    // 发起请求获取数据
    const newData = await fetcher(request);
    // 更新 SWR 缓存
    mutate(request, newData, false);
  };
  return { data, run, error, isLoading };
}
