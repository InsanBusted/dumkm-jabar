import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import DashboardPage from "@/components/Dashboard/DashboardClient";
import Navbar from "../Navbar";
import prisma from "@/lib/db/prisma";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }, // ganti ke externalId jika perlu
  });

  if (user?.role !== "ADMIN") {
    redirect("/dumkm-jabar");
  }

  return (
    <div>
      <Navbar />
      <main>
        <DashboardPage />
      </main>
    </div>
  );
};

export default Dashboard;
