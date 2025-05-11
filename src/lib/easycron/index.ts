import axios, { AxiosResponse } from "axios";

type EasyCronAddResponse = {
  cron_job_id?: number;
  message?: string;
};

const add = async (url: string, expression: string): Promise<AxiosResponse<EasyCronAddResponse>> => {
  const easyCronUrl = "https://api.easycron.com/v1/cron-jobs";
  const body = { url, cron_expression: expression };

  try {
    const response = await axios.post<EasyCronAddResponse>(easyCronUrl, body, {
      headers: { "X-API-Key": process.env.EASY_CRON_API_KEY as string },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

const easyCron = {
  add,
};

export default easyCron;
