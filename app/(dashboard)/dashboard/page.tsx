import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import DashboardPage from "@/components/Dashboard/DashboardClient";
import Navbar from "../Navbar";
import prisma from "@/lib/db/prisma";

const Dashboard = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0].emailAddress;

  const dbUser = await prisma.user.findUnique({
    where: { email },
  });

  if (dbUser?.role !== "ADMIN") {
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
