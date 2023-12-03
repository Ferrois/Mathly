"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useDebounce } from "@/libs/hooks/useDebounce";
import axios from "axios";

const Context = createContext(null);

export function useContact() {
  return useContext(Context);
}

export function ContactProvider({ children }) {
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState([]);
  const debouncedSearch = useDebounce(search, 500);

  const getContacts = async (search) => {
    const response = await axios.post("/api/conversation/contacts", { search });
    setContactList(response.data);
    console.log(response.data)
  };

  useEffect(() => {
    try {
      getContacts(debouncedSearch);
    } catch (err) {
      console.log(err, "----contact context");
    }
  }, [debouncedSearch]);

  return <Context.Provider value={{ contactList, search, setSearch }}>{children}</Context.Provider>;
}
