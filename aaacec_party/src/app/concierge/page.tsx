"use client";

import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";

const Concierge = () => {
  return <h1>Concierge page</h1>;
};

export default WithAuthentication(Concierge, [AAACECRole.CONCIERGE]);
