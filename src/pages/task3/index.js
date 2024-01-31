import React, { useState } from "react";
import { DeleteFilled, EditFilled, ExclamationCircleFilled } from "@ant-design/icons";
import UserModal from "../../components/Modal/UserModal";
import dayjs from "dayjs";
import confirm from "antd/es/modal/confirm";

const Task3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ali",
      username: "username_ali",
      phones: ["+9989009000889", "+9989009000149"],
      birth: "10/22/1990",
      isForegner: true,
      country: "Uzbekistan",
      language: "uz",
    },
    {
      id: 2,
      name: "Kamron",
      username: "username_kamron",
      phones: ["+998948076524"],
      birth: "10/17/1997",
      isForegner: false,
      country: null,
      language: null,
    },
  ]);

  const showDeleteConfirm = (userId) => {
    confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel() {},
      onOk() {
        // Bu yerga userni o'chiruvchi API yozilishi mumkin edi
        setUsers((users) => users.filter((user) => user.id !== userId));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="task__3">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
          <h2>Users list</h2>
          <button className="btn btn-success" onClick={() => setIsModalOpen(true)}>
            Add user
          </button>
        </div>
        {users.length ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Phones</th>
                <th scope="col">Birth</th>
                <th scope="col">isForegner</th>
                <th scope="col">Counrty</th>
                <th scope="col">Language</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name || "-"}</td>
                  <td>{user.username}</td>
                  <td>
                    {!user.phones.length && "-"}
                    {user?.phones?.map((phone, phone_index) => (
                      <span key={phone_index} className="d-block">
                        {phone}
                      </span>
                    ))}
                  </td>
                  <td>{dayjs(user.birth).format("DD/MM/YYYY")}</td>
                  <td>{user.isForegner ? "true" : "false"}</td>
                  <td>{user.country || "-"}</td>
                  <td>{user.language || "-"}</td>
                  <td className="d-flex justify-content-center gap-3">
                    <span
                      className="pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      <EditFilled />
                    </span>
                    <span className="pointer" onClick={() => showDeleteConfirm(user.id)}>
                      <DeleteFilled className="text-danger" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center">No data</h2>
        )}
      </div>
      <UserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default Task3;
