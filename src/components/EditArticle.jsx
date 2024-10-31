import { Pencil1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { getFormData } from "../lib/my-utils";
import { useDispatch, useSelector } from "react-redux";
import { editArticle, refreshToken } from "../request";
import { setAdmin, updateArticleInStore } from "../store/appSlice";
import toast from "react-hot-toast";

export function EditArticle({
  id,
  title,
  description,
  name,
  avatar,
  createdDate,
  readTime,
  category,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ title, description, createdDate });
  const admin = useSelector((state) => state.app.admin);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const updatedData = { ...formData, id, readTime, category, author: { name, avatar } };

    setLoading(true);
    editArticle(admin?.access_token, updatedData)
      .then((res) => {
        toast.dismiss();
        toast.success(res);
        dispatch(updateArticleInStore(updatedData));
        setOpenModal(false);
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken(admin?.refresh_token)
            .then(({ access_token }) => {
              dispatch(setAdmin({ ...admin, access_token }));
            })
            .catch(() => {
              toast.info("Tizimga qayta kiring");
              dispatch(setAdmin(null));
            });
        }
        toast.error(message);
      })
      .finally(() => setLoading(false));
  };

  
  useEffect(() => {
    if (openModal) {
      setFormData({ title, description, createdDate });
    }
  }, [openModal, title, description, createdDate]);

  return (
    <>
      <Button
        size="icon"
        className="flex h-14 w-14 items-center justify-center"
        onClick={() => setOpenModal(true)}
      >
        <Pencil1Icon />
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Modal.Header>Ma'lumotlarni yangilash</Modal.Header>
          <Modal.Body>
            <div>
              <Label htmlFor="title">Title</Label>
              <TextInput
                name="title"
                value={formData.title} 
                type="text"
                placeholder="Enter title"
                id="title"
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Yangi Ism</Label>
              <TextInput
                name="description"
                value={formData.description} 
                placeholder="New description"
                id="description"
                autoComplete="off"
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="createdDate">New created date</Label>
              <TextInput
                name="createdDate"
                autoComplete="off"
                value={formData.createdDate} 
                placeholder="New created date"
                id="createdDate"
                onChange={(e) => setFormData((prev) => ({ ...prev, createdDate: e.target.value }))}
                required
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