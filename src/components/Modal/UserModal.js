import React, { useEffect, useState } from "react";
import { Checkbox, DatePicker, Modal, Space } from "antd";
import { Button, Form, Input } from "antd";
import { EditFilled, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const initialCountryData = { country: null, language: null };

const UserModal = ({ isModalOpen, setIsModalOpen, users, setUsers, selectedUser, setSelectedUser }) => {
  const [form] = Form.useForm();
  const [countryForm] = Form.useForm();
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [countryData, setCountryData] = useState(initialCountryData);
  const [countryEditable, setCountryEditable] = useState(false);

  const onFinish = (values) => {
    if (values.isForegner) {
      values.country = countryData.country;
      values.language = countryData.language;
    } else {
      values.country = null;
      values.language = null;
    }
    if (selectedUser) {
      let userIndex = users.findIndex((user) => user.id === selectedUser.id);
      let usersList = [...users];
      usersList[userIndex] = { ...values, phones: values?.phones?.map((item) => item.phone) || [] };
      setUsers(usersList);
    } else {
      setUsers([...users, { ...values, phones: values?.phones?.map((item) => item.phone) || [] }]);
    }
    form.resetFields();
    setIsModalOpen(false);
    setCountryEditable(false);
    setCountryData(initialCountryData);
    setSelectedUser(null);
  };
  const onFinishSecondForm = (values) => {
    setCountryData(values);
    setIsOpenSecond(false);
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setIsOpenSecond(true);
      setCountryEditable(true);
    } else {
      setCountryEditable(false);
      setCountryData(initialCountryData);
    }
  };

  const handleEditCountry = () => {
    setIsOpenSecond(true);
    countryForm.setFieldsValue(countryData);
  };

  useEffect(() => {
    if (selectedUser) {
      const dayjsDate = dayjs(selectedUser.birth, { format: "DD/MM/YYYY" });
      form.setFieldsValue({
        ...selectedUser,
        birth: dayjsDate,
        phones: selectedUser.phones.map((item) => {
          return { phone: item };
        }),
      });
      setCountryEditable(selectedUser.isForegner);
      setCountryData({ country: selectedUser.country, language: selectedUser.language });
    }
  }, [selectedUser]);

  console.log("modal");
  return (
    <Modal
      title={selectedUser ? "Update user" : "Add user"}
      width={700}
      open={isModalOpen}
      footer={false}
      onCancel={() => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setCountryData(initialCountryData);
        setCountryEditable(false);
        form.resetFields();
      }}
    >
      <Form layout={"vertical"} form={form} onFinish={onFinish}>
        <div className="row">
          <div className="col-4">
            <Form.Item label="Name" name={"name"}>
              <Input placeholder="Name" />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Missing username",
                },
              ]}
              name={"username"}
            >
              <Input placeholder="username" />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item
              label="Birthday"
              rules={[
                {
                  required: true,
                  message: "Missing birthday",
                },
              ]}
              name={"birth"}
            >
              <DatePicker />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.List name="phones">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "phone"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing phone number",
                          },
                        ]}
                      >
                        <Input placeholder="Phone number" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add number
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div className="col-4">
            <div className="d-flex align-items-center gap-2">
              <Form.Item name="isForegner" valuePropName="checked" className=" m-0">
                <Checkbox onChange={handleCheckbox}>Foregner</Checkbox>
              </Form.Item>
              {countryEditable && (
                <span className="pointer p-0" onClick={handleEditCountry}>
                  <EditFilled /> Edit
                </span>
              )}
            </div>
          </div>
          {countryEditable && (
            <div className="col-4">
              <p className="mb-1">
                <b>Country: </b>
                {countryData.country}
              </p>
              <p className="m-0">
                <b>Language: </b>
                {countryData.language}
              </p>
            </div>
          )}
        </div>
        <Button type="primary" htmlType="submit" className="mx-auto d-block">
          {selectedUser ? "Update" : "Add"}
        </Button>
      </Form>

      <Modal
        footer={false}
        open={isOpenSecond}
        onCancel={() => {
          setIsOpenSecond(false);
        }}
      >
        <Form
          form={countryForm}
          name="foreign"
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinishSecondForm}
          autoComplete="off"
          layout="vertical"
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please input country!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Language"
                name="language"
                rules={[
                  {
                    required: true,
                    message: "Please input language!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};

export default UserModal;
