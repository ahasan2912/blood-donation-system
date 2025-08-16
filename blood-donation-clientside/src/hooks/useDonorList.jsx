import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useDonorList = () => {
    const axiosPublic = useAxiosPublic();
    // react query
    const { data: donors, isLoading, refetch } = useQuery({
        queryKey: ['donors'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donors`);;
            return res.data;
        }
    })
    return [donors, isLoading, refetch];
};

export default useDonorList;