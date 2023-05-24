import { api } from "./api";

export type MemberDocument = {
  _id: string;
  name: string;
  email: string;
  city: string;
};

export type Member = Omit<MemberDocument, "_id">;

const membersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<MemberDocument[], void>({
      query: () => "members/get/",
      providesTags: ["Members"],
    }),
    getOneMember: builder.query<MemberDocument, string>({
      query: (id) => `members/get/${id}`,
      providesTags: ["Members"],
    }),
    createMember: builder.mutation<Member, { member: Member }>({
      query: ({ member }) => {
        return {
          url: "members/create/",
          method: "POST",
          body: { ...member },
        };
      },
      invalidatesTags: ["Members"],
    }),
    updateMember: builder.mutation<Member, { id: string; member: Member }>({
      query: ({ id, member }) => {
        return {
          url: `members/update/${id}`,
          method: "PUT",
          body: { ...member },
        };
      },
      invalidatesTags: ["Members"],
    }),
    deleteMember: builder.mutation<string, string>({
      query: (id) => ({
        url: `members/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Members"],
    }),
  }),
  overrideExisting: false,
});

export default membersApi;
