import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useHospital = () => {
    const axiosPublic = useAxiosPublic();
    // react query
    const { data: hospitals, isLoading, refetch } = useQuery({
        queryKey: ['hospitals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all/hospital`);
            return res.data;
        }
    })
    return [hospitals, isLoading, refetch];
};

export default useHospital;