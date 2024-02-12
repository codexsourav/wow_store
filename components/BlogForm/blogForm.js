import { useEffect, useMemo, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import useSWR from "swr";
import { fetchData, postData } from "~/lib/clientFunctions";
import FileUpload from "../FileUpload/fileUpload";
import TextEditor from "../TextEditor";
import LoadingButton from "../Ui/Button";
import Spinner from "../Ui/Spinner";
import classes from "./productForm.module.css";
import Badge from "./Badge";

const ProductForm = () => {
  const url = `/api/blog/create`;
  const { data, error } = useSWR(url, fetchData);
  const seo_title = useRef("");
  const seo_desc = useRef("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [displayImage, setDisplayImage] = useState([]);
  const [seoImage, setSeoImage] = useState([]);
  const [resetImageInput, setResetImageInput] = useState("");
  const [editorState, setEditorState] = useState("");
  const [buttonState, setButtonState] = useState("");


  function convertDataToObject(arr) {
    const result = {};
    arr.forEach(item => {
      const { for: key } = item;
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    });

    return result;
  }

  function convertObjectToArray(obj) {
    const result = [];

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key].forEach(item => {
          result.push(item);
        });
      }
    }
    return result;
  }




  const updatedValueCb = (data) => {
    setEditorState(data);
  };

  const multiList = (item) => {
    const data = [];
    item.map((x) => data.push(x.value));
    return JSON.stringify(data);
  };


  const updateDisplayImage = (files) => setDisplayImage(files);


  const getEditorStateData = (editorData) => {
    const regex = /(<([^>]+)>)/gi;
    const data = !!editorData.replace(regex, "").length ? editorData : "";
    return data;
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (displayImage.length === 0) {
      return toast.warn("Please fill in all the required fields!");
    }
    setButtonState("loading");
    const form = document.querySelector("#product_form");
    const formData = new FormData(form);
    const displayImg = await JSON.stringify(displayImage);
    const seo = {
      title: seo_title.current.value.trim(),
      description: seo_desc.current.value.trim(),
      image: seoImage,
    };
    formData.append("displayImage", displayImg);
    formData.append("category", multiList(selectedCategory));
    formData.append("brand", selectedBrand);
    formData.append("seo", JSON.stringify(seo));
    formData.append("description", getEditorStateData(editorState));

    await postData("/api/blog/create", formData)
      .then((status) => {
        status.success
          ? (toast.success("Blog Added Successfully"),
            form.reset(),
            setSelectedCategory([]),
            setResetImageInput("reset"),
            setEditorState(""))
          : toast.error("Something Went Wrong");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
    setButtonState("");
  };



  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;
  if (!data.success) return <div>Something Went Wrong...</div>;

  const categoryOption = [];
  data.category.map((el) =>
    categoryOption.push({ label: el.name, value: el.slug }),
  );

  function updateBrand(e) {
    setSelectedBrand(e.target.value);
  }

  return (
    <>
      <h4 className="text-center pt-3 pb-5">Create New Blog</h4>
      <form
        id="product_form"
        encType="multipart/form-data"
        onSubmit={formHandler}
      >
        {imageInput()}
        {productInformation()}
        {productDescription()}
        {seoInput()}
        <div className="my-4">
          <LoadingButton type="submit" text="Add Blog" state={buttonState} />
        </div>
      </form>
    </>
  );

  function productDescription() {
    return (
      <div className="card mb-5 border-0 shadow">
        <div className="card-header bg-white py-3 fw-bold">
          Blog Description
        </div>
        <div className="card-body">
          <div className="py-3">
            <label htmlFor="inp-7" className="form-label">
              Short Description*
            </label>
            <textarea
              id="inp-7"
              className="form-control"
              name="short_description"
            />
          </div>
          <div className="py-3">
            <label className="form-label">Description</label>
            <TextEditor
              previousValue={editorState}
              updatedValue={updatedValueCb}
              height={300}
            />
          </div>
        </div>
      </div>
    );
  }

  function productInformation() {
    return (
      <div className="card mb-5 border-0 shadow">
        <div className="card-header bg-white py-3 fw-bold">
          Blog Information
        </div>
        <div className="card-body">
          <div className="py-3">
            <label htmlFor="inp-1" className="form-label">
              Title*
            </label>
            <input
              type="text"
              id="inp-1"
              className="form-control"
              name="name"
              required
            />
          </div>
          <div className="row">

            <div className="col-6 col-sm-6">
              <div className="py-3">
                <label className="form-label">Categories*</label>
                <MultiSelect
                  options={categoryOption}
                  onChange={setSelectedCategory}
                  value={selectedCategory}
                  labelledBy="Select"
                />
              </div>
            </div>
 <div className="col-6 col-sm-6">
            <div className="py-3">
              <label className="form-label">Brand</label>
              <select className="form-control" onChange={updateBrand}>
                <option value="">None</option>
                {data.brand &&
                  data.brand.map((x) => (
                    <option value={x.slug} key={x._id}>
                      {x.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }

  function imageInput() {
    return (
      <div className="card mb-5 border-0 shadow">
        <div className="card-header bg-white py-3 fw-bold">Blog Image</div>
        <div className="card-body">
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Thumbnail Image (300px x 300px)*"
            maxFileSizeInBytes={2000000}
            updateFilesCb={updateDisplayImage}
            resetCb={resetImageInput}
          />

        </div>
      </div>
    );
  }

  function seoInput() {
    return (
      <div className="card mb-5 border-0 shadow">
        <div className="card-header bg-white py-3 fw-bold">SEO Meta Tags</div>
        <div className="card-body">
          <div className="py-3">
            <label htmlFor="inp-122" className="form-label">
              Meta Title
            </label>
            <input
              type="text"
              ref={seo_title}
              id="inp-122"
              className="form-control"
            />
          </div>
          <div className="py-3">
            <label htmlFor="inp-222" className="form-label">
              Meta Description
            </label>
            <textarea ref={seo_desc} id="inp-222" className="form-control" />
          </div>
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Meta Image"
            maxFileSizeInBytes={2000000}
            updateFilesCb={setSeoImage}
            resetCb={resetImageInput}
          />
        </div>
      </div>
    );
  }
};

export default ProductForm;
