import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const { loading, data } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data.me) {
      router.push("/login");
    }
  }, [loading, data, router]);
};
