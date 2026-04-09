const UserCard = ({ user, onClick }) => {
    return (
        <div
            onClick={() => onClick(user)} // 👈 full object pass karo
            className="cursor-pointer bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:scale-105 transition"
        >
            <img src={user.avatar_url} className="w-12 h-12 rounded-full" />
            <p className="font-semibold">{user.login}</p>
        </div>
    );
};

export default UserCard;