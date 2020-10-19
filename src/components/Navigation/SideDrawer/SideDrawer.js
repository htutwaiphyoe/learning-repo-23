import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";
const SideDrawer = (props) => {
    return (
        <React.Fragment>
            <div className={classes.SideDrawer}>
                <nav>
                    <NavigationItems />
                </nav>
                <p className={classes.Developer}>
                    Developed by <a href="https://htutwaiphyoe.netlify.app"> Htut Wai Phyoe</a>
                </p>
            </div>
            {/* <Backdrop show /> */}
        </React.Fragment>
    );
};

export default SideDrawer;
