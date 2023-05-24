import { Navigate, useParams } from "react-router-dom";
import _ from "lodash";
import membersApi from "../../services/membersApi";
import MemberForm from "./MemberForm";

type Props = {};

const UpdateMember = ({}: Props) => {
  const [updateMember, { error, isSuccess: isUpdateSuccess }] =
    membersApi.useUpdateMemberMutation();

  let { memberId } = useParams();
  if (!memberId) return <>404 Member not found</>;

  const { data: member, isSuccess } = membersApi.useGetOneMemberQuery(memberId);
  if (!isSuccess) return <>404 Member not found</>;

  const memberToUpdate = _.pick(member, ["name", "email", "city"]);

  return (
    <>
      <MemberForm
        click={updateMember}
        member={memberToUpdate}
        memberId={memberId}
        buttonText="update"
        error={error as { status: number; data: string }}
      />
      {isUpdateSuccess ? <Navigate to="/members/all" /> : null}
    </>
  );
};

export default UpdateMember;
