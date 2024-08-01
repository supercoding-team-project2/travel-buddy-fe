import { Suspense } from "react";
import { ClientComponent } from "./clientComponent";

const page = () => {
  return (
    <Suspense>
      <ClientComponent />
    </Suspense>
  );
};

export default page;
