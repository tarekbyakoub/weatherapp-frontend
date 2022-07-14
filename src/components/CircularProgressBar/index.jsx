// import React from "react";
// import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
// import { useState, useEffect } from "react";

// const CircularProgress = (props) => {
//   const [percent, setPercent] = useState();
//   const [data, setData] = useState();

//   useEffect(() => {
//     let percent = 20;

//     setPercent(percent);
//     setData(getData(percent));
//   }, 2000);

//   //     // check useEffect cleanup for clearInterval
//   //   }, []);

//   // componentWillUnmount() {
//   //   window.clearInterval(this.setStateInterval);
//   // }
//   const Aqi = {
//     1: "Good",
//     2: "Moderate",
//     3: "Bad",
//     4: "Unhealthy",
//     5: "Hazardous",
//   };

//   const getData = (percent) => {
//     return [
//       { x: 1, y: percent },
//       { x: 2, y: 100 - percent },
//     ];
//   };

//   return (
//     <div>
//       <svg viewBox="0 0 400 400" width="100%" height="100%">
//         <VictoryPie
//           standalone={false}
//           width={400}
//           height={400}
//           data={data}
//           innerRadius={120}
//           cornerRadius={25}
//           labels={() => null}
//           style={{
//             data: {
//               fill: ({ datum }) => {
//                 const color = datum.y > 30 ? "green" : "red";
//                 return datum.x === 1 ? color : "transparent";
//               },
//             },
//           }}
//         />
//       </svg>
//     </div>
//   );
// };

// export default CircularProgress;
