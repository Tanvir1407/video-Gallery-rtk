import { useGetRelatedVideosQuery } from "../../../Features/Api/ApiSlice";
import Error from "../../ui/Error";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
    const { data: relatedVideos, isLoading, isError } = useGetRelatedVideosQuery({ id, title })
    
    let content = null;
    if(!isLoading && ! isError && relatedVideos.length === 0) content =( <Error message="No Related Video Found"/> )
    if (!isLoading && !isError && relatedVideos.length > 0) content = relatedVideos.map(video => <RelatedVideo video={video} />)
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {
                content
            }
        </div>
    );
}
