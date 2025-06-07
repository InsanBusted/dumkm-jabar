"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import Pagination from "./pagination";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DataUmkm } from "@/app/type/DataUmkm";
import { deleteUmkm } from "@/lib/actions/deleteTeam";

export default function TableDashboard({
  getUmkm = [],
}: {
  getUmkm?: DataUmkm[];
}) {
  const [umkm, setUmkm] = useState<DataUmkm[]>(getUmkm);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const router = useRouter();
  const itemsPerPage = 10;

  const filteredUmkm = umkm.filter(
    (u) => u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
  );

  const totalPages = Math.ceil(filteredUmkm.length / itemsPerPage);
  const currentData = filteredUmkm.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <Loading />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!umkm.length) return <div className="p-4">Tidak ada data umkm</div>;

  return (
    <div className="w-full mt-6">
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Nama Umkm</th>
              <th className="p-3 text-left">Nama Owner Umkm</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((umkm) => (
              <tr
                key={umkm.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="p-3">{umkm.name}</td>
                <td className="p-3">{umkm.ownerName}</td>
                <td className="p-3 text-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={loadingId === String(umkm.id)}
                    onClick={() => {
                      setLoadingId(String(umkm.id));
                      router.push(`/dashboard/umkm/${umkm.slug}`); // GUNAKAN SLUG DI SINI
                    }}
                    className="cursor-pointer"
                  >
                    {loadingId === String(umkm.id) ? "Loading..." : "Detail"}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Yakin ingin menghapus tim ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Data tim akan
                          dihapus secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            const res = await deleteUmkm(umkm.id);
                            if (res.success) {
                              setUmkm((prev) =>
                                prev.filter((t) => t.id !== umkm.id)
                              );
                            } else {
                              alert(res.error ?? "Gagal menghapus data");
                            }
                          }}
                          className="cursor-pointer"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama umkm..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-md w-full md:w-64 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
