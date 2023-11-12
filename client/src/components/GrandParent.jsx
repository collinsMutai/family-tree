import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FamilyContext } from "../FamilyContext";

const GrandParent = () => {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [firstWife, setFirstWife] = useState("");
  const [secondWife, setSecondWife] = useState("");
  const [children, setChildren] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [child, setChild] = useState("");
  const [addedChildren, setAddedChildren] = useState([]);

  const { grandparent, setGrandparent } = useContext(FamilyContext);

  useEffect(() => {
    axios.get("/grandparents").then(({ data }) => {
      setGrandparent(data);
      setName(data.name);
      setFirstWife(data.firstWife);
      setSecondWife(data.secondWife);
      setAddedChildren(data.children);
      setAddedPhotos(data.addedPhotos);
    });
  }, []);

  function addGrandparent(ev) {
    ev.preventDefault();

    // setName(grandparent.name);
    if (
      !grandparent.name ||
      !grandparent.firstWife ||
      !grandparent.secondWife ||
      !grandparent.children ||
      !grandparent.addedPhotos
    ) {
      return;
    }
    axios.put("/grandparents", {
      name,
      firstWife,
      secondWife,
      addedChildren,
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
  async function handleAddChild(ev) {
    ev.preventDefault();

    setAddedChildren((prev) => {
      return [...prev, child];
    });
    setChild("");
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

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add child"
              value={child}
              onChange={(ev) => setChild(ev.target.value)}
            />
            <button
              className="bg-primary px-4 rounded-2xl"
              onClick={handleAddChild}
            >
              Add child
            </button>
          </div>
          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedChildren?.length > 0 &&
              addedChildren.map((item) => (
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
          </div>
          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos?.length > 0 &&
              addedPhotos.map((link) => (
                <div className="h-32 flex relative" key={link}>
                  <img
                    className="object-cover w-full rounded-2xl"
                    src={"http://localhost:3000/uploads/" + link}
                    alt=""
                  />
                </div>
              ))}
          </div>
          <div className="flex justify-between">
            <button  className="primary my-4">
              Save
            </button>
            <button  onClick={()=> setDisplay(false)} type="button"  className="primary my-4">
              Cancel
            </button>
          </div>
        </form>
      )}
      {grandparent && (
        <div className=" mt-8 p-8">
          <h1 className="text-2xl bold mb-8">Grandparents</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <div>
              <img
                className="rounded-2xl w-80 mb-4"
                src={"http://localhost:3000/uploads/" + addedPhotos?.[0]}
                alt=""
              />
              <h2 className="text-xl bold">Grandpa: {name}</h2>
            </div>
            <div>
              <img
                className="rounded-2xl w-80 mb-4"
                src={"http://localhost:3000/uploads/" + addedPhotos?.[0]}
                alt=""
              />

              <h2 className="text-xl">Grandma: {firstWife}</h2>
            </div>
            <div>
              <img
                className="rounded-2xl w-80 mb-4"
                src={"http://localhost:3000/uploads/" + addedPhotos?.[0]}
                alt=""
              />

              <h2 className="text-xl">Grandma: {secondWife}</h2>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg">
              They were blessed with {addedChildren?.length} of children.
            </p>
            {addedChildren &&
              addedChildren.map((child) => (
                <div className="mt-4" key={child}>
                  <ul>
                    <div className="flex gap-1 align-center content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <li className="text-xl bold">{child}</li>
                    </div>
                  </ul>
                </div>
              ))}
            <button
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
