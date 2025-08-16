import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTotalBooked = () => {
    const axiosPublic = useAxiosPublic();
    // react query
    const { data: booked} = useQuery({
        queryKey: ['allBookedDonor'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all/booked/donor`);
            return res.data;
        }
    })
    return [booked];
};

export default useTotalBooked;