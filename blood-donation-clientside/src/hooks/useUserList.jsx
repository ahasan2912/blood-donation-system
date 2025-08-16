import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUserList = () => {
    const axiosPublic = useAxiosPublic();
    // react query
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all/users`);
            // console.log(res.data);
            return res.data;
        }
    })
    return [users, isLoading, refetch];
};

export default useUserList;