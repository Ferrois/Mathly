import AddFriend from "@/components/Friends/AddFriend";
import Requests from "@/components/Friends/Requests";

function Page() {
  return (
      <div className="flex flex-col items-center h-auto w-full pt-5">
        <AddFriend />
        <Requests/>
      </div>
  );
}

export default Page;
