import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { Digest } from "@/types/api/digests";
import { CreateDigest } from "@/types/payload/digests";

// GET DIGESTS
const getDigests = async (): Promise<Digest[]> => {
  const { data } = await axios.get(`/api/digests`);
  return data;
};

const useDigests = (): UseQueryResult<Digest[], AxiosError> => {
  return useQuery({ queryKey: ["digests"], queryFn: () => getDigests() });
};

// GET DIGESTS UNREAD COUNT
const getUnreadCount = async (): Promise<number> => {
  const { data } = await axios.get(`/api/digests/unread_count`);
  return data;
};

const useDigestsUnreadCount = (): UseQueryResult<number, AxiosError> => {
  return useQuery({ queryKey: ["digests/unread_count"], queryFn: () => getUnreadCount() });
};

// GET DIGESTS UNREAD COUNT
const getDigestByDate = async (date: string): Promise<Digest> => {
  const { data } = await axios.get(`/api/digest/date?date=${date}`);
  return data;
};

const useGetDigestByDate = (date: string, enabled: boolean): UseQueryResult<Digest, AxiosError> => {
  return useQuery({ queryKey: ["digest/date", date], queryFn: () => getDigestByDate(date), enabled });
};

// CREATE DIGEST
const createDigest = async (payload: CreateDigest): Promise<AxiosResponse> => {
  const { data } = await axios.post("/api/digest", payload);
  return data;
};

const useCreateDigest = (): UseMutationResult<AxiosResponse, AxiosError, CreateDigest, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDigest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["digests"] });
      queryClient.invalidateQueries({ queryKey: ["digests/unread_count"] });
    },
  });
};

// MARK DIGEST AS READ
const markAsRead = async (id: number): Promise<AxiosResponse> => {
  const { data } = await axios.patch(`/api/digest/${id}/mark_as_read`);
  return data;
};

const useDigestMarkAsRead = (): UseMutationResult<AxiosResponse, AxiosError, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["digests"] });
      queryClient.invalidateQueries({ queryKey: ["digests/unread_count"] });
    },
  });
};

export { useDigests, useCreateDigest, useDigestsUnreadCount, useDigestMarkAsRead, useGetDigestByDate };
