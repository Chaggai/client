import classes from "./styles.module.scss";

type AvatarProps = {
  letter: string;
};

const Avatar = ({ letter }: AvatarProps) => {
  return <i className={classes.avatar}>{letter}</i>;
};

export default Avatar;
