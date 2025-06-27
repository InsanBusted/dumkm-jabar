import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DUMKM JAWABARAT LOGIN",
};

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#0F172A",
            colorText: "#1e293b",
            colorBackground: "#f9fafb",
          },
          elements: {
            card: "shadow-xl rounded-2xl",
            headerTitle: "text-3xl font-bold text-center",
            socialButtonsBlockButton: "bg-slate-900 hover:bg-slate-800",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          },
        }}
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}
