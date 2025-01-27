import { useEffect, useState } from 'react';
import { fetchData } from '../api/test';

function Home() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    try {
      const response = await fetchData();
      console.log("===>" ,response)
      setData([...response]);
    } catch (error) {
      console.error(error);
      setData([]); // Optionally reset data if an error occurs
    }
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="w-screen text-center">
      
      <div className="flex items-center justify-center">
        <button onClick={handleClick} className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">Button</button>
      </div>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p>Count: {count}</p>
      <div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              <p>{item.username}</p> {/* Display username or any other data */}
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
