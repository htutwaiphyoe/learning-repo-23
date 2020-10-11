import React from "react";

class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <header>Navigation</header>
                <main>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default Layout;
