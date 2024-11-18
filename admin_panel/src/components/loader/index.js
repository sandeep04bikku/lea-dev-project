import React from "react";
import style from "./Spinner.module.css";

const Loader = () => {
    return (
        <div className={style.loader}>
            <div className={style.spinnerDual}>
                <div className={style.spinnerDual}></div>
            </div>
        </div>
    );
};

export default Loader;
