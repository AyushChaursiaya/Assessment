const RepoCard = ({ repo, toggleBookmark, isBookmarked }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex justify-between">
                <h3 className="font-semibold text-lg">{repo.name}</h3>
                <button
                    onClick={() => toggleBookmark(repo)}
                    className="text-gray-600 text-2xl"
                >
                    {isBookmarked ? "★" : "☆"}
                </button>
            </div>

            <p className="text-sm text-gray-600">
                {repo.description || "No description"}
            </p>

            {repo.language && (
                <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {repo.language}
                </span>
            )}

            <div className="flex justify-between mt-3 text-sm">
                <div className="flex gap-3">
                    ⭐ {repo.stargazers_count}
                    🍴 {repo.forks_count}
                </div>

                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-bold" > 
                    View → </a>
            </div>
        </div>
    );
};

export default RepoCard;