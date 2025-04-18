import numeral from "numeral-v2";

const sepMillier = (number) => {
  const Primenumeral = numeral(number).format("0,0");
  // console.log(Primenumeral)
  return Primenumeral.replace(/[,]+/g, " ");
};

export default sepMillier;
