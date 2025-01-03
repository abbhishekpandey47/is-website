"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("5ed27ada-c91b-4985-be7f-2300d74140e5");
  });

  return null;
}

export default CrispChat;