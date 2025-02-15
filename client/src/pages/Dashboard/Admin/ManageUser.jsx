import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", "admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      setUsers(data);
      return data;
    },
  });

  const handleRole = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role });
      Swal.fire({
        title: "Update!",
        text: "Successful",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Successful",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        }
      }
    });
  };

  const handleSort = async (e) => {
    try {
      const { data } = await axiosSecure.get(`/users?role=${e.target.value}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="lg:w-[70%] mx-auto">
      <div className="lg:text-end lg:mb-10 text-center mt-5">
        <select
          onChange={handleSort}
          defaultValue={"role"}
          className="select select-bordered w-32"
        >
          <option value={""}>All Role</option>
          <option value={"admin"}>Admin</option>
          <option value={"moderator"}>Moderator</option>
          <option value={"user"}>User</option>
        </select>
      </div>
      <div className="overflow-x-auto hidden lg:block">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Select Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td
                  className={`${
                    user.role === "moderator"
                      ? "text-yellow-600 "
                      : user.role === "admin"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-semibold`}
                >
                  {user.role}
                </td>
                <td>
                  <select
                    defaultValue={"Change Role"}
                    onChange={(e) => handleRole(user._id, e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option selected>Change Role</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"moderator"}>Moderator</option>
                    <option value={"user"}>User</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn  bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <MdDeleteForever className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3 mt-10">
        {users.map((user) => (
          <div
            className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-4 mb-4"
            key={user._id}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span
                className={`${
                  user.role === "moderator"
                    ? "text-yellow-600 "
                    : user.role === "admin"
                    ? "text-green-600"
                    : "text-red-600"
                } font-semibold`}
              >
                {user.role}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <select
                defaultValue={"Change Role"}
                onChange={(e) => handleRole(user._id, e.target.value)}
                className="select select-bordered"
              >
                <option selected>Change Role</option>
                <option value={"admin"}>Admin</option>
                <option value={"moderator"}>Moderator</option>
                <option value={"user"}>User</option>
              </select>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn  bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <MdDeleteForever className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageUser;
