import { Pencil1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { getFormData } from "../lib/my-utils";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, uploadFile } from "../request";
import { setAdmin } from "../store/appSlice";
import toast from "react-hot-toast";
import { editProfile } from "../request";

export function EditAdmin() {
  const [openModal, setOpenModal] = useState(false);
  const admin = useSelector((state) => state.app.admin);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = getFormData(e.target);
    setLoading(true);
    uploadFile(data.avatar)
      .then((imgUrl) => {
        data.avatar = imgUrl;
        return editProfile(data, admin.id);
      })
      .then((res) => {
        toast.success("Ma'lumotlar yangilandi");
        dispatch(setAdmin({ ...res, avatar: data.avatar }));
      })
      .catch(async ({ message }) => {
        if (message === "403") {
          try {
            const { access_token } = await refreshToken();
            dispatch(setAdmin({ ...admin, access_token }));
            return editProfile(data, admin.id); 
          } catch {
            localStorage.removeItem("admin");
            toast.error("Tizimga qayta kirin");
            dispatch(setAdmin(null));
          }
        } else {
          toast.error("Xatolik yuz berdi");
          dispatch(setAdmin(null));
        }
      })
      .finally(() => {
        setLoading(false);
        setOpenModal(false);
      });
  }

  return (
    <>
      <Button
        size="icon"
        className="w-48 h-10 flex items-center justify-center"
        onClick={() => setOpenModal(true)}
      >
        <Pencil1Icon />{" "}
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <Modal.Header>Ma'lumotlarni yangilash</Modal.Header>
          <Modal.Body>
            <div>
              <Label htmlFor="img">Yangi Rasim</Label>
              <TextInput
                name="avatar"
                type="file"
                placeholder="Yangi rasimni kiriting"
                id="img"
              />
            </div>
            <div>
              <Label htmlFor="name">Yangi Ism</Label>
              <TextInput
                name="username"
                defaultValue={admin.username}
                placeholder="Yangi ismni kiriting"
                id="name"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor="password">Yangi Parol</Label>
              <TextInput
                name="password"
                autoComplete="off"
                type="password"
                defaultValue={admin?.password}
                placeholder="Yangi parolni kiriting"
                id="password"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={loading} type="submit">
              {loading ? (
                <UpdateIcon className="animate-spin" />
              ) : (
                "O'zgartirish"
              )}
            </Button>
            <Button
              color="gray"
              disabled={loading}
              onClick={() => setOpenModal(false)}
            >
              Bekor Qilish
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}