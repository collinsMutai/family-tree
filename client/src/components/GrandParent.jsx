import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FamilyContext } from "../FamilyContext";
import { Link } from "react-router-dom";
import ChildrenList from "../ChildrenList";

const GrandParent = () => {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [firstWife, setFirstWife] = useState("");
  const [secondWife, setSecondWife] = useState("");

  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [firstWifeChild, setFirstWifeChild] = useState("");
  const [secondWifeChild, setSecondWifeChild] = useState("");

  const [firstWifeChildren, setFirstWifeChildren] = useState([]);
  const [secondWifeChildren, setSecondWifeChildren] = useState([]);

  const { grandparent, setGrandparent } = useContext(FamilyContext);

  useEffect(() => {
    axios.get("/grandparents").then(({ data }) => {
     
      setGrandparent(data);
      setName(data.name);
      setFirstWife(data.firstWife);
      setSecondWife(data.secondWife);
      setFirstWifeChildren(data.firstWifeChildren);
      setSecondWifeChildren(data.secondWifeChildren);
      setAddedPhotos(data.addedPhotos);
    });
  }, []);

  function addGrandparent(ev) {
    ev.preventDefault();

    setName(grandparent.name);
    if (
      !grandparent.name ||
      !grandparent.firstWife ||
      !grandparent.secondWife ||
      !grandparent.firstWifeChildren ||
      !grandparent.secondWifeChildren ||
      !grandparent.addedPhotos
    ) {
      return;
    }
    axios.put("/grandparents", {
      name,
      firstWife,
      secondWife,
      firstWifeChildren,
      secondWifeChildren,
      addedPhotos,
    });
    setDisplay(false);
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();

    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function handleFirstWifeAddChildren(ev) {
    ev.preventDefault();

    setFirstWifeChildren((prev) => {
      return [...prev, firstWifeChild];
    });
    setFirstWifeChild("");
  }

  async function handleSecondWifeAddChildren(ev) {
    ev.preventDefault();

    setSecondWifeChildren((prev) => {
      return [...prev, secondWifeChild];
    });
    setSecondWifeChild("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
      {display && (
        <form className="mt-8 p-8" onSubmit={addGrandparent}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              type="text"
              placeholder="First wife name"
              value={firstWife}
              onChange={(ev) => setFirstWife(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Second wife name"
              value={secondWife}
              onChange={(ev) => setSecondWife(ev.target.value)}
            />
          </div>

          <div className="flex gap-2 mt-6">
            <input
              type="text"
              placeholder="Add first wife children"
              value={firstWifeChild}
              onChange={(ev) => setFirstWifeChild(ev.target.value)}
            />
            <button
              className="bg-primary px-4 rounded-2xl"
              onClick={handleFirstWifeAddChildren}
            >
              Add
            </button>
          </div>
          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {firstWifeChildren?.length > 0 &&
              firstWifeChildren.map((item) => (
                <div className="h-32 flex relative" key={item}>
                  {item}
                </div>
              ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add second wife child"
              value={secondWifeChild}
              onChange={(ev) => setSecondWifeChild(ev.target.value)}
            />
            <button
              className="bg-primary px-4 rounded-2xl"
              onClick={handleSecondWifeAddChildren}
            >
              Add
            </button>
          </div>
          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {secondWifeChildren?.length > 0 &&
              secondWifeChildren.map((item) => (
                <div className="h-32 flex relative" key={item}>
                  {item}
                </div>
              ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add using a link"
              value={photoLink}
              onChange={(ev) => setPhotoLink(ev.target.value)}
            />
            <button
              className="bg-primary px-4 rounded-2xl"
              onClick={addPhotoByLink}
            >
              Add photo
            </button>
            <div>
              <label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={uploadPhoto}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  Upload photo
                </div>
              </label>
            </div>
          </div>

          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos?.length > 0 &&
              addedPhotos.map((link) => (
                <div className="h-32 flex relative" key={link}>
                  <img
                    className="object-cover w-full rounded-2xl"
                    src={
                      "https://family-tree-backend-evr9.onrender.com/uploads/" +
                      link
                    }
                    alt=""
                  />
                </div>
              ))}
          </div>
          <div className="flex justify-between">
            <button
              className="primary my-4"
              type="submit"
              onClick={addGrandparent}
            >
              Save
            </button>
            <button
              onClick={() => setDisplay(false)}
              type="button"
              className="primary my-4"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {!display && grandparent && (
        <div className=" mt-8 p-8">
          <h1 className="text-2xl bold mb-8">Grandparents: Kiptule Family</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <div>
              <img
                className="rounded-2xl w-80 mb-4"
                src={
                  "https://family-tree-backend-evr9.onrender.com/uploads/" +
                  addedPhotos?.[0]
                }
                alt=""
              />
              <h2 className="text-xl bold">Grandpa: {name}</h2>
            </div>
            <div>
              <img
                className="rounded-2xl w-80 mb-4"
                src={
                  "https://family-tree-backend-evr9.onrender.com/uploads/" +
                  addedPhotos?.[0]
                }
                alt=""
              />

              <h2 className="text-xl">Grandma: {firstWife}</h2>
            </div>
            <div>
              <img
                className="rounded-2xl w-80 mb-4"
                src={
                  "https://family-tree-backend-evr9.onrender.com/uploads/" +
                  addedPhotos?.[0]
                }
                alt=""
              />

              <h2 className="text-xl">Grandma: {secondWife}</h2>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg">
              They were blessed with{" "}
              {firstWifeChildren?.length + secondWifeChildren?.length} of
              children.
            </p>
            <div className="flex mt-8">
              <div className="flex-1">
                <h2 className="text-xl">First Wife Children</h2>
                {firstWifeChildren &&
                  firstWifeChildren.map((child) => (
                    <div className="mt-4" key={child}>
                      <ChildrenList child={child} />
                    </div>
                  ))}
              </div>
              <div className="flex-1">
                <h2 className="text-xl">Second Wife Children</h2>
                {secondWifeChildren &&
                  secondWifeChildren.map((child) => (
                    <div className="mt-4" key={child}>
                      <ChildrenList child={child} />
                    </div>
                  ))}
              </div>
            </div>
            <button
              type="button"
              className=" primary w-40 mt-4"
              onClick={() => setDisplay(true)}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GrandParent;
