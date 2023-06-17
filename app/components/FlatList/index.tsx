interface FlatListProps {
  title: string;
}

const FlatList: React.FC<FlatListProps> = ({ title }) => {
  return (
    <li>
      <button className="flex gap-x-2 items-center py-2 text-gray-500 hover:text-indigo-600 relative group">
        <span> {title} </span>
        <span className="absolute w-full h-0.5 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
      </button>
    </li>
  );
};

export default FlatList;
