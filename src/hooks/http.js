import { useState, useEffect } from "react";

export default (axios) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                onShowModal();
                return config;
            },
            (error) => {
                setError(error);
                return Promise.reject(error);
            }
        );
        const responseInterceptor = axios.interceptors.response.use(
            (config) => {
                return config;
            },
            (error) => {
                setError(error);
                return Promise.reject(error);
            }
        );
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [axios.interceptors.request, axios.interceptors.response]);
    const onShowModal = () => {
        setError(null);
    };

    return [error, onShowModal];
};
