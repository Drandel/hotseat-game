import { useQuery } from "react-query";
import { fetchQuestions } from "../questionsAPI";

export default function useQuestions() {
  const { isLoading, error, data } = useQuery(["questions"], () => {
    return fetchQuestions();
  });
  return { questions: data, isLoading, error };
}
