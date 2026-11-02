export type Employee = {
  id: number;
  name: string;
  email: string;
  designation: string;
  salary: number;
};

type EmployeesTableProps = {
  employees: Employee[];
};

function EmployeesTable({ employees }: EmployeesTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-semibold">Employee ID</th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Designation</th>
              <th className="px-5 py-3 font-semibold">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-5 py-4">#{employee.id}</td>
                <td className="px-5 py-4 font-medium text-slate-900">
                  {employee.name}
                </td>
                <td className="px-5 py-4">{employee.email}</td>
                <td className="px-5 py-4">{employee.designation}</td>
                <td className="px-5 py-4 font-semibold text-emerald-600">
                  ${employee.salary.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesTable;
