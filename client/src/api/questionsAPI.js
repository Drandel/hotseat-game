export const fetchQuestions = async () => {
  // aparently the promise returned from fetch resolves as soon as the response headers are received — not the body
  const res = await fetch("http://localhost:8080/api/questions");
  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }
  // To get the actual data, you need to await the body explicitly:
  const data = await res.json();
  return data.questions;
};
