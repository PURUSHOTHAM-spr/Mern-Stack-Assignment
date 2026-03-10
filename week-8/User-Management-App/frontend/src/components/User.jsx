import { useLocation } from "react-router";

function User() {
  let { state } = useLocation();

  console.log(state.user);
  return (
    <div>
      <p>{state?.user?.name}</p>
      <p>{state?.user?.email}</p>
      <p>{state?.user?.dateOfBirth}</p>
      <p>{state?.user?.mobileNumber}</p>
    </div>
  );
}

export default User;
