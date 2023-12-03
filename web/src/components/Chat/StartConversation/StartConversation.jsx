"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactList from "./ContactList";
import ContactSearch from "./ContactSearch";
import { ContactProvider } from "@/context/ContactContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function StartConversaton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>New Chat</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <ContactProvider>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start a new chat</DialogTitle>
              <DialogDescription>
                <ContactSearch />
                <ContactList />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </ContactProvider>
      </Dialog>
    </>
  );
}
