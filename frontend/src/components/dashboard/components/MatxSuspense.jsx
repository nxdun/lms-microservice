import { Suspense } from "react";
import { MatxLoading } from "../components";

export default function MatxSuspense({ children }) {
  return <Suspense fallback={<MatxLoading />}>{children}</Suspense>;
}
