import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttp from "../../hooks/http";
const ErrorPage = (WrappedComponent, axios) => {
    return (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, onShowModal] = useHttp(axios);
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
