import DefaultErrorPage from "next/error";
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
import getTextColorForBackground from "~/utils/getTextColorForBackground";
import Badge from "./Badge";


const BlogEditForm = (props) => {
  const url = `/api/blog/edit?slug=${props.slug}`;
  const { data, error } = useSWR(url, fetchData);

  const seo_title = useRef("");
  const seo_desc = useRef("");

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [displayImage, setDisplayImage] = useState([]);
  const [seoImage, setSeoImage] = useState([]);
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
      console.log("============>", item);
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



  useEffect(() => {
    if (data && data.product) {

      const preSelectedCategory = [];
      data.product.categories.map((el) =>
        preSelectedCategory.push({ label: el, value: el }),
      );

      setSelectedCategory(preSelectedCategory);
     
      setDisplayImage(data.product.image);
      setSeoImage(data.product.seo.image);
      setEditorState(data.product.description);
      setSelectedBrand(data.product.brand);
    }
  }, [data]);

    // const itemList = (selectedColor.length || 1) * (attrItemList.length || 1);
    // if (variantInputList.length !== itemList) {

    // if (selectedColor.length && attrItemList.length) {
    //   selectedColor.map((color) => {
    //     attrItemList.map((attr) => {
    //       const combination = {
    //         color: color.label,
    //         attr: attr.label,
    //         price: "",
    //         sku: "",
    //         qty: "",
    //       };
    //       arrList.push(combination);
    //     });
    //   });
    // } 

    // }

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;
  if (!data.product) return <DefaultErrorPage statusCode={404} />;

  const categoryOption = [];
  data.category &&
    data.category.map((el) =>
      categoryOption.push({ label: el.name, value: el.slug }),
    );


  const multiList = (item) => {
    const data = [];
    item.map((x) => data.push(x.value));
    return JSON.stringify(data);
  };



  const updatedValueCb = (data) => {
    setEditorState(data);
  };

  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    const items = [...variantInputList];
    items[i][name] = value;

  };
  const updateDisplayImage = (files) => setDisplayImage(files);
  const updateGalleryImage = (files) => setGalleryImage(files);

  const getEditorStateData = (editorData) => {
    const regex = /(<([^>]+)>)/gi;
    const data = !!editorData.replace(regex, "").length ? editorData : "";
    return data;
  };

  function updateBrand(e) {
    setSelectedBrand(e.target.value);
  }

  const formHandler = async (e) => {
    e.preventDefault();
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
    await postData("/api/blog/edit", formData)
      .then((status) =>
        status.success
          ? toast.success("Blog Updated Successfully")
          : toast.error("Something Went Wrong"),
      )
      .catch((err) => {
        console.log(err);
        toast.error(`Something Went Wrong ${err.message}`);
      });
    setButtonState("");
  };


  return (
    <form
      id="product_form"
      encType="multipart/form-data"
      onSubmit={formHandler}
    >
      {imageInput()}
      <input type="hidden" name="pid" defaultValue={data.product._id} />
      {productInformation()}
      {productDescription()}
      {seoInput()}
      <div className="py-3">

        <LoadingButton
          type="submit"
          text="Update Product"
          state={buttonState}
        />
      </div>
    </form>
  );

  function productDescription() {
    return (
      <div className="card mb-5 border-0 shadow">
        <div className="card-header bg-white py-3 fw-bold">
          Product Description
        </div>
        <div className="card-body">
          <div className="py-3">
            <label htmlFor="inp-7" className="form-label">
              Short Description*
            </label>
            <textarea
              id="inp-7"
              className={classes.input + " form-control"}
              name="short_description"
              defaultValue={data.product.shortDescription}
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
          Product Description
        </div>
        <div className="card-body">
          <div className="py-3">
            <label htmlFor="inp-1" className="form-label">
              Name*
            </label>
            <input
              type="text"
              id="inp-1"
              className={classes.input + " form-control"}
              name="name"
              defaultValue={data.product.name}
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
              <select
                className="form-control"
                onChange={updateBrand}
              >
                <option value="">None</option>
                {data.brand &&
                  data.brand.map((x) => (
                    <option value={x.slug} key={x._id} selected={(selectedBrand == x.name) || (selectedBrand == x.slug)}>
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
        <div className="card-header bg-white py-3 fw-bold">Blog Edit</div>
        <div className="card-body">
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Display Image"
            maxFileSizeInBytes={2000000}
            updateFilesCb={updateDisplayImage}
            preSelectedFiles={data.product.image}
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
              defaultValue={data.product.seo.title}
            />
          </div>
          <div className="py-3">
            <label htmlFor="inp-222" className="form-label">
              Meta Description
            </label>
            <textarea
              ref={seo_desc}
              id="inp-222"
              className="form-control"
              defaultValue={data.product.seo.description}
            />
          </div>
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Meta Image"
            maxFileSizeInBytes={2000000}
            updateFilesCb={setSeoImage}
            preSelectedFiles={data.product.seo.image}
          />
        </div>
      </div>
    );
  }
};

export default BlogEditForm;
