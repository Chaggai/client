import { api } from "./api";

export type SubscriptionDocument = {
  _id: string;
  memberId: string;
  movies: { movieId: string; date: Date };
};

export type Subscription = Omit<SubscriptionDocument, "_id">;

const subscriptionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<SubscriptionDocument[], void>({
      query: () => "subscriptions/get/",
      providesTags: ["Subscriptions"],
    }),
    getOneSubscription: builder.query<SubscriptionDocument, string>({
      query: (id) => `subscriptions/get/${id}`,
      providesTags: ["Subscriptions"],
    }),
    createSubscription: builder.mutation<
      Subscription,
      { subscription: Subscription }
    >({
      query: ({ subscription }) => {
        return {
          url: "subscriptions/create/",
          method: "POST",
          body: { ...subscription },
        };
      },
      invalidatesTags: ["Subscriptions"],
    }),
    updateSubscription: builder.mutation<
      Subscription,
      { id: string; subscription: Subscription }
    >({
      query: ({ id, subscription }) => {
        return {
          url: `subscriptions/update/${id}`,
          method: "PUT",
          body: { ...subscription },
        };
      },
      invalidatesTags: ["Subscriptions"],
    }),
    deleteSubscription: builder.mutation<string, string>({
      query: (id) => ({
        url: `subscriptions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriptions"],
    }),
  }),
  overrideExisting: false,
});

export default subscriptionsApi;
