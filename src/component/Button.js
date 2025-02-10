// Label -> will be the text shown on the button
// onClickFunction -> Callback funtion that will be triggered when the button is clicked.

const Button = ({ label, onClick }) => {
  return <button onClick={() => onClick(label)}>{label}</button>;
};

export default Button;
