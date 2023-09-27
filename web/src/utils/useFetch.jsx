import { useEffect, useState } from "react";
import axios from "axios";
import fetch from '../auth/FetchInterceptor'
import fetchChat from '../auth/FetchChatInterceptor'
import { notification } from "antd";


const useAxios = (AxiosConfig, responseKey) => {
  const {
    onComplete = (res) => {},
    success = (res) => {},
    error = (res) => {},
    strategy = '',
    ...config
  } = AxiosConfig;

  const [data, setData] = useState(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function() {
    let source = axios.CancelToken.source();
    setLoadingDone(false);
    setIsLoading(true);
    if(strategy === 'chat'){
      fetchChat(config)
      .then((res) => {
        onComplete(res);
        success(res);
        if (responseKey) {
          if (typeof responseKey == "function") {
            setData(responseKey(res));
          } else if (typeof responseKey === "string") {
            setData(res[responseKey]);
          } 
          
        } else {
          setData(res);
        }
        setLoadingDone(true);
        setIsLoading(false);
      })
      .catch((err) => {
        onComplete(err);
        error(err);
        setLoadingDone(true);
        setIsLoading(false);
      });
    }
    else {
      fetch(config)
      .then((res) => {
        onComplete(res);
        success(res);
        if (responseKey) {
          if (typeof responseKey == "function") {
            setData(responseKey(res));
          } else if (typeof responseKey === "string") {
            setData(res[responseKey]);
          } 
          
        } else {
          setData(res);
        }
        setLoadingDone(true);
        setIsLoading(false);
      })
      .catch((err) => {
        onComplete(err);
        error(err);
        setLoadingDone(true);
        setIsLoading(false);
      });
    }
    

    return function() {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  return { data, setData, loadingDone, isLoading };
};

const useAxiosCallback = () => {
  const [data, setData] = useState(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const callback = function(AxiosConfig, responseKey) {
    const {
      onComplete = (res) => {},
      success = (res) => {},
      error = (res) => {},
      strategy = '',
      ...config
    } = AxiosConfig;

    let source = axios.CancelToken.source();
    setLoadingDone(false);
    setIsLoading(true);
    if(strategy === 'chat'){
      fetchChat(config)
      .then((res) => {
        
        onComplete(res);
        if (res.status === 400) {
         notification.error({
            message: res.message,
          });
          error(res);
        } else {
          success(res);
          if (responseKey) {
            setData(res[responseKey]);
          } else {
            setData(res);
          }
        }

        setLoadingDone(true);
        setIsLoading(false);

      })
      .catch((err) => {
        onComplete(err);
        error(err);
        setLoadingDone(true);
        setIsLoading(false);
      });

    }
    else{
      fetch(config)
      .then((res) => {
        
        onComplete(res);
        if (res.status === 400) {
         notification.error({
            message: res.message,
          });
          error(res);
        } else {
          success(res);
          if (responseKey) {
            setData(res[responseKey]);
          } else {
            setData(res);
          }
        }

        setLoadingDone(true);
        setIsLoading(false);

      })
      .catch((err) => {
        onComplete(err);
        error(err);
        setLoadingDone(true);
        setIsLoading(false);
      });

    }
    
    return function() {
      
      source.cancel("Cancelling in cleanup");
      
    };
  };

  return { data, setData, loadingDone, isLoading, callback };
};


export { useAxios, useAxiosCallback};
