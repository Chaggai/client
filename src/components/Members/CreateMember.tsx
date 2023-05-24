import { Navigate } from "react-router-dom";
import membersApi, { Member } from "../../services/membersApi";
import MemberForm from "./MemberForm";

type CreateMemberProps = {};

const CreateMember = ({}: CreateMemberProps) => {
  const initialState: Member = {
    name: "",
    email: "",
    city: "",
  };

  const [createMember, { error, isSuccess }] =
    membersApi.useCreateMemberMutation();

  return (
    <>
      <MemberForm
        buttonText="create"
        member={initialState}
        click={createMember}
        error={error as { status: number; data: string }}
      />
      {isSuccess ? <Navigate to="/members/all" /> : null}
    </>
  );
};

export default CreateMember;
