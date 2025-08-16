import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRecipientList = () => {
    const axiosPublic = useAxiosPublic();
    // react query
    const { data: recipients, isLoading, refetch } = useQuery({
        queryKey: ['recipients'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recipients');
            return res.data;
        }
    })
    return [recipients, isLoading, refetch];
};

export default useRecipientList;