import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import Empty from "../components/Empty/Empty";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../services/apiUrl";

const Home = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!debouncedQuery) return;

        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await searchUsers(debouncedQuery);
                setUsers(data);
                setError("");
            } catch {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [debouncedQuery]);

    const handleUserClick = (user) => {
        navigate(`/repos/${user.login}`, { state: user });
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">

            <SearchBar value={query} onChange={setQuery} />

            {loading && <Loader />}
            {error && <Error message={error} />}
            {!loading && users.length === 0 && debouncedQuery && <Empty />}

            <div className="grid md:grid-cols-3 gap-4 mt-6">
                {users.map((u) => (
                    <UserCard
                        key={u.id}
                        user={u}
                        onClick={() => handleUserClick(u)}
                    />
                ))}
            </div>

        </div>
    );
};

export default Home;