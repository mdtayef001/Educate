import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  if (loading || isLoading) return <Loading />;
  return (
    <section className="lg:w-[70%] mx-auto rounded-lg">
      <div className="w-full shadow-lg rounded-lg">
        <div className="w-full h-[150px] relative rounded-t-lg bg-blue-200 bg-center">
          <img
            src={user?.photoURL}
            alt=""
            className="w-[80px] h-[80px] rounded-full border-[#819df1] border-4 absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
          />
        </div>

        <div className="w-full text-center pb-10 mt-16">
          <div>
            <h2 className="font-[600] text-[1.4rem]">
              {user?.displayName}
              {/* role */}
              {role === "user" ? (
                ""
              ) : (
                <span>
                  <div className="badge badge-warning gap-2">{role}</div>
                </span>
              )}
            </h2>
            <p className="text-text text-[0.9rem]">{user?.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
