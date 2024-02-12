import classes from "./spinner.module.css";

const Spinner = ({ color }) => {
  return (
    <div className={classes.container}>
      {/* <div className={classes.spinner}>Apin</div> */}
      <div className={classes.clock}>
        <div className={classes.center}></div>
        <div className={classes.sec}></div>
        <div className={classes.min}></div>
      </div>
    </div>
  );
};

export default Spinner;
