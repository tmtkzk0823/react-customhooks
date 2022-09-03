import "./styles.css";

import { UserCard } from "./components/UserCard";
import { useAllUsers } from "./hooks/useAllUsers";

// const user = {
//   id: 1,
//   name: "ミンティア",
//   email: "email@example.com",
//   address: "ADDRESS"
// };

export default function App() {
  const { getUsers, userProfiles, loading, error } = useAllUsers();
  const onClickFechUser = () => getUsers();
  return (
    <div className="App">
      <button onClick={onClickFechUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得失敗！！！！！！！！！</p>
      ) : loading ? (
        <p>Loding...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
