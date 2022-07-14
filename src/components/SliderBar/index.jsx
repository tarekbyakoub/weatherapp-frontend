import "./styles.css";

export const SliderBar = (props) => {
  const percentage = props.percentage;
  const styles = {
    color: "white",
    left: `${percentage}%`,
  };

  return (
    <div className="outer">
      <div className="container">
        <div className="marker" style={styles}></div>
      </div>
    </div>
  );
};
