"use client";

import { useContact } from "@/context/ContactContext";
import Contact from "./Contact";
import Divider from "@/components/Topic/Divider";

export default function ContactList() {
  const { contactList } = useContact();

  // [
  //   {
  // id:xxx
  //     username: "Ferro",
  //     name: "Ferrois (FeRrOis)",
  //     image: "https://lh3.googleusercontent.com/a/ACg8ocIL5KWzUByDS3ZlVtG2nqqoLFIPjfZbj-e5Orptdbny=s96-c",
  //     type: "student",
  //     subject: null,
  //   },
  // ];

  return (
    <div>
      <Divider className="mb-1"/>
      {contactList &&
        contactList.map((props) => {
          return <Contact key={props.id} {...props} />;
        })}
    </div>
  );
}
