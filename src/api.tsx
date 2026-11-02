import type { Employee } from "./EmployeesTable";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function request<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new Error("Network error");
  }

  if (!response.ok) {
    let detail = `Request Failed with status ${response.status}`;

    try {
      const body = await response.json();
      if (body.detail) {
        detail = body.detail;
      }
    } catch {
      // ignore
    }

    throw new Error(detail);
  }

  return response.json() as Promise<T>;
}

export type SummaryEntry = {
  operation: string;
  value: number;
};

export const fetchSummary = async (
  operation: string,
): Promise<Record<string, number>> => {
  const data = await request<SummaryEntry[]>(
    `/employees/summary?operations=${encodeURIComponent(operation)}`,
  );

  return data.reduce<Record<string, number>>((acc, item) => {
    acc[item.operation] = Number(item.value);
    return acc;
  }, {});
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  return request<Employee[]>("/employees");
};
