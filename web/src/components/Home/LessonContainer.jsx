import LessonCard from "./LessonCard";

function LessonContainer({data}) {
  return (
    <div className="h-auto w-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-3 gap-2">
      {data && data.map((elem) => {
        return <LessonCard key={elem.name} name={elem.name} link={elem.link} />;
      })}
    </div>
  );
}

export default LessonContainer;
