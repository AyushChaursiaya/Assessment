import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { getRepos } from "../services/apiUrl";

const Repos = () => {
  const { username } = useParams();
  const { state: user } = useLocation();

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 6;

  const [sort, setSort] = useState("");
  const [language, setLanguage] = useState("");

  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  });

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const data = await getRepos(username);
        setRepos(data);
      } catch {
        setError("Error loading repos");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  const processedRepos = repos
    .filter((repo) => {
      if (!language) return true;
      return repo.language === language;
    })
    .sort((a, b) => {
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      if (sort === "forks") return b.forks_count - a.forks_count;
      return 0;
    });

  const paginatedRepos = processedRepos.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const toggleBookmark = (repo) => {
    let updated;
    const exists = bookmarks.find((b) => b.id === repo.id);

    if (exists) {
      updated = bookmarks.filter((b) => b.id !== repo.id);
    } else {
      updated = [...bookmarks, repo];
    }

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">

      {user && (
        <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow">
          <img src={user.avatar_url} className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{user.login}</h2>
            <a href={user.html_url} className="text-blue-500 text-sm">
              View Profile
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setSort("stars")} className="px-3 py-1 cursor-pointer bg-amber-500 text-white rounded-lg text-sm">
          Sort Stars
        </button>
        <button onClick={() => setSort("forks")} className="px-3 py-1 cursor-pointer bg-amber-500 text-white rounded-lg text-sm">
          Sort Forks
        </button>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-2 py-1 border rounded-lg text-sm border-gray-600 text-gray-600"
        >
          <option value="" className="">All</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>

      {loading && <Loader />}
      {error && <Error message={error} />}

      <div className="grid md:grid-cols-2 gap-4">
        {paginatedRepos.map((r) => (
          <RepoCard
            key={r.id}
            repo={r}
            toggleBookmark={toggleBookmark}
            isBookmarked={bookmarks.some((b) => b.id === r.id)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-6">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="px-4 py-1 text-sm bg-gray-200 rounded">
          Prev
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page * perPage >= processedRepos.length}
          className="px-4 py-1 text-sm bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Repos;