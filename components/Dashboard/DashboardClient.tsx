import TableDashboard from "@/components/Dashboard/Table/page";
import CardHome from "../Home/Card/page";
import { getAllUmkm } from "@/lib/actions/getUmkm";

export default async function DashboardPage() {
  const umkmList = await getAllUmkm();

  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <div className="mt-4">
        <CardHome />
      </div>
      <div className="mt-4">
        <TableDashboard getUmkm={umkmList} />
      </div>
    </div>
  );
}
