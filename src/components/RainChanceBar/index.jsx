import "./styles.css";

export const RainChanceBar = (props) => {
  const percentage = props.percentage;
  const styles = {
    color: "white",
    left: `${percentage}%`,
  };

  return (
    <div className="outer">
      <div className="raincontainer">
        <div className="marker" style={styles}></div>
      </div>
    </div>
  );
};
