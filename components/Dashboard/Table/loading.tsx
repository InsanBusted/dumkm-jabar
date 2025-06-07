import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="p-4">
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Nama Team</th>
              <th className="p-3 text-left">Ketua</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">
                  <Skeleton className="h-4 w-3/4" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-4 w-1/2" />
                </td>
                <td className="p-3 text-center">
                  <Skeleton className="h-8 w-20 mx-auto rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Loading;
