import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetAllCountries } from "../../services/countries";

const HomeScreen = () => {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => GetAllCountries({}),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(data);
  return <div>HomeScreen</div>;
};

export default HomeScreen;
