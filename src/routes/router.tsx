import { SpinnerLoad } from "@/components/SpinnerLoad";
import { LoginLayout } from "@/lazyImports";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense key="auth" fallback={<SpinnerLoad />}>
        <LoginLayout />
      </Suspense>
    ),
  },
]);
