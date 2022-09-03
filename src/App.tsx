import "./styles.css";

import { UserCard } from "./components/UserCard";
import { User } from "./types/api/user";
import axios from "axios";
import { UserProfile } from "./types/userProfile";
import { useState } from "react";

// const user = {
//   id: 1,
//   name: "ミンティア",
//   email: "email@example.com",
//   address: "ADDRESS"
// };

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onClickFechUser = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.street}${user.address.suite}${user.address.city}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
