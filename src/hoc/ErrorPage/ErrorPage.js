import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
const ErrorPage = (WrappedComponent, axios) => {
    return (props) => {
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
        }, []);
        const onShowModal = () => {
            setError(null);
        };

        return (
            <React.Fragment>
                <Modal show={error} onShowModal={onShowModal}>
                    <div style={{ textAlign: "center" }}>
                        Oops! Something went wrong.
                        <span role="img" aria-label="bomb">
                            💣
                        </span>
                    </div>
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default ErrorPage;
