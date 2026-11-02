import { useEffect, useState } from "react";
import EmployeesTable, { type Employee } from "./EmployeesTable";
import { fetchEmployees, fetchSummary } from "./api";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [summary, setSummary] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [employeeData, summaryData] = await Promise.all([
          fetchEmployees(),
          fetchSummary("avg"),
        ]);

        setEmployees(employeeData);
        setSummary(summaryData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    loadData();
  }, []);

  const summaryItems = [
    {
      label: "Total Employees",
      value: employees.length,
      tone: "bg-cyan-100 text-cyan-700",
    },
    {
      label: "Average Salary",
      value: summary.avg ?? 0,
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Max Salary",
      value: summary.max ?? 0,
      tone: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-600">
              Team
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Employees
            </h1>
          </div>
          <button className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-cyan-500">
            Add employee
          </button>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  {typeof item.value === "number"
                    ? item.value.toLocaleString()
                    : item.value}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.tone}`}
                >
                  Live
                </span>
              </div>
            </div>
          ))}
        </section>

        <EmployeesTable employees={employees} />
      </div>
    </main>
  );
}

export default App;
