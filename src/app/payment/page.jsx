
import { Suspense} from "react";
import PaymentShell from "./PaymentShell";
import Loading from "../loading";

const page = () => {

  return (
    <Suspense fallback={<Loading />}>
      <PaymentShell/>
    </Suspense>
  );
};

export default page;
