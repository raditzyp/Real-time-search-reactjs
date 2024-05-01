import { useState, useEffect } from "react";
import "./index.css";

const users = [
  {
    firstName: "John",
    id: 1,
  },
  {
    firstName: "Jane",
    id: 2,
  },
  {
    firstName: "Bob",
    id: 3,
  },
  {
    firstName: "Alice",
    id: 4,
  },
  {
    firstName: "Eve",
    id: 5,
  },
  {
    firstName: "Mark",
    id: 6,
  }
];

function App() {
  const [apiUsers, setApiUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(users)

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        setApiUsers(data.users)
        setFilteredUsers(data.users)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = apiUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form className="max-w-md mx-auto">
  <label
    htmlFor="default-search"
    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Search
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="search"
      id="default-search"
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
      placeholder="Type to search..."
      value={searchItem}                      
      onChange={handleInputChange}
      required=""
    />
  </div>
</form>


      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600 dark:text-red-400">
        Error, penyebabnya: {error.message}
        </p>}
      {!loading && !error && filteredUsers.length === 0
        ? <p className="mt-4">No results found</p>
        : <ul className="mt-4">
            {filteredUsers.map(user => <li key={user.id} className="py-2">{user.firstName}</li>)}
          </ul>
      }
    </div>
  )
}

export default App;
