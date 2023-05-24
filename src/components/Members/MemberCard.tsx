import moment from "moment";
import membersApi, { MemberDocument } from "../../services/membersApi";

import classes from "./styles.module.scss";
import Button from "../FormComponents/Button";
import { NavLink } from "react-router-dom";

type MemberCardProps = {
  member: MemberDocument;
  memberId: string;
};

const MemberCard = ({ member, memberId }: MemberCardProps) => {
  const [deleteMember] = membersApi.useDeleteMemberMutation();
  return (
    <section className={classes.memberCard}>
      <header>
        <h2 style={{ textTransform: "capitalize" }}>{member.name}</h2>
      </header>
      <div className={classes.body}>
        <div>
          <strong>name: </strong> {member.name}
        </div>
        <div>
          <strong>email: </strong> {member.email}
        </div>
        <div>
          <strong>movies watched: </strong>
          <div></div>
        </div>
      </div>
      <footer className={classes.footer}>
        <Button
          text="Delete"
          color="red"
          click={() => deleteMember(member._id)}
        />
        <NavLink to={`/members/update/${member._id}`}>
          {() => <Button text="Update" color="green" />}
        </NavLink>
      </footer>
    </section>
  );
};

export default MemberCard;
