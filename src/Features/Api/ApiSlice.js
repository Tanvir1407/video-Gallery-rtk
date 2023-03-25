import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000'
    }),
    tagTypes:["Videos", "relatedVideo"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            keepUnusedDataFor: 60,
            providesTags:["Videos"]
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg)=>[{type:"Video", id:arg}]

        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const tags = title.split(" ");
                const likes = tags.map(tag => `title_like${tag}`);
                const queryString = `/videos?${likes.join("&")}&id_ne=${id}&_limit=3`
                return queryString;
            },
            providesTags: (result, error, arg)=>[{type:"relatedVideo", id:arg.id}]
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url:"/videos",
                method: "POST",
                body:data
            }),
            invalidatesTags:["Videos"] 
        }),
        editVideo: builder.mutation({
            query: ({id,data}) => ({
                url:`/videos/${id}`,
                method: "PATCH",
                body:data
            }),
            invalidatesTags: (result, error, arg) => [
                "Videos",
                { type: "Video", id: arg.id },
                {type:"relatedVideo", id:arg}
            ]
        })
    })
});

export const {useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation,useEditVideoMutation} = apiSlice;