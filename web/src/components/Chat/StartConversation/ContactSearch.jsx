"use client";

import { Input } from "@/components/ui/input";
import { useContact } from "@/context/ContactContext";

export default function ContactSearch() {
  const { search, setSearch } = useContact();
  return <Input className="mb-2" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={"Search for a friend"} />;
}
