function TopicWrapper({ children }) {
  return (
    <div className="w-full min-h-full flex flex-col items-center">
      <div className="w-full lg:w-5/6 h-auto px-4">{children}</div>
    </div>
  );
}

export default TopicWrapper;
