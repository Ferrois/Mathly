import LessonContainer from "@/components/Home/LessonContainer";
import pureTopics from "@/data/h2math"

export default function Home() {
  return (
      // {JSON.stringify(session)}
      <div className="flex flex-col items-center h-auto w-full">
        <div className="container sm:w-5/6 p-x">
          <h3 className="text-4xl font-bold m-5">Pure Mathematics</h3>
          <LessonContainer data={pureTopics}/>
          <h3 className="text-4xl font-bold m-5">Statistics</h3>
          <LessonContainer />
        </div>
      </div>
  );
}
