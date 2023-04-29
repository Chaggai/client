import classes from "./styles.module.scss";

type ButtonProps = {
  text: string;
  color?: "blue" | "green" | "red";
  click?: any;
};

const Button = ({ text, click, color }: ButtonProps) => {
  return (
    <button
      className={`${classes.button} ${color ? classes[color] : classes.blue}`}
      onClick={click}
    >
      {text}
    </button>
  );
};

export default Button;
